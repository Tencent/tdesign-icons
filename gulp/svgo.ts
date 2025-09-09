import SVGO from 'svgo';
import { createTransformStreamAsync } from './transform';

export interface SVGOConfig {
     removeXMLNS?: boolean;
     cleanupAttrs?: boolean ;
     removeDoctype?: boolean ;
     removeXMLProcInst?: boolean ;
     removeComments?: boolean ;
     removeMetadata?: boolean ;
     removeTitle?: boolean ;
     removeDesc?: boolean ;
     removeUselessDefs?: boolean ;
     removeEditorsNSData?: boolean ;
     removeEmptyAttrs?: boolean ;
     removeHiddenElems?: boolean ;
     removeEmptyText?: boolean ;
     removeEmptyContainers?: boolean ;
     removeViewBox?: boolean ;
     cleanupEnableBackground?: boolean ;
     convertStyleToAttrs?: boolean ;
     convertPathData?: boolean ;
     convertTransform?: boolean ;
     removeUnknownsAndDefaults?: boolean ;
     removeNonInheritableGroupAttrs?: boolean ;
     removeUselessStrokeAndFill?: boolean ;
     removeUnusedNS?: boolean ;
     cleanupIDs?: boolean ;
     cleanupNumericValues?: boolean ;
     moveElemsAttrsToGroup?: boolean ;
     moveGroupAttrsToElems?: boolean ;
     collapseGroups?: boolean ;
     removeRasterImages?: boolean ;
     mergePaths?: boolean ;
     convertShapeToPath?: boolean ;
     sortAttrs?: boolean ;
     removeDimensions?: boolean ;
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
      { cleanupIDs: false }, // remain id to identify different paths
      { cleanupNumericValues: false }, // avoid path destroyed
      { moveElemsAttrsToGroup: false }, // remain each path attrs
      { moveGroupAttrsToElems: true },
      { collapseGroups: true },
      { removeRasterImages: false },
      { mergePaths: false },
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
