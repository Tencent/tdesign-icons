<template>
  <div
    :key="configuration.currentType"
    :class="[
      't-icons-view',
      'scrollbar',
      { 't-icons-view--framework-content': isFrameworkContent }]"
  >
    <div class="t-icons-view__header" @mouseenter="hidePopover">
      <div style="display:flex; justify-content: space-between;align-items: baseline;">
        <div class="t-icons-view__header-title">
        <h1> {{ lang.title }}</h1>
        <span style="margin: 0 0 0 24px"> {{ count }} {{ lang.icon }} ｜ <t-link  theme="primary" href="https://www.figma.com/community/file/1543189085651776104" target="_blank"> {{ lang.figmaFileText }} </t-link></span>
        </div>
        <t-input :size="isFrameworkContent?'medium':'large'" :placeholder="lang.search" :style="{ marginLeft: '16px', width: isFrameworkContent?'280px':'480px', pointerEvents: 'all' }" @change="handleSearchIcon" v-model="searchStr">
            <template #prefix-icon>
              <search-icon />
            </template>
        </t-input>
      </div>
    </div>
    <div class="t-icons-view__body scrollbar">
        <!-- 左侧 categories -->
        <div class="t-icons-view__left"  @mouseenter="hidePopover">
          <div style="font-size: 16px; color:var(--text-primary)">
            <t-radio-group v-model="configuration.currentType" variant="default-filled" style="margin-top:8px">
              <t-radio-button value="outline">{{ lang.types.outline }}</t-radio-button>
              <t-radio-button value="filled">{{ lang.types.filled }}</t-radio-button>
            </t-radio-group>
          </div>
          <div class="t-icons-view__categories scrollbar">
            <div v-for="(category,index) in allIcons" :key="index" class="t-icons-view__categories-link">
              <a theme="default" variant="text" class="categories-link" :href='`#${category.labelEn}`' @click="(e)=>proxyTitleAnchor(e, scrollElementSelector)">{{ isEn? category.labelEn: category.title }}</a>
            </div>
          </div>
        </div>
        <!-- 右侧编辑区 -->
        <t-space direction="vertical" class="t-icons-view__operations" size="32px" @mouseenter="hidePopover">
          <div v-if="configuration.currentType !== 'filled'" style="font-size: 16px;color:var(--text-primary)">
          {{ lang.strokeText }}
          <t-slider
            v-model="configuration.strokeWidth"
            :step="0.5"
            :min="0.5"
            :max="2.5"
            :marks="{ 0.5:0.5,1:1,1.5:1.5,2:2,2.5:2.5 }"
            style="margin-top: 16px"
          />
          </div>
          <div>
          <div style="font-size: 16px; margin:32px 0;color:var(--text-primary)" v-if="configuration.currentType !== 'filled'">
          {{ lang.iconTypeText }}
            <t-radio-group v-model="configuration.strokeTypes" variant="default-filled" style="margin-top:8px">
              <t-radio-button value="outline">{{ lang.strokeTypes.outline }}</t-radio-button>
              <t-radio-button value="outlineFilled">{{ lang.strokeTypes.outlineFilled }}</t-radio-button>
            </t-radio-group>
          </div>
          <div v-if="configuration.currentType !== 'filled'" style="font-size: 16px;color:var(--text-primary)">
          {{ lang.colorText }}
          <t-radio-group v-model="configuration.colorType" variant="default-filled" style="margin-top:16px" :key="configuration.strokeTypes">
            <t-radio-button value="single" v-if="configuration.strokeTypes === 'outline'">{{ lang.colorTypes.single }}</t-radio-button>
            <t-radio-button value="double">{{ lang.colorTypes.double }}</t-radio-button>
            <t-radio-button value="multiple" v-if="configuration.strokeTypes === 'outlineFilled'">{{ lang.colorTypes.multiple }}</t-radio-button>
          </t-radio-group>
          </div>
          <div style="display: flex; gap: 16px;font-size: 14px;" v-if="configuration.currentType === 'filled' ||(configuration.currentType !== 'filled' && configuration.strokeTypes==='outlineFilled')">
            <div>
              <p style="color:var(--text-secondary)">{{ lang.fillColor1Text }}</p>
              <t-color-picker v-model="configuration.fillColor1" :color-modes="['monochrome']"  format="HEX" style="margin:8px 0 0 0"></t-color-picker>
            </div>
            <div v-if="configuration.currentType !== 'filled' && configuration.colorType === 'multiple'">
              <div v-if="configuration.colorType !== 'single'">
                <p style="color:var(--text-secondary)">{{ lang.fillColor2Text }}</p>
                <t-color-picker v-model="configuration.fillColor2" :color-modes="['monochrome']"  format="HEX"  style="margin:8px 0 0 0"></t-color-picker>
              </div>
            </div>
          </div>
          <div style="display: flex;gap: 16px;font-size: 14px;">
          <div v-if="configuration.currentType !== 'filled'">
          <p style="color:var(--text-secondary)">{{ lang.strokeColor1Text }}</p>
          <t-color-picker v-model="configuration.strokeColor1" :color-modes="['monochrome']"  format="HEX" style="margin:8px 0 0 0"></t-color-picker>
          </div>
          <div v-if="((configuration.colorType === 'double'&& configuration.strokeTypes==='outline')|| configuration.colorType ==='multiple')&& configuration.currentType !== 'filled'">
          <p style="color:var(--text-secondary)">{{ lang.strokeColor2Text }}</p>
          <t-color-picker v-model="configuration.strokeColor2" :color-modes="['monochrome']"  format="HEX" style="margin:8px 0 0 0"></t-color-picker>
          </div>
          </div>
          </div>
          <t-button theme="default" @click="handleReset">{{ lang.resetText }}</t-button>
        </t-space>

  </div>
    <!-- 中间图标展示 -->
    <div class="t-icons-view__content scrollbar">
          <div>
          <div v-for="(icons,index) in allIcons" :key="index" @mousemove="(e)=>handleHoverIcon(e)">
            <p class="category-title" style="display: flex;align-items: center; font-weight: 600;" @mouseenter="hidePopover">
              <span :id="icons.type" style="margin-right: 8px; font-size: 16px;">{{ isEn? icons.labelEn : icons.title}}</span>
              <t-tag>{{icons.count}}</t-tag>
            </p>
            <li
              v-for="(icon,index) in icons.icons"
              :key="index"
              class="t-icons-view__wrapper"
              :id="icon.name"
            >
              <svg width="1em" height="1em" style="font-size: 30px; margin-bottom: 8px">
                <use :href="`#t-icon-${icon.name}`" />
              </svg>
              <div class="t-icons-view__name">{{ icon.name }}</div>
            </li>
          </div>
          </div>
    </div>

  <div class="t-icons-view__operation" id="tooltip" role="tooltip" style="display: none;"  v-if="!isFrameworkContent">
    <div @click="()=>handleCopyIcon('svg')">{{lang.operationText.copySvg}}</div>
    <div @click="()=>handleCopyIcon('png')">{{lang.operationText.copyPng}}</div>
    <div @click="()=>handleCopyIcon('name')">{{lang.operationText.copyName}}</div>
    <div @click="()=>handleCopyIcon('react')">{{lang.operationText.copyReact}}</div>
    <div @click="()=>handleCopyIcon('vue')">{{lang.operationText.copyVue}}</div>
    <t-divider style="margin: 2px 0"/>
    <div @click="()=>handleDownloadIcon('svg')">{{lang.operationText.downloadSvg}}</div>
    <div @click="()=>handleDownloadIcon('png')">{{lang.operationText.downloadPng}}</div>
  </div>
  <svg-sprite
    :stroke-width="configuration.strokeWidth"
    :fill-color1="configuration.fillColor1"
    :fill-color="configuration.fillColor1"
    :fill-color2="configuration.fillColor2"
    :stroke-color1="configuration.strokeColor1"
    :stroke-color2="configuration.strokeColor2"
    :stroke-color="configuration.strokeColor1"
  />
  </div>
