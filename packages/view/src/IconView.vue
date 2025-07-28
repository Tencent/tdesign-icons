<template>
  <div class="t-icons-view">
    <div class="t-icons-view__header">
      <div class="content">
        <h1> Icon 图标资源</h1>

        <div class="t-icons-view__header-description">
          <p>2114 Icons ｜ 2025.06.28 更新｜ Figma 链接</p>
          <t-input :placeholder="lang.search" :style="{ marginLeft: '16px', width: '480px' }" @change="handleSearchIcon" v-model="searchStr">

            <template #suffixIcon>
              <div v-if="model">
              <input type="file" @change="beginClassify" style="opacity: 0; position: absolute;"/>
              <t-icon name="image" />
            </div>
             </template>
          </t-input>
          <img id="img" style="display: none;"></img>
        </div>
      </div>
    </div>
    <div style="margin-top: 190px;display: flex">

        <div class="t-icons-view__categories">
          <div v-for="(category,index) in categories" :key="index" class="t-icons-view__categories-link">
            <a theme="default" variant="text" class="categories-link" :href='`#${category.labelEn}`' @click="proxyTitleAnchor">{{ isEn? category.labelEn: category.labelCN }}</a>
          </div>
        </div>
        <t-divider layout="vertical" style="height: auto;" />
        <div class="t-icons-view__content" @click="handleClick">
          <div v-for="(icons,index) in allIcons" :key="index">
            <p>
              <span :id="icons.type" style="margin-right: 8px">{{icons.title}}</span>
              <t-tag>{{icons.count}}</t-tag>
            </p>
            <li v-for="(icon,index) in icons.icons" :key="index" class="t-icons-view__wrapper" :id="icon.name" >
            <svg width="1em" height="1em" style="font-size: 30px; margin-bottom: 8px">
              <use :href="`#t-icon-${icon.name}`" />
            </svg>
            <div class="t-icons-view__name">{{ icon.name }}</div>
            <div v-if="false" class="t-icons-view__actions">
              <svg
                width="1em"
                height="1em"
                style="font-size: 20px; color: var(--text-secondary)"
                @click="() => handleCopyFile('name', icon.name)"
              >
                <use :href="`#t-icon-file-copy`" />
              </svg>
              <div class="t-icons-view__actions-divider"></div>
              <svg
                width="1em"
                height="1em"
                style="font-size: 20px; color: var(--text-secondary)"
                @click="() => handleCopyFile('component', icon.name)"
              >
                <use :href="`#t-icon-file-icon`" />
              </svg>

              <svg
                width="1em"
                height="1em"
                style="font-size: 20px; color: var(--text-secondary)"
                @click="() => handleCopyFile('content', icon.svgString)"
              >
                <use :href="`#t-icon-file-copy`" />
              </svg>
              <div class="t-icons-view__actions-divider"></div>
              <svg
                width="1em"
                height="1em"
                style="font-size: 20px; color: var(--text-secondary)"
                @click="() => handleDownloadIcon(icon.name, icon.svgString)"
              >
                <use :href="`#t-icon-download`" />
              </svg>
            </div>
            </li>
          </div>
        </div>
        <t-space direction="vertical" class="t-icons-view__operations" size="40px">
          <div>
          {{ lang.strokeText }}
          <t-radio-group v-model="configuration.currentType" variant="default-filled" style="margin-top:16px">
            <t-radio-button value="outline">{{ lang.types.outline }}</t-radio-button>
            <t-radio-button value="filled">{{ lang.types.filled }}</t-radio-button>
          </t-radio-group>
          </div>
          <div>
          {{ lang.strokeText }}
          <t-slider v-model="configuration.strokeWidth" :step="0.5" :min="0.5" :max="3" :marks="{ 0.5:0.5,1:1,1.5:1.5,2:2,2.5:2.5 }"  style="margin-top:16px"></t-slider>
          </div>
          <div>
          填充颜色1
          <t-color-picker v-model="configuration.fillColor1" :color-modes="['monochrome']"  style="margin:16px 0"></t-color-picker>
          填充颜色2
          <t-color-picker v-model="configuration.fillColor2" :color-modes="['monochrome']"   style="margin:16px 0"></t-color-picker>
          线段颜色1
          <t-color-picker v-model="configuration.strokeColor1" :color-modes="['monochrome']"   style="margin:16px 0"></t-color-picker>
          线段颜色2
          <t-color-picker v-model="configuration.strokeColor2" :color-modes="['monochrome']"   style="margin:16px 0"></t-color-picker>
          </div>
        </t-space>

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
  Divider as TDivider,
  Tag as TTag,
  PopupPlugin,
  Icon as TIcon,
  Button as TButton,
} from 'tdesign-vue';

