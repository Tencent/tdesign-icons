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
    transform: [
      {
        svgo: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  cleanupIDs: false,
                },
              },
            },
          ],
        },
      },
    ],
    id: {
      generator(name) {
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

export function generateSvgSpriteVueFile() {
  const svgContent = fs.readFileSync(
    path.resolve(__dirname, './template/symbol/svg/sprite.symbol.svg'),
    'utf-8',
  );
  return `<template>${svgContent
    .replace(/(\w*)stroke2/g, 'stroke2')
    .replace(/(\w*)stroke1/g, 'stroke1')
    .replace(/(\w*)fill1/g, 'fill1')
    .replace(/(\w*)fill2/g, 'fill2')
    .replace(/fill="#000"/g, ':fill="strokeColor"')
    .replace(/fill="#fff"/g, ':fill="fillColor"')
    .replace(/stroke-width="2"/g, ':stroke-width="strokeWidth"')
    .replace(
      /(<path id="fill1" \b[^>]*?\bfill=")([^"]*)("[^>]*?\/?>)/g,
      '$1$21$3',
    )
    .replace(
      /(<path id="stroke1" \b[^>]*?\bfill=")([^"]*)("[^>]*?\/?>)/g,
      '$1$21$3',
    )
    .replace(
      /(<path id="fill2" \b[^>]*?\bfill=")([^"]*)("[^>]*?\/?>)/g,
      '$1$22$3',
    )
    .replace(
      /(<path id="stroke2" \b[^>]*?\bfill=")([^"]*)("[^>]*?\/?>)/g,
      '$1$22$3',
    )
    .replace('<?xml version="1.0" encoding="utf-8"?>', '')}</template>
    <script setup>
    defineProps({
      strokeWidth: {
        type: Number,
        default: 2,
      },
      fillColor: {
        type: String,
        default: 'transparent'
      },
      fillColor1: {
        type: String,
        default: 'transparent'
      },
      fillColor2: {
        type: String,
        default: 'transparent'
      },
      strokeColor:{
      type: String,
        default: 'black'
      },
      strokeColor1: {
        type: String,
        default: 'black'
      },
       strokeColor2: {
        type: String,
        default: 'black'
      }
    });
    </script>`;
}

export const generateViewSvgSprite = () => function generateMap() {
  return src(iconGlob, { cwd: iconDir })
    .pipe(svgSprite(config))
    .pipe(dest('packages/view/gulp/template'))
    .pipe(createTransformStream(() => generateSvgSpriteVueFile()))
    .pipe(concat('svg-sprite.vue'))
    .pipe(dest('packages/view/gulp/template'));
};