</template>

<script setup lang="jsx">
import {
  RadioGroup as TRadioGroup,
  RadioButton as TRadioButton,
  Space as TSpace,
  MessagePlugin,
  Input as TInput,
  Slider as TSlider,
  ColorPicker as TColorPicker,
  Tag as TTag,
  Divider as TDivider,
  Button as TButton,
  Link as TLink,
} from 'tdesign-vue-next';

import { SearchIcon } from 'tdesign-icons-vue-next';
import {
  onMounted,
  ref,
  computed,
  shallowRef,
  reactive,
  watch,
  nextTick,
  defineProps,
} from 'vue';
import forEach from 'lodash/forEach';
import debounce from 'lodash/debounce';
import { createPopper } from '@popperjs/core';
import { zhCN, enUS } from './i18n';
import {
  calcNavHighlight, proxyTitleAnchor, getRoot, anchorHighlight, appendStyleSheet, kebabToPascal,
} from './utils/index';
import { manifest as manifestSrc } from './manifest';
import SvgSprite from '../gulp/template/svg-sprite.vue';

let popperInstance = null;

const initConfiguration = {
  currentType: 'outline',
  colorType: 'single',
  strokeTypes: 'outline',
  activeCategory: '',
  strokeWidth: 2,
  fillColor1: 'transparent',
  fillColor2: 'transparent',
  strokeColor1: 'currentColor',
  strokeColor2: 'currentColor',
};

