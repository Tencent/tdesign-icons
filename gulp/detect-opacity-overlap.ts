import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';
import { DOMParser, XMLSerializer } from 'xmldom';
import type { PaintType } from './opacity-overlap';

const SVG_DIR = path.resolve(__dirname, '../svg');
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const ELEMENT_NODE = 1;
const PAINT_TYPES: PaintType[] = ['fill', 'stroke'];

const DRAWABLE_TAGS = new Set([
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
]);

// 这些标签只定义引用内容，不参与实际绘制，改色会破坏 mask/clip 的覆盖范围
const DEFINITION_TAGS = new Set([
  'clippath',
  'defs',
  'filter',
  'lineargradient',
  'marker',
  'mask',
  'pattern',
  'radialgradient',
  'symbol',
]);

const OPACITY_ATTRS = ['opacity', 'fill-opacity', 'stroke-opacity'];

/**
 * 用 50% 透明度重绘候选图层：单个图层最多产生 128 的 alpha，相邻边缘的抗锯齿
 * 覆盖率之和不会超过 1，所以 alpha 明显高于 128 只可能来自同类型图层的真实叠加。
 */
const TEST_PAINT = 'rgba(0, 0, 0, 0.5)';
const SINGLE_LAYER_ALPHA = 128;
const RENDER_WIDTH = 96;
const MIN_ALPHA_DELTA = 12;
const MIN_OVERLAP_PIXELS = 12;

type SvgElement = any;

const detectionCache = new Map<string, PaintType[]>();

function getElementChildren(node: SvgElement): SvgElement[] {
  return Array.from(node?.childNodes || []).filter((child: SvgElement) => child.nodeType === ELEMENT_NODE);
}

function getTagName(node: SvgElement): string {
  return node?.tagName?.toLowerCase?.() || '';
}

function isDefinition(node: SvgElement) {
  return DEFINITION_TAGS.has(getTagName(node));
}

function isVisiblePaint(value: string | null) {
  return Boolean(value) && !['none', 'transparent'].includes(value.trim().toLowerCase());
}

function hasEffectivePaint(element: SvgElement, paintType: PaintType) {
  let current = element;
  while (current?.getAttribute) {
    if (isVisiblePaint(current.getAttribute(paintType))) {
      return true;
    }
    if (current.hasAttribute?.(paintType)) {
      return false;
    }
    current = current.parentNode;
  }
  // fill 缺省为黑色，stroke 缺省为不绘制
  return paintType === 'fill';
}

function getPaintTypes(node: SvgElement): PaintType[] {
  const found = new Set<PaintType>();

  const visit = (element: SvgElement) => {
    PAINT_TYPES.forEach((paintType) => {
      if (isVisiblePaint(element.getAttribute(paintType))) {
        found.add(paintType);
      }
    });
    getElementChildren(element).forEach(visit);
  };

  visit(node);
  return PAINT_TYPES.filter((paintType) => found.has(paintType));
}

function getComparableAttrs(element: SvgElement) {
  return Array.from(element.attributes || [])
    .map((attr: any) => [attr.name, attr.value])
    .filter(([name]) => !['d', 'id'].includes(name))
    .sort(([left], [right]) => left.localeCompare(right));
}

/**
 * 与 `mergeAdjacentStrokePaths` 保持一致：相邻且描边属性完全相同的路径最终会被
 * 合成一条复合路径，只描边一次，因此检测时必须同样视为单个图层。
 */
function mergeStrokeLayers(node: SvgElement) {
  getElementChildren(node).forEach(mergeStrokeLayers);

  getElementChildren(node).reduce((previous: SvgElement, current: SvgElement) => {
    const canMerge = getTagName(previous) === 'path'
      && getTagName(current) === 'path'
      && isVisiblePaint(previous.getAttribute('stroke'))
      && previous.getAttribute('stroke') === current.getAttribute('stroke')
      && !isVisiblePaint(previous.getAttribute('fill'))
      && !isVisiblePaint(current.getAttribute('fill'))
      && previous.getAttribute('id') === current.getAttribute('id')
      && JSON.stringify(getComparableAttrs(previous)) === JSON.stringify(getComparableAttrs(current));

    if (!canMerge) {
      return current;
    }

    previous.setAttribute('d', `${previous.getAttribute('d') || ''} ${current.getAttribute('d') || ''}`.trim());
    node.removeChild(current);
    return previous;
  }, null);
}

/**
 * 引用了不存在的 clipPath/mask 时元素不会被绘制，检测前需要清掉这类失效引用，
 * 否则整张图都是空白。
 */
