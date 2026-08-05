import { detectOpacityOverlapPaintTypes } from './detect-opacity-overlap';

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
  const allowedPaintTypes = detectOpacityOverlapPaintTypes(iconName);
  if (!allowedPaintTypes.length) return;

  const viewBox = (symbolEle.getAttribute('viewBox') || '0 0 24 24').trim().split(/[\s,]+/);
  const [x = '0', y = '0', width = '24', height = '24'] = viewBox;
  const masks = [];
  let maskIndex = 0;

  const visit = (parent) => {
    const children = Array.from(parent.childNodes)
      .filter((child) => child.nodeType !== TEXT_NODE && !['defs', 'mask'].includes(child.tagName?.toLowerCase?.()));

    children.forEach(visit);
    children.forEach((child, childIndex) => {
      if (child.hasAttribute('mask')) return;

      const paintTypes = getPaintTypes(child);
      if (paintTypes.length !== 1 || !allowedPaintTypes.includes(paintTypes[0])) return;

      const paintType = paintTypes[0];
      const upperNodes = children.slice(childIndex + 1).filter((upperNode) => {
        const upperPaintTypes = getPaintTypes(upperNode);
        return upperPaintTypes.length === 1;
      });
      if (!upperNodes.length) return;

      const maskId = `t-icon-${iconName}-${paintType}-overlap-${maskIndex}`;
      maskIndex += 1;
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
      child.setAttribute('mask', `url(#${maskId})`);
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