const props = defineProps({
  // 是否为嵌入框架的渲染内容
  frameworkContent: {
    type: Boolean,
    default: false,
  },
});

const manifest = shallowRef(manifestSrc);
const lang = ref(zhCN);
const initialized = ref(false);
const isEn = ref(false);
const searchStr = ref('');
const anchorArr = ref([]);
const linkTopArr = ref([]);
const currentIconName = ref('');
const count = ref(0);
const activeCategory = ref('');

// default icon configurations
const configuration = reactive({
  ...initConfiguration,
});

watch(() => configuration.currentType, (newType) => {
  if (!initialized.value) return;
  if (newType === 'filled' && configuration.fillColor1 === 'transparent') { configuration.fillColor1 = 'currentColor'; } else if (newType === 'outline' && configuration.fillColor1 === 'currentColor') configuration.fillColor1 = 'transparent';
  activeCategory.value = getRoot()?.querySelector('.active').innerHTML;
  nextTick(() => {
    getHighlightRefValue();
    registerScrollEvent();
  });
});

watch(() => configuration.fillColor1, (newColor) => {
  if (configuration.colorType === 'single') {
    configuration.fillColor2 = newColor;
  } else if (configuration.colorType === 'double' && configuration.strokeTypes === 'outlineFilled') {
    configuration.fillColor2 = newColor;
  }
});

watch(() => configuration.strokeColor1, (newColor) => {
  if (configuration.colorType === 'single') {
    configuration.strokeColor2 = newColor;
  } else if (configuration.colorType === 'double' && configuration.strokeTypes === 'outlineFilled') {
    configuration.strokeColor2 = newColor;
  }
});

watch(() => configuration.strokeTypes, (newType) => {
  if (!initialized.value) return;
  configuration.colorType = 'double';
  if (newType === 'outlineFilled') {
    configuration.fillColor1 = '#bbd3fb';
    configuration.fillColor2 = '#bbd3fb';
    configuration.strokeColor2 = configuration.strokeColor1;
    return;
  }
  configuration.fillColor2 = 'transparent';
  configuration.fillColor1 = 'transparent';
});

watch(() => configuration.colorType, (newColorType) => {
  if (!initialized.value) return;
  if (newColorType === 'single') {
    configuration.strokeColor2 = configuration.strokeColor1;
  }
  if (newColorType === 'double') {
    if (configuration.strokeTypes === 'outlineFilled') {
      configuration.fillColor2 = configuration.fillColor1;
      configuration.strokeColor2 = configuration.strokeColor1;
    } else {
      configuration.strokeColor2 = '#0052d9';
    }
  }
  if (newColorType === 'multiple') {
    configuration.fillColor2 = '#f78d94';
    configuration.strokeColor2 = '#0052d9';
  }
});

watch(() => configuration, () => {
  if (isFrameworkContent.value) return;
  localStorage.setItem('tdesign-icons-editor', JSON.stringify(configuration));
}, {
  deep: true,
});

// 是否为嵌入框架内展示，减少展示内容和配置功能
const isFrameworkContent = computed(() => !!props.frameworkContent);

