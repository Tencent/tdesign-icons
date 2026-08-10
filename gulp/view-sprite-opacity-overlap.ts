import {
  detectInternalStrokeOverlapGroupIds,
  detectOpacityOverlaps,
} from './detect-opacity-overlap';

const TEXT_NODE = 3;
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const DRAWABLE_TAGS = new Set([
  'circle',
  'ellipse',
  'line',
  'path',
  'polygon',
  'polyline',
  'rect',
]);

function hasVisiblePaint(element, paintType) {
  const paint = element.getAttribute(paintType);
  return element.hasAttribute(`:${paintType}`)
    || (paint && !['none', 'transparent'].includes(paint));
}

function getPaintTypes(node) {
  const paintTypes = new Set();

  const collect = (element) => {
    if (element.nodeType === TEXT_NODE) return;
    if (hasVisiblePaint(element, 'fill')) paintTypes.add('fill');
    if (hasVisiblePaint(element, 'stroke')) paintTypes.add('stroke');
    Array.from(element.childNodes).forEach(collect);
  };

  collect(node);
  return Array.from(paintTypes);
}

function makeMaskShape(node, paintType) {
  const masked = node.cloneNode(true);

  const normalizePaint = (element) => {
    if (element.nodeType === TEXT_NODE) return;

    ['class', 'id', 'mask', 'opacity', 'fill-opacity', 'stroke-opacity'].forEach((attr) => {
      element.removeAttribute(attr);
    });

    if (DRAWABLE_TAGS.has(element.tagName?.toLowerCase?.())) {
      const paintsTarget = hasVisiblePaint(element, paintType);
      element.removeAttribute(':fill');
      element.removeAttribute(':stroke');
      element.setAttribute('fill', paintType === 'fill' && paintsTarget ? '#000' : 'none');
      element.setAttribute('stroke', paintType === 'stroke' && paintsTarget ? '#000' : 'none');
    }

    Array.from(element.childNodes).forEach(normalizePaint);
  };

  normalizePaint(masked);
  return masked;
}

export function applyViewSpriteOpacityOverlapMasks(xmlDoc, symbolEle, iconName) {
  const overlaps = detectOpacityOverlaps(iconName);
  const internalStrokeOverlapGroupIds = new Set(detectInternalStrokeOverlapGroupIds(iconName));
  if (!overlaps.length && !internalStrokeOverlapGroupIds.size) return;
  const overlapsByLowerPath = new Map(overlaps.map((overlap) => [overlap.lowerPathId, overlap]));

  const viewBox = (symbolEle.getAttribute('viewBox') || '0 0 24 24').trim().split(/[\s,]+/);
  const [x = '0', y = '0', width = '24', height = '24'] = viewBox;
  const masks = [];
  const iconRoot = Array.from(symbolEle.childNodes)
    .find((child) => child.nodeType !== TEXT_NODE && child.getAttribute?.('id')?.endsWith(iconName));
  const namespacedIconId = iconRoot?.getAttribute('id') || iconName;
  const idNamespace = namespacedIconId.slice(0, -iconName.length);
  const getPathId = (node) => {
    const rawPathId = node.getAttribute('id') || '';
    return idNamespace && rawPathId.startsWith(idNamespace)
      ? rawPathId.slice(idNamespace.length)
      : rawPathId;
  };
  const addMask = (maskedNode, upperNodes, maskId) => {
    const mask = xmlDoc.createElementNS(SVG_NAMESPACE, 'mask');
    mask.setAttribute('id', maskId);
    mask.setAttribute('maskUnits', 'userSpaceOnUse');
    mask.setAttribute('maskContentUnits', 'userSpaceOnUse');
    mask.setAttribute('mask-type', 'luminance');
    mask.setAttribute('visibility', 'visible');
    mask.setAttribute('x', x);
    mask.setAttribute('y', y);
    mask.setAttribute('width', width);
    mask.setAttribute('height', height);

    const background = xmlDoc.createElementNS(SVG_NAMESPACE, 'rect');
    background.setAttribute('x', x);
    background.setAttribute('y', y);
    background.setAttribute('width', width);
    background.setAttribute('height', height);
    background.setAttribute('fill', '#fff');
    mask.appendChild(background);
    upperNodes.forEach((upperNode) => {
      mask.appendChild(makeMaskShape(upperNode, getPaintTypes(upperNode)[0]));
    });
    masks.push(mask);
    maskedNode.setAttribute('mask', `url(#${maskId})`);
  };
  const visit = (parent) => {
    const children = Array.from(parent.childNodes)
      .filter((child) => child.nodeType !== TEXT_NODE && !['defs', 'mask'].includes(child.tagName?.toLowerCase?.()));

    children.forEach(visit);
    const parentPathId = getPathId(parent);
    if (internalStrokeOverlapGroupIds.has(parentPathId)) {
      const strokeChildren = children.filter((child) => {
        const paintTypes = getPaintTypes(child);
        return paintTypes.length === 1 && paintTypes[0] === 'stroke';
      });
      strokeChildren.forEach((child, childIndex) => {
        if (child.hasAttribute('mask')) return;

        const upperNodes = strokeChildren.slice(childIndex + 1);
        if (!upperNodes.length) return;

        addMask(
          child,
          upperNodes,
          `t-icon-${iconName}-overlap-${parentPathId}-${childIndex}`,
        );
      });
    }

    children.forEach((child, childIndex) => {
      const pathId = getPathId(child);
      const detectedOverlap = overlapsByLowerPath.get(pathId);
      if (child.hasAttribute('mask') || !detectedOverlap) return;

      const paintTypes = getPaintTypes(child);
      if (paintTypes.length !== 1) return;

      let upperNodes = children.slice(childIndex + 1).filter((upperNode) => {
        const upperPaintTypes = getPaintTypes(upperNode);
        return upperPaintTypes.length === 1;
      });
      if (!detectedOverlap.hasUnidentifiedUpper) {
        const upperPathIds = new Set(detectedOverlap.upperPathIds);
        upperNodes = upperNodes.filter((upperNode) => upperPathIds.has(getPathId(upperNode)));
      }
      if (!upperNodes.length) return;

      addMask(child, upperNodes, `t-icon-${iconName}-overlap-${pathId}`);
    });
  };

  visit(symbolEle);
  if (masks.length) {
    const svgRoot = xmlDoc.documentElement;
    let defs = Array.from(svgRoot.childNodes)
      .find((child) => child.nodeType !== TEXT_NODE && child.tagName?.toLowerCase?.() === 'defs');
    if (!defs) {
      defs = xmlDoc.createElementNS(SVG_NAMESPACE, 'defs');
      svgRoot.insertBefore(defs, svgRoot.firstChild);
    }
    masks.forEach((mask) => defs.appendChild(mask));
  }
}
