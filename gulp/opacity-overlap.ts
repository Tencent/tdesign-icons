import type { IconElement } from './svg-info-check';

export type PaintType = 'fill' | 'stroke';

interface ViewBox {
  x: string;
  y: string;
  width: string;
  height: string;
}

interface OptimizeOptions {
  maskPaintTypes?: PaintType[];
  viewBox?: string;
}

const DRAWABLE_TAGS = new Set([
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
]);

const MASK_IGNORED_ATTRS = new Set([
  'class',
  'className',
  'id',
  'mask',
  'opacity',
  'fillOpacity',
  'strokeOpacity',
  'style',
]);

function cloneNode(node: IconElement): IconElement {
  return {
    tag: node.tag,
    attrs: { ...node.attrs },
    children: node.children?.map(cloneNode),
  };
}

function parseViewBox(viewBox?: string): ViewBox {
  const values = viewBox?.trim().split(/[\s,]+/);
  if (values?.length === 4) {
    return {
      x: values[0],
      y: values[1],
      width: values[2],
      height: values[3],
    };
  }

  return {
    x: '0',
    y: '0',
    width: '24',
    height: '24',
  };
}

function isVisiblePaint(value: unknown): value is string {
  return typeof value === 'string' && !['none', 'transparent'].includes(value);
}

function collectPaintValues(node: IconElement, paintType: PaintType, values: Set<string>) {
  const paint = node.attrs?.[paintType];
  if (isVisiblePaint(paint)) {
    values.add(paint);
  }

  node.children?.forEach((child) => collectPaintValues(child, paintType, values));
}

function getPaintTypes(node: IconElement): PaintType[] {
  return (['fill', 'stroke'] as PaintType[]).filter((paintType) => {
    const values = new Set<string>();
    collectPaintValues(node, paintType, values);
    return values.size > 0;
  });
}

function getComparableAttrs(node: IconElement) {
  return Object.keys(node.attrs)
    .filter((key) => !['d', 'id'].includes(key))
    .sort()
    .map((key) => [key, node.attrs[key]]);
}

function canMergeStrokePaths(previous: IconElement, current: IconElement) {
  if (previous.tag !== 'path' || current.tag !== 'path') {
    return false;
  }

  if (!isVisiblePaint(previous.attrs.stroke) || previous.attrs.stroke !== current.attrs.stroke) {
    return false;
  }

  if (isVisiblePaint(previous.attrs.fill) || isVisiblePaint(current.attrs.fill)) {
    return false;
  }

  if (previous.attrs.id !== current.attrs.id) {
    return false;
  }

  return JSON.stringify(getComparableAttrs(previous)) === JSON.stringify(getComparableAttrs(current));
}

/**
 * Adjacent stroke-only paths with the same paint can be represented by one
 * compound path. The browser then applies a semi-transparent stroke once.
 * Fill paths are deliberately excluded because subpath winding can change
 * their fill result when concatenated.
 */
export function mergeAdjacentStrokePaths(children: IconElement[]): IconElement[] {
  return children.reduce<IconElement[]>((merged, child) => {
    const previous = merged[merged.length - 1];
    if (previous && canMergeStrokePaths(previous, child)) {
      previous.attrs.d = `${previous.attrs.d || ''} ${child.attrs.d || ''}`.trim();
      return merged;
    }

    merged.push(child);
    return merged;
  }, []);
}

function makeMaskShape(node: IconElement, paintType: PaintType): IconElement {
  const masked = cloneNode(node);

  Object.keys(masked.attrs).forEach((key) => {
    if (MASK_IGNORED_ATTRS.has(key)) {
      delete masked.attrs[key];
    }
  });

  if (DRAWABLE_TAGS.has(masked.tag)) {
    masked.attrs.fill = paintType === 'fill' && isVisiblePaint(node.attrs.fill) ? '#000' : 'none';
    masked.attrs.stroke = paintType === 'stroke' && isVisiblePaint(node.attrs.stroke) ? '#000' : 'none';
  }

  masked.children = masked.children?.map((child) => makeMaskShape(child, paintType));
  return masked;
}

function makeMask(
  id: string,
  upperNodes: IconElement[],
  viewBox: ViewBox,
): IconElement {
  return {
    tag: 'mask',
    attrs: {
      id,
      maskUnits: 'userSpaceOnUse',
      maskContentUnits: 'userSpaceOnUse',
      'mask-type': 'luminance',
      x: viewBox.x,
      y: viewBox.y,
      width: viewBox.width,
      height: viewBox.height,
    },
    children: [
      {
        tag: 'rect',
        attrs: {
          x: viewBox.x,
          y: viewBox.y,
          width: viewBox.width,
          height: viewBox.height,
          fill: '#fff',
        },
      },
      ...upperNodes.map((node) => makeMaskShape(node, getPaintTypes(node)[0])),
    ],
  };
}

/**
 * Makes sibling paint layers disjoint without parsing path geometry. For each
 * lower layer, a luminance mask removes the area painted by later single-paint
 * siblings, including fill/stroke cross-overlaps. This preserves painter order,
 * rgba props and dynamic strokes.
 */
export function optimizeOpacityOverlaps(root: IconElement, options: OptimizeOptions) {
  const masks: IconElement[] = [];
  const viewBox = parseViewBox(options.viewBox);
  let maskIndex = 0;

  const visit = (node: IconElement) => {
    if (!node.children?.length || ['defs', 'mask'].includes(node.tag)) {
      return;
    }

    node.children.forEach(visit);
    // eslint-disable-next-line no-param-reassign
    node.children = mergeAdjacentStrokePaths(node.children);

    node.children.forEach((child, childIndex) => {
      if (child.attrs.mask) {
        return;
      }

      const paintTypes = getPaintTypes(child);
      if (
        paintTypes.length !== 1
        || (options.maskPaintTypes && !options.maskPaintTypes.includes(paintTypes[0]))
      ) {
        return;
      }

      const upperNodes = node.children
        ?.slice(childIndex + 1)
        .filter((upperNode) => getPaintTypes(upperNode).length === 1) || [];

      if (!upperNodes.length) {
        return;
      }

      const maskId = `props.overlapMaskId${maskIndex}`;
      const maskUrl = `props.overlapMaskUrl${maskIndex}`;
      maskIndex += 1;
      masks.push(makeMask(maskId, upperNodes, viewBox));
      // eslint-disable-next-line no-param-reassign
      child.attrs.mask = maskUrl;
    });
  };

  visit(root);

  if (masks.length) {
    const existingDefs = root.children?.find((child) => child.tag === 'defs');
    if (existingDefs) {
      existingDefs.children = [...(existingDefs.children || []), ...masks];
    } else {
      // eslint-disable-next-line no-param-reassign
      root.children = [{ tag: 'defs', attrs: {}, children: masks }, ...(root.children || [])];
    }
  }

  return root;
}
