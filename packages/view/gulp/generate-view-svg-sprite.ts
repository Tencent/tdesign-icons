/* eslint-disable no-restricted-syntax */
import { src, dest } from 'gulp';
import { DOMParser, XMLSerializer } from 'xmldom';
import fs from 'fs';
import path from 'path';
import concat from 'gulp-concat';
import svgSprite from 'gulp-svg-sprite';
import { createTransformStream } from '../../../gulp/transform';
import { specifiedIcons } from '../../../gulp/util/const';
import { applyViewSpriteOpacityOverlapMasks } from '../../../gulp/view-sprite-opacity-overlap';

const iconGlob = path.resolve(__dirname, '../../../svg/*.svg');
const iconDir = path.resolve(__dirname, '../../../svg');
const TEXT_NODE = 3;

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
                  moveElemsAttrsToGroup: false,
                  convertPathData: false,
                  cleanupNumericValues: false,
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

export function processSvgSpriteInNode(svgString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(svgString, 'image/svg+xml');

  const parseError = xmlDoc.getElementsByTagName('parsererror')[0];
  if (parseError) {
    throw new Error(`SVG 解析失败: ${parseError.textContent.trim()}`);
  }

  const traverseNodes = (node, isSpecified, isLogo, id) => {
    const element = node;
    if (element.nodeType === TEXT_NODE) return;
    const nodeId = element.getAttribute('id') || id;

    // 如果是 <g> 节点，递归处理其所有**元素子节点**
    if (element.tagName.toLowerCase() === 'g' && element.getAttribute('id')) {
      // 获取所有子节点，并过滤出元素节点（排除文本、注释）
      const childElements = Array.from(element.childNodes)
        // @ts-ignore
        .filter((child) => child.nodeType !== TEXT_NODE);
      for (const child of childElements) {
        traverseNodes(child, false, isLogo, nodeId); // 递归处理子元素
      }
    } else if (nodeId) {
      // 描边图标处理逻辑
      if (/^.*?(stroke\d+)$/.test(nodeId)) {
        // 处理描边路径

        if (isLogo) {
          // 品牌图标统一不展示修改效果，保持原样
          element.setAttribute('stroke', 'currentColor');
        } else {
          const strokeId = nodeId.replace(/^.*?(stroke\d+)$/, '$1');
          const strokeContent = strokeId.split('stroke');

          element.setAttribute('id', strokeId);
          if (element.getAttribute('stroke')) {
            element.removeAttribute('stroke');
            element.removeAttribute('stroke-width');
            element.setAttribute(':stroke-width', 'strokeWidth');
            element.setAttribute(':stroke', `strokeColor${strokeContent[1]}`);
          } else if (element.getAttribute('fill')) {
            element.removeAttribute('fill');
            element.setAttribute(':fill', `strokeColor${strokeContent[1]}`);
          }
        }
      } else if (/^.*?(fill\d+)$/.test(nodeId)) {
        // 处理填充路径

        if (isLogo) {
          // 品牌图标统一不展示修改效果，保持原样
          element.setAttribute('fill', isSpecified ? 'currentColor' : 'transparent');
        } else {
          const fillId = nodeId.replace(/^.*?(fill\d+)$/, '$1');
          const fillContent = fillId.split('fill');

          element.setAttribute('id', fillId);
          element.removeAttribute('fill');
          element.setAttribute(':fill', isSpecified ? `strokeColor${fillContent[1]}` : `fillColor${fillContent[1]}`);
        }
      } else if (isLogo) {
        element.setAttribute('fill', isSpecified ? 'currentColor' : 'transparent');
      } else {
        // 单色填充图标（带有 id 但不是 strokeN/fillN 多色路径，如 caret-down-small）：
        //
        // 问题链路：
        // 1. 源文件 svg/caret-down-small.svg 中 path 硬编码了 fill="black"，
        //    经 svgo 处理后会被归一化为 fill="#000"（黑）。
        // 2. 该 path 自带 id（如 ambcaret-down-small），因此会进入上方 else if (nodeId)
        //    分支，但其 id 既不属于 strokeN 也不属于 fillN 多色路径、也不是 logo，
        //    此前没有任何分支命中，硬编码的 fill="#000" 会被原样保留。
        // 3. 结果：深色模式下图标仍以纯黑渲染，无法随主题色变化。
        //
        // 处理方式：移除硬编码的 fill，并绑定为主题色变量，
        // 使其跟随组件 props（isSpecified 时为 strokeColor1，否则为 fillColor1）。
        element.removeAttribute('fill');
        element.setAttribute(':fill', isSpecified ? 'strokeColor1' : 'fillColor1');
      }
    } else {
      // 填充图标处理逻辑
      element.removeAttribute('fill');
      // 品牌图标统一不展示修改效果，保持原样
      if (isLogo) {
        element.setAttribute('fill', 'currentColor');
      } else {
        element.setAttribute(':fill', isSpecified ? 'strokeColor1' : 'fillColor1');
      }
    }
  };

  // 从 SVG 根节点开始遍历
  const svgRoot = xmlDoc.documentElement;

  const childElements = Array.from(svgRoot.childNodes);
  for (const symbolEle of childElements) {
    let isSpecified = false;
    let isLogo = false;
    if (symbolEle.nodeType !== TEXT_NODE) {
      // @ts-ignore
      if (symbolEle.tagName?.toLowerCase?.() === 'symbol') {
        const iconName = symbolEle.getAttribute('id').replace('t-icon-', '');
        // @ts-ignore
        if (specifiedIcons.includes(iconName)) {
          isSpecified = true;
        }

        // eslint-disable-next-line no-continue
        if (symbolEle.getAttribute('id').includes('logo-')) {
          isLogo = true;
        }

        const gElements = Array.from(symbolEle.childNodes);
        for (const gEl of gElements) {
          if (gEl.nodeType !== TEXT_NODE) {
            // @ts-ignore
            if (gEl.tagName?.toLowerCase?.() === 'g') {
              const pathElements = Array.from(gEl.childNodes);
              for (const pathEl of pathElements) {
                traverseNodes(pathEl, isSpecified, isLogo, null);
              }
            } else {
              traverseNodes(gEl, isSpecified, isLogo, null);
            }
          }
        }

        applyViewSpriteOpacityOverlapMasks(xmlDoc, symbolEle, iconName);
      }
    }
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(xmlDoc);
}
export function generateSvgSpriteVueFile() {
  const svgContent = fs.readFileSync(
    path.resolve(__dirname, './template/symbol/svg/sprite.symbol.svg'),
    'utf-8',
  );
  const result = processSvgSpriteInNode(svgContent);

  return `<template>${result.replace('<?xml version="1.0" encoding="utf-8"?>', '')}</template>
    <script setup>
    defineProps({
      strokeWidth: {
        type: Number,
        default: 2,
      },
      fillColor1: {
        type: String,
        default: '#fff'
      },
      fillColor2: {
        type: String,
        default: '#fff'
      },
      strokeColor1: {
        type: String,
        default: '#000'
      },
       strokeColor2: {
        type: String,
        default: '#000'
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
