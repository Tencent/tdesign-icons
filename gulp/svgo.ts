import type { PluginConfig, Config } from 'svgo';
import { optimize } from 'svgo';
import { createTransformStreamAsync } from './transform';

export interface SVGOConfig {
  removeXMLNS?: boolean;
  cleanupAttrs?: boolean;
  removeDoctype?: boolean;
  removeXMLProcInst?: boolean;
  removeComments?: boolean;
  removeMetadata?: boolean;
  removeTitle?: boolean;
  removeDesc?: boolean;
  removeUselessDefs?: boolean;
  removeEditorsNSData?: boolean;
  removeEmptyAttrs?: boolean;
  removeHiddenElems?: boolean;
  removeEmptyText?: boolean;
  removeEmptyContainers?: boolean;
  removeViewBox?: boolean;
  cleanupEnableBackground?: boolean;
  convertStyleToAttrs?: boolean;
  convertPathData?: boolean;
  convertTransform?: boolean;
  removeUnknownsAndDefaults?: boolean;
  removeNonInheritableGroupAttrs?: boolean;
  removeUselessStrokeAndFill?: boolean;
  removeUnusedNS?: boolean;
  cleanupIDs?: boolean;
  cleanupNumericValues?: boolean;
  moveElemsAttrsToGroup?: boolean;
  moveGroupAttrsToElems?: boolean;
  collapseGroups?: boolean;
  removeRasterImages?: boolean;
  mergePaths?: boolean;
  convertShapeToPath?: boolean;
  sortAttrs?: boolean;
  removeDimensions?: boolean;
}

function getSVGOOption(config: SVGOConfig = {}): Config {
  const { removeXMLNS = true } = config;
  const plugins: PluginConfig[] = [
    {
      // https://svgo.dev/docs/preset-default/
      name: 'preset-default',
      params: {
        overrides: {
          cleanupAttrs: false,
          convertPathData: false,
          removeUselessStrokeAndFill: false,
          cleanupIds: false,
          cleanupNumericValues: false,
          moveElemsAttrsToGroup: false,
          mergePaths: false,
        },
      },
    },
    'convertStyleToAttrs',
    'removeRasterImages',
    'removeDimensions',
    { name: 'removeAttrs', params: { attrs: ['class'] } },
  ];
  if (removeXMLNS) {
    plugins.push('removeXMLNS');
  }

  return {
    floatPrecision: 2,
    plugins,
  };
}

export const svgo = (config?: SVGOConfig) => {
  const options = getSVGOOption(config);
  return createTransformStreamAsync(
    async (raw: string) => optimize(raw, options).data,
  );
};
