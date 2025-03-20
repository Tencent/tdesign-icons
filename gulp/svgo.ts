import SVGO from 'svgo';
import { createTransformStreamAsync } from './transform';

export interface SVGOConfig {
  removeXMLNS?: boolean;
}

function getSVGOOption(config: SVGOConfig = {}) {
  const { removeXMLNS = true } = config;

  return {
    floatPrecision: 2,
    plugins: [
      { cleanupAttrs: false },
      { removeDoctype: true },
      { removeXMLProcInst: true },
      { removeXMLNS },
      { removeComments: true },
      { removeMetadata: true },
      { removeTitle: true },
      { removeDesc: true },
      { removeUselessDefs: true },
      { removeEditorsNSData: true },
      { removeEmptyAttrs: true },
      { removeHiddenElems: true },
      { removeEmptyText: true },
      { removeEmptyContainers: true },
      { removeViewBox: false },
      { cleanupEnableBackground: true },
      { convertStyleToAttrs: true },
      { convertPathData: false },
      { convertTransform: true },
      { removeUnknownsAndDefaults: true },
      { removeNonInheritableGroupAttrs: true },
      { removeUselessStrokeAndFill: false },
      { removeUnusedNS: true },
      { cleanupIDs: true },
      { cleanupNumericValues: true },
      { moveElemsAttrsToGroup: true },
      { moveGroupAttrsToElems: true },
      { collapseGroups: true },
      { removeRasterImages: false },
      // { mergePaths: true },
      { convertShapeToPath: true },
      { sortAttrs: true },
      { removeDimensions: true },
      { removeAttrs: { attrs: ['class'] } },
    ],
  };
}

export const svgo = (config?: SVGOConfig) => {
  const optimizer = new SVGO(getSVGOOption(config));
  return createTransformStreamAsync(async (raw: string) => (await optimizer.optimize(raw)).data);
};