import {
  onMounted, ref, computed, shallowRef,
  reactive, watch
} from 'vue';
import forEach from 'lodash/forEach';
import debounce from 'lodash/debounce';

import { zhCN, enUS } from './i18n';
import {
  anchorHighlight, calcNavHighlight, proxyTitleAnchor, getRoot,
} from './utils/index';
import { manifest as manifestSrc } from './manifest';
import SvgSprite from '../gulp/template/svg-sprite.vue';

// eslint-disable-next-line import/no-webpack-loader-syntax
import themeVariables from '!raw-loader!./styles/vars.css';

import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const iconViewId = 'TDESIGN_ICON_VIEW';

const manifest = shallowRef(manifestSrc);
const lang = ref(zhCN);
const isEn = ref(false);
const model = ref(null);
const searchStr = ref('');
// icon configurations
const configuration = reactive({
  currentType: 'outline',
  activeCategory: '',
  strokeWidth: 2,
  fillColor1: '#fff',
  fillColor2: '#fff',
  strokeColor1: '#000',
  strokeColor2: '#000',
});

watch(()=>configuration.currentType, (newType) => {
  if (newType === 'filled' && configuration.fillColor1 === '#fff') 
    configuration.fillColor1 = '#000';
  else if (newType === 'outline' && configuration.fillColor1 === '#000')
    configuration.fillColor1 = '#fff';
});


const beginClassify = async (e) => {
  const file = e.target.files[0];

  const preview = getRoot().getElementById('img');
  preview.src = URL.createObjectURL(file);

  const img = await createImageBitmap(file);
  const tensor = tf.browser.fromPixels(img);
  const predictions = await model.value.classify(tensor); // 将图片传入预训练模型，并返回预测结果

  searchStr.value = predictions[0].className;
  handleSearchIcon(predictions[0].className);
};

const kebabToPascal = (str) => {
  const words = str.split('-');

  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return capitalizedWords.join('');
};
const categories = computed(
  () => ({
    ...manifest.value[configuration.currentType],
  } || {}),
);
const allIcons = computed(() => {
  const types = Object.keys(categories.value);
  return types.reduce((acc, type) => acc.concat({
    type, title: categories.value[type].labelCN, icons: categories.value[type].icons, count: categories.value[type].icons.length,
  }), []);
});

const handleClick = (e) => {
  const targetId = e.target.id || e.target.parentNode.id;
  if (!targetId) return;
  const id = `#${targetId}`;
  PopupPlugin(id, ()=>
    <div class="t-icons-view__actions">
      <div onClick={()=> handleDownloadIcon(icon.name)}>复制SVG</div>
      <div onClick={()=> handleDownloadIcon(icon.name)}>复制PNG</div>
      <div onClick={()=> handleDownloadIcon(icon.name)}>复制 Vue 代码</div>
      <div style="border-bottom:1px solid #e8e8e8" onClick={()=> handleDownloadIcon(icon.name)}>复制 React 代码</div>
      <div onClick={()=> handleDownloadIcon(icon.name)}>下载 SVG </div>
      <div onClick={()=> handleDownloadIcon(icon.name)}>下载 PNG</div>
    </div>,
    {
    placement: 'right',
    showArrow: false,

    });
};
const appendStyleSheet = () => {
  const componentVariablesExist = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--td-brand-color');
  const siteVariablesExist = window.getComputedStyle(document.documentElement).getPropertyValue('--brand-main');

  if (componentVariablesExist && siteVariablesExist) return;

  const styleSheet = document.createElement('style');
  let variables = '';
  if (!componentVariablesExist) variables += tdesignVariables;
  if (!siteVariablesExist) variables += themeVariables;
  styleSheet.id = iconViewId;
  styleSheet.innerText = variables;
  document.head.appendChild(styleSheet);
};