function dropDanglingReferences(elements: SvgElement[]) {
  const ids = new Set(elements.map((element) => element.getAttribute('id')).filter(Boolean));

  elements.forEach((element) => {
    ['clip-path', 'mask'].forEach((attribute) => {
      const reference = /^url\(#(.+)\)$/.exec(element.getAttribute(attribute) || '');
      if (reference && !ids.has(reference[1])) {
        element.removeAttribute(attribute);
      }
    });
  });
}

/**
 * 收集会被 mask 处理的图层：同一父节点下出现两个以上「只有单一 paint 类型」的
 * 兄弟节点时，它们才可能因为半透明颜色叠加而变深。
 */
function collectOverlapLayers(root: SvgElement, paintType: PaintType): SvgElement[] {
  const layers: SvgElement[] = [];

  const visit = (parent: SvgElement) => {
    const children = getElementChildren(parent).filter((child) => !isDefinition(child));
    children.forEach(visit);

    const sameTypeChildren = children.filter((child) => {
      const paintTypes = getPaintTypes(child);
      return paintTypes.length === 1 && paintTypes[0] === paintType;
    });

    if (sameTypeChildren.length > 1) {
      layers.push(...sameTypeChildren);
    }
  };

  visit(root);
  return layers;
}

function collectPaintedElements(layers: SvgElement[], paintType: PaintType) {
  const painted = new Set<SvgElement>();

  const visit = (element: SvgElement) => {
    if (DRAWABLE_TAGS.has(getTagName(element)) && hasEffectivePaint(element, paintType)) {
      painted.add(element);
    }
    getElementChildren(element).forEach(visit);
  };

  layers.forEach(visit);
  return painted;
}

function applyTestPaint(elements: SvgElement[], painted: Set<SvgElement>, paintType: PaintType) {
  const otherPaintType = paintType === 'fill' ? 'stroke' : 'fill';

  elements.forEach((element) => {
    if (!DRAWABLE_TAGS.has(getTagName(element))) {
      return;
    }

    if (painted.has(element)) {
      element.setAttribute(paintType, TEST_PAINT);
      element.setAttribute(otherPaintType, 'none');
    } else {
      element.setAttribute('fill', 'none');
      element.setAttribute('stroke', 'none');
    }
  });
}

function hasAlphaOverlap(svgString: string) {
  const { pixels } = new Resvg(svgString, {
    fitTo: { mode: 'width', value: RENDER_WIDTH },
    // 图标不含文本，跳过系统字体扫描，否则每次栅格化都要百毫秒级开销
    font: { loadSystemFonts: false },
  }).render();

  let overlapPixels = 0;
  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] - SINGLE_LAYER_ALPHA >= MIN_ALPHA_DELTA) {
      overlapPixels += 1;
      if (overlapPixels >= MIN_OVERLAP_PIXELS) {
        return true;
      }
    }
  }

  return false;
}

function detectPaintTypes(svgString: string): PaintType[] {
  const xmlDoc = new DOMParser().parseFromString(svgString, 'image/svg+xml');
  const root = xmlDoc.documentElement;
  if (!root.getAttribute('xmlns')) {
    root.setAttribute('xmlns', SVG_NAMESPACE);
  }

  mergeStrokeLayers(root);

  const allElements: SvgElement[] = [];
  const paintableElements: SvgElement[] = [];
  const collect = (element: SvgElement, insideDefinition: boolean) => {
    allElements.push(element);
    const definition = insideDefinition || isDefinition(element);
    if (!definition) {
      paintableElements.push(element);
    }
    getElementChildren(element).forEach((child) => collect(child, definition));
  };
  collect(root, false);

  dropDanglingReferences(allElements);
  paintableElements.forEach((element) => {
    OPACITY_ATTRS.forEach((attribute) => element.removeAttribute(attribute));
  });

  const paintedByType = PAINT_TYPES.reduce((painted, paintType) => {
    const layers = collectOverlapLayers(root, paintType);
    return {
      ...painted,
      [paintType]: layers.length ? collectPaintedElements(layers, paintType) : new Set<SvgElement>(),
    };
  }, {} as Record<PaintType, Set<SvgElement>>);

  const serializer = new XMLSerializer();
  return PAINT_TYPES.filter((paintType) => {
    if (!paintedByType[paintType].size) {
      return false;
    }

    applyTestPaint(paintableElements, paintedByType[paintType], paintType);
    return hasAlphaOverlap(serializer.serializeToString(xmlDoc));
  });
}

/**
 * 构建时自动判断图标的哪些 paint 类型存在同类型图层重叠，替代人工白名单。
 * 检测基于 `svg/` 下的原图，各产物流水线共享同一份结果。
 */
export function detectOpacityOverlapPaintTypes(iconName: string): PaintType[] {
  const cached = detectionCache.get(iconName);
  if (cached) {
    return cached;
  }

  let paintTypes: PaintType[] = [];
  try {
    paintTypes = detectPaintTypes(fs.readFileSync(path.join(SVG_DIR, `${iconName}.svg`), 'utf-8'));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`检测图标 ${iconName} 的半透明图层重叠失败: ${message}`);
  }

  detectionCache.set(iconName, paintTypes);
  return paintTypes;
}

export function getOpacityOverlapDetections() {
  return Array.from(detectionCache.entries())
    .filter(([, paintTypes]) => paintTypes.length)
    .map(([iconName, paintTypes]) => ({ iconName, paintTypes }))
    .sort((left, right) => left.iconName.localeCompare(right.iconName));
}
