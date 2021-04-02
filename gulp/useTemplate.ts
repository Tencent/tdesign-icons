import { createTransformStream } from './transform';

export type IconFileContentGenerator = (props: { name: string; element: string }) => string;

export const useTemplate = (iconGenerator: IconFileContentGenerator) =>
  createTransformStream((svgElementString, { stem: name }) => iconGenerator({ name, element: svgElementString }));