const handleCopyFile = async (type, name) => {
  if (type === 'name') {
    // copy icon kebab-case name
    await navigator.clipboard.writeText(name);
  } else if (type === 'component') {
    // copy icon PascalCase name
    await navigator.clipboard.writeText(`<${kebabToPascal(name)}Icon />`);
  } else {
    // copy svg content
    await navigator.clipboard.writeText(name);
  }
  MessagePlugin.success(lang.value.copied);
};

const handleDownloadIcon = (iconName) => {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const imgUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = `${iconName}.svg`;
  a.target = '_blank';
  a.href = imgUrl;
  a.click();
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
}, 250);

const activeCategories = () => {
  const {
    anchorList,
    linkTopList,
  } = calcNavHighlight();

  anchorHighlight(anchorList, linkTopList);
  getRoot()?.querySelector('.t-icons-view__content').addEventListener('scroll', () => anchorHighlight(anchorList,
    linkTopList));
};
onMounted(async () => {
  const en = window.location.pathname.endsWith('en');
  isEn.value = en;
  lang.value = en ? enUS : zhCN;
  // model.value = await mobilenet.load();

  setTimeout(() => {
    appendStyleSheet();
    activeCategories();
  });
});

</script>
<style>
@import '../node_modules/tdesign-vue/dist/tdesign.min.css';
body {
  overflow: hidden;
}
.t-icons-view {
  background-color: var(--bg-color-container);
  padding: 0 calc(calc(100vw - 1200px)/2);
}
.t-icons-view__header {
  padding: 0 calc(calc(100vw - 1200px)/2);
  position: fixed;
  top: 64px;
  border-bottom: 1px solid var(--component-border);
  width: 100%;
  box-sizing: border-box;
  right: 0;
}
.t-icons-view__header h1 {
  color: var(--text-primary);
}
.t-icons-view__header-description {
  display: flex;
}
.t-icons-view__header-description p {
  font-size: 14px;
  flex: 1;
  color: var(--text-secondary);
}
.t-icons-view__categories {
  padding-top: 32px;
}
.t-icons-view__name {
  text-align: center;
}

.t-icons-view__categories-link {
  height: 36px;
  line-height: 36px;
  width: 132px;
  border-radius: 3px;
  margin-bottom: 4px;
}
.t-icons-view__categories-link:hover{
  background: var(--bg-color-demo-hover);
}
.categories-link {
  color: var(--text-primary);
  text-decoration: none;
  width: auto;
  text-align: left;
  height: 100%;
  display: block;
  padding-left: 16px;
  border-radius: 3px;
}

.categories-link.active{
 color: var(--brand-main);
 background: #F2F3FF;

}
.t-icons-view__content {
  flex: 1;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  margin-top: 32px;
}
.t-icons-view__count {
  display: flex;
  justify-content: center;
  width: 100%;
}

.t-icons-view__wrapper {
  width: calc(1 / 6 * 100%);
  height: 100px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 6px;
  padding-top: 16px;
  position: relative;
  box-sizing: border-box;

}
.t-icons-view__wrapper:hover {
  background: var(--bg-color-demo-hover);
}
.t-icons-view__actions {
  cursor: pointer;
  width: 160px;

  box-sizing: border-box;
}
.t-icons-view__actions div {
  height: 28px;
  line-height: 28px;
  border-radius: 3px;
  padding: 4px;
}

.t-icons-view__actions div:hover {
  color: var(--brand-main);
  background: #F2F3FF;
}
.t-icons-view__operations {
  margin-top: 32px;
  width: 305px;
  padding: 24px;
  background-color: var(--bg-color-component);
  height: fit-content;
  border-radius: 6px;
  margin-left: 32px;
}
.t-radio-group {
  width: 100%;
}
.t-radio-button {
  width: 50%;
  text-align: center;
}
</style>