const categories = computed(
  () => ({
    ...manifest.value[configuration.currentType],
  } || {}),
);

const allIcons = computed(() => {
  const types = Object.keys(categories.value).sort();
  return types.reduce((acc, type) => acc.concat({
    type, labelEn: categories.value[type].labelEn, title: categories.value[type].labelCN, icons: categories.value[type].icons, count: categories.value[type].icons.length,
  }), []);
});

const scrollElementSelector = computed(() => (props.frameworkContent ? '.t-icons-view__content' : '.t-icons-view'));

const handleReset = () => {
  configuration.fillColor1 = configuration.currentType === 'filled' ? 'currentColor' : 'transparent';
  configuration.fillColor2 = initConfiguration.fillColor2;
  configuration.strokeColor1 = initConfiguration.strokeColor1;
  configuration.strokeColor2 = initConfiguration.strokeColor2;
  configuration.strokeWidth = initConfiguration.strokeWidth;
};

const handleHoverIcon = (e) => {
  let triggerNode = e.target;
  while (triggerNode?.tagName?.toLowerCase?.() !== 'li' && triggerNode?.parentNode) {
    triggerNode = triggerNode?.parentNode;
  }
  if (!triggerNode) return;

  currentIconName.value = triggerNode.getAttribute?.('id');
  const tooltip = getRoot()?.querySelector('#tooltip');
  tooltip.style.display = 'block';

  popperInstance = createPopper(triggerNode, tooltip, {
    placement: 'right-start',
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['right'],
        },
      },
    ],
  });
};

const getCurrentRawSvg = () => {
  const svg = getRoot()?.querySelector(`#t-icon-${currentIconName.value}`);
  const svgString = new XMLSerializer().serializeToString(svg);
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp('<symbol[^>]*>|<\/symbol>', 'g');
  const resultString = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">${svgString.replace(regex, '')}</svg>`;
  return resultString;
};

const handleCopyIcon = async (type) => {
  const isSingleColor = configuration.colorType === 'single';

  const fillColor = isSingleColor ? configuration.fillColor1 : JSON.stringify([configuration.fillColor1, configuration.fillColor2]);
  const strokeColor = isSingleColor ? configuration.strokeColor1 : JSON.stringify([configuration.strokeColor1, configuration.strokeColor2]);

  try {
    if (type === 'vue') {
      const fillText = !isSingleColor ? fillColor : `"${fillColor}"`;
      const strokeText = !isSingleColor ? strokeColor : `"${strokeColor}"`;
      await navigator.clipboard.writeText(`<${currentIconName.value}-icon :fill-color='${fillText}' :stroke-color='${strokeText}' :stroke-width="${configuration.strokeWidth}"/>`);
    } else if (type === 'react') {
      const fillText = !isSingleColor ? `{${fillColor}}` : `'${fillColor}'`;
      const strokeText = !isSingleColor ? `{${strokeColor}}` : `'${strokeColor}'`;
      await navigator.clipboard.writeText(`<${kebabToPascal(currentIconName.value)}Icon fillColor=${fillText} strokeColor=${strokeText} strokeWidth={${configuration.strokeWidth}}/>`);
    } else if (type === 'svg') {
    // copy svg content
      const resultString = getCurrentRawSvg();
      await navigator.clipboard.writeText(resultString);
    } else if (type === 'name') {
      await navigator.clipboard.writeText(currentIconName.value);
    } else {
      const resultString = getCurrentRawSvg();
      const svgBlob = new Blob([resultString], { type: 'image/svg+xml;charset=utf-8' });
      const canvas = document.createElement('canvas');
      canvas.width = 24;
      canvas.height = 24;
      const ctx = canvas.getContext('2d');
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = () => {
        ctx.drawImage(img, 0, 0);

        const pngUrl = canvas.toDataURL('image/png');

        fetch(pngUrl)
          .then((res) => res.blob())
          .then((blob) => {
          // 使用 Clipboard API 复制到剪贴板
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          });
      };
      img.src = url;
    }
    MessagePlugin.success(lang.value.copied);
  } catch {
    MessagePlugin.error(lang.value.copyFailed);
  }
};

