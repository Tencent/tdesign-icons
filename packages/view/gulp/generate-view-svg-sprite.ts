/* eslint-disable no-restricted-syntax */
import { src, dest } from 'gulp';
import { DOMParser, XMLSerializer } from 'xmldom';
import fs from 'fs';
import path from 'path';
import concat from 'gulp-concat';
import svgSprite from 'gulp-svg-sprite';
import { createTransformStream } from '../../../gulp/transform';

const iconGlob = path.resolve(__dirname, '../../../svg/*.svg');
const iconDir = path.resolve(__dirname, '../../../svg');
const TEXT_NODE = 3;
const specialIcons = [
  't-icon-logo-alipay',
  't-icon-logo-wecom',
  't-icon-logo-behance',
  't-icon-logo-ie',
  't-icon-logo-wechat-stroke',
  't-icon-logo-wechatpay',
  't-icon-logo-cnb',
  't-icon-drag-drop',
  't-icon-caret-up-small',
  't-icon-caret-down-small',
   't-icon-caret-left-small',
  't-icon-caret-right-small',
  't-icon-loading',
  't-icon-expand-up',
  't-icon-expand-down',
  't-icon-play-circle',
  't-icon-pause-circle',
  't-icon-play',
  't-icon-pause',
  't-icon-download-2',
  't-icon-stop',
  't-icon-stop-circle',
  't-icon-video-camera-3',
  't-icon-building',
  't-icon-list'
];
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
                  cleanupNumericValues:false
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

  function traverseNodes(node: any, isSpecial:boolean, id?: string) {
    const element = node;

    if (element.nodeType === TEXT_NODE) return;
    const nodeId = element.getAttribute('id') || id;

    // 如果是 <g> 节点，递归处理其所有**元素子节点**
    if (element.tagName.toLowerCase() === 'g' && element.getAttribute('id')) {
      // 获取所有子节点，并过滤出元素节点（排除文本、注释）
      const childElements = Array.from(element.childNodes)
        .filter((child) => child.nodeType !== TEXT_NODE);
      for (const child of childElements) {
       
        traverseNodes(child, false, nodeId); // 递归处理子元素
      }
    } else if (nodeId) {
      if (/^.*?(stroke\d+)$/.test(nodeId)) {
        const strokeId = nodeId.replace(/^.*?(stroke\d+)$/,'$1');
        const strokeContent = strokeId.split('stroke')

        element.setAttribute('id', strokeId);
        if(element.getAttribute('stroke')){
          element.removeAttribute('stroke');
          element.removeAttribute('stroke-width');
          element.setAttribute(':stroke-width','strokeWidth');
          element.setAttribute(':stroke', `strokeColor${strokeContent[1]}`);
        }else if(element.getAttribute('fill')) {
          element.removeAttribute('fill');
          element.setAttribute(':fill', `strokeColor${strokeContent[1]}`);
        }
       
      } else if (/^.*?(fill\d+)$/.test(nodeId)) {
        const fillId = nodeId.replace(/^.*?(fill\d+)$/,'$1');
        const fillContent = fillId.split('fill');

        element.setAttribute('id', fillId);
        element.removeAttribute('fill');
       
        element.setAttribute(':fill', isSpecial?`strokeColor${fillContent[1]}`:`fillColor${fillContent[1]}`);
      }
    } else {
      // 填充替换
      element.removeAttribute('fill');
      element.setAttribute(':fill',isSpecial?'strokeColor1':'fillColor1');
    }
  }

  // 从 SVG 根节点开始遍历
  const svgRoot = xmlDoc.documentElement;

  const childElements = Array.from(svgRoot.childNodes);
  for (const symbolEle of childElements) {
    let isSpecial = false
    if (symbolEle.nodeType !== TEXT_NODE) {
      if (symbolEle.tagName?.toLowerCase?.() === 'symbol') {
     
        if(specialIcons.includes(symbolEle.getAttribute('id'))){
          isSpecial= true;
        }
        const gElements = Array.from(symbolEle.childNodes);
        for (const gEl of gElements) {
          if (gEl.nodeType !== TEXT_NODE) {
            if (gEl.tagName?.toLowerCase?.() === 'g') {
              const pathELements = Array.from(gEl.childNodes);
              for (const pathEl of pathELements) {
                traverseNodes(pathEl,isSpecial);
              }
            } else {
              traverseNodes(gEl,isSpecial);
            }
          }
        }
      }
    }
  }

  // 3. 序列化为 SVG 字符串
  const serializer = new XMLSerializer();
  // 可选：格式化输出（缩进更易读）
  return serializer.serializeToString(xmlDoc, { indent: true });
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
