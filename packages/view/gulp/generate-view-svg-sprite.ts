import { src, dest } from 'gulp';
import fs from 'fs';
import path from 'path';
import concat from 'gulp-concat';
import svgSprite from 'gulp-svg-sprite';
import { createTransformStream } from '../../../gulp/transform';

const iconGlob = path.resolve(__dirname, '../../../svg/*.svg');
const iconDir = path.resolve(__dirname, '../../../svg');

const config = {
  svg: {
    rootAttributes: {
      style: 'position:absolute; width:0; height:0; visibility:hidden',
    },
  },
  shape: {
    id: {
      generator(name: string) {
        return `t-icon-${name.replace('.svg', '')}`;
      },
    },
    dimension: {
      // Set maximum dimensions
      maxWidth: 16,
      maxHeight: 16,
    },
  },
  mode: {
    symbol: true,
  },
};

export function generateSvgSpriteVueFile(): string {
  const svgContent = fs.readFileSync(path.resolve(__dirname, './template/symbol/svg/sprite.symbol.svg'), 'utf-8');
  return `<template>${svgContent.replace(/fill="#000"/g, 'fill="currentColor"').replace('<?xml version="1.0" encoding="utf-8"?>', '')}</template>`;
}

export const generateViewSvgSprite = () => function generateMap() {
  return src(iconGlob, { cwd: iconDir })
    .pipe(svgSprite(config))
    .pipe(dest('packages/view/gulp/template'))
    .pipe(createTransformStream(() => generateSvgSpriteVueFile()))
    .pipe(concat('svg-sprite.vue'))
    .pipe(dest('packages/view/gulp/template'));
};