const handleDownloadIcon = (type) => {
  const svgString = getCurrentRawSvg();
  try {
    if (type === 'svg') {
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const imgUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = `${currentIconName.value}.svg`;
      a.target = '_blank';
      a.href = imgUrl;
      a.click();
    } else {
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const canvas = document.createElement('canvas');
      canvas.width = 24;
      canvas.height = 24;
      const ctx = canvas.getContext('2d');
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = () => {
        ctx.drawImage(img, 0, 0);

        const pngUrl = canvas.toDataURL('image/png');

        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `${currentIconName.value}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  } catch {
    MessagePlugin.success(lang.value.downloadFailed);
  } finally {
    MessagePlugin.success(lang.value.downloaded);
  }
};

const handleSearchIcon = debounce((searchStr) => {
  if (!searchStr) {
    manifest.value = manifestSrc;
  } else {
    const searchManifest = {};
    forEach(manifestSrc, (categories, key) => {
      searchManifest[key] = {};
      forEach(categories, (ctx, category) => {
        if (ctx.labelCN.indexOf(searchStr) > -1 || ctx.labelEn.indexOf(searchStr) > -1) {
          searchManifest[key][category] = ctx;
        } else {
          ctx.icons.forEach((icon) => {
            if (icon.name.indexOf(searchStr) > -1 || icon.keywords.find((keyword) => keyword.indexOf(searchStr) > -1)) {
              if (!searchManifest[key][category]) {
                searchManifest[key][category] = {
                  labelCN: ctx.labelCN,
                  labelEn: ctx.labelEn,
                  icons: [],
                };
              }
              searchManifest[key][category].icons.push(icon);
            }
          });
        }
      });
    });
    manifest.value = searchManifest;
  }
  const tabCategories = Object.keys(categories.value);
  configuration.activeCategory = tabCategories.length ? categories.value[tabCategories?.[0]]?.labelEn : '';
  nextTick(() => {
    getHighlightRefValue();
    registerScrollEvent();
  });
}, 250);

const activeCurrentCategory = () => {
  hidePopover();
  anchorHighlight(anchorArr.value, linkTopArr.value, scrollElementSelector.value);
};

const registerScrollEvent = () => {
  activeCurrentCategory();
  getRoot()?.querySelector(scrollElementSelector.value).removeEventListener('scroll', activeCurrentCategory);

  getRoot()?.querySelector(scrollElementSelector.value).addEventListener('scroll', activeCurrentCategory);
};

const getHighlightRefValue = () => {
  const {
    anchorList,
    linkTopList,
  } = calcNavHighlight();

  anchorArr.value = anchorList;
  linkTopArr.value = linkTopList;
};

const hidePopover = () => {
  const tooltipEle = getRoot()?.querySelector('#tooltip');
  if (popperInstance) {
    tooltipEle.style.display = 'none';
    popperInstance.destroy();
    popperInstance = null;
  }
};

onMounted(() => {
  const en = window.location.pathname.endsWith('en');
  const configCache = JSON.parse(localStorage.getItem('tdesign-icons-editor'));

  isEn.value = en;
  lang.value = en ? enUS : zhCN;
  if (configCache && !isFrameworkContent.value) {
    configuration.colorType = configCache.colorType;
    configuration.strokeTypes = configCache.strokeTypes;
    configuration.strokeWidth = configCache.strokeWidth;
    configuration.strokeColor2 = configCache.strokeColor2;
    configuration.strokeColor1 = configCache.strokeColor1;
    configuration.fillColor1 = configCache.fillColor1;
    configuration.fillColor2 = configCache.fillColor2;
  }

  Object.keys(manifest.value).forEach((renderType) => {
    const currentIcons = manifest.value[renderType];
    const types = Object.keys(currentIcons);

    types.forEach((item) => {
      count.value += currentIcons[item].icons.length;
    });
  });

  nextTick(() => {
    initialized.value = true;
    getHighlightRefValue();
    registerScrollEvent();
    appendStyleSheet();
  });

  document.addEventListener('click', (e) => {
    const contentNode = getRoot()?.querySelector('.t-icons-view__content');
    if (
      !contentNode.contains(e.target) && !e.composedPath().includes(contentNode)
    ) {
      hidePopover();
    }
  });
});

</script>
<style>
@import './styles/icon-view.css';
</style>
