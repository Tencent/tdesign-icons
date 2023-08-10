<template>
  <div>
    <svg-sprite />
    <t-space
      :style="{ width: '100%', background: 'var(--bg-color-page)' }"
      direction="vertical"
      size="8px"
    >
      <div
        :style="{
          width: '100%',
          display: 'flex',
          marginTop: '10px',
          padding: '0 16px',
        }"
      >
        <t-radio-group v-model="currentType" variant="default-filled">
          <t-radio-button value="outline">{{
            lang.types.outline
          }}</t-radio-button>
          <t-radio-button value="filled">{{
            lang.types.filled
          }}</t-radio-button>
        </t-radio-group>
      </div>
      <div>
        <t-tabs v-model="selectTab">
          <t-tab-panel
            v-for="tab in tabs"
            :label="isEn ? tab.labelEn : tab.labelCN"
            :value="tab.labelEn"
            :key="tab.labelEn"
          >
            <div
              style="
                display: flex;
                flex-wrap: wrap;
                min-height: 200px;
                padding: 0 16px;
              "
            >
              <div
                class="t-icons-view__count"
                :style="{
                  marginTop: '16px',
                }"
              >
                <span>{{ isEn ? tab.labelEn : tab.labelCN }}</span>
                <t-tag :style="{ marginLeft: '8px' }">{{
                  tab.icons.length
                }}</t-tag>
              </div>
              <t-divider :style="{ margin: '8px 0 16px 0' }" />
              <li v-for="icon in tab.icons" class="t-icons-view__wrapper" :key="icon.name">
                <svg
                  width="1em"
                  height="1em"
                  style="font-size: 30px; margin-bottom: 8px"
                >
                  <use :href="`#t-icon-${icon.name}`" />
                </svg>
                <div class="t-icons-view__name">{{ icon.name }}</div>
                <div
                  class="t-icons-view__actions"
                  v-if="showType === 'develop'"
                >
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
                </div>
                <div
                  class="t-icons-view__actions"
                  v-if="showType === 'design'"
                >
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
          </t-tab-panel>
        </t-tabs>
      </div>
    </t-space>
  </div>
</template>
<script setup>
import {
  RadioGroup as TRadioGroup,
  RadioButton as TRadioButton,
  Space as TSpace,
  Tabs as TTabs,
  TabPanel as TTabPanel,
  Divider as TDivider,
  Tag as TTag,
  MessagePlugin,
} from 'tdesign-vue';
import {
  onMounted, ref, computed, watch, defineProps,
} from 'vue';
import zhCN from './i18n/zh-CN';
import enUS from './i18n/en-US';
import { manifest } from './manifest';
import SvgSprite from '../gulp/template/svg-sprite.vue';

defineProps({
  showType: {
    type: String,
    default: 'develop',
  },
});

const lang = ref(zhCN);
const isEn = ref(false);
const currentType = ref('outline');
const selectTab = ref('');

const kebabToPascal = (str) => {
  const words = str.split('-');

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );

  return capitalizedWords.join('');
};

const tabs = computed(() => manifest[currentType.value] || {});

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

const handleDownloadIcon = (iconName, svgString) => {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const imgUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = `${iconName}.svg`;
  a.target = '_blank';
  a.href = imgUrl;
  a.click();
};

onMounted(() => {
  const en = window.location.pathname.endsWith('en');
  isEn.value = en;
  lang.value = en ? enUS : zhCN;
  const tabCategories = Object.keys(tabs.value);
  selectTab.value = tabs.value[tabCategories[0]].labelEn;
});

watch(
  () => [currentType.value],
  () => {
    const tabCategories = Object.keys(tabs.value);
    selectTab.value = tabs.value[tabCategories[0]].labelEn;
  },
);
</script>
<style>
@import "../node_modules/tdesign-vue/dist/tdesign.css";
@import "./vars.css";
.t-tabs__btn {
  height: 24px !important;
  width: 24px;
}
.t-tabs__operations {
  top: 4px;
}
.t-tabs__header {
  background-color: var(--bg-color-page);
  padding: 0 16px;
}
.t-tabs__nav-item {
  font-size: 12px;
  height: 32px !important;
  line-height: 32px !important;
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 6px;
  position: relative;
}
.t-icons-view__wrapper:hover {
  background: var(--bg-color-demo-hover);
}
.t-icons-view__wrapper:hover > .t-icons-view__name {
  opacity: 0;
  visibility: hidden;
}
.t-icons-view__wrapper:hover > .t-icons-view__actions {
  opacity: 1;
  visibility: visible;
}
.t-icons-view__actions {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.1s linear;
}
.t-icons-view__actions-divider {
  border-left: 1px solid var(--component-border);
  border-top: 0;
  display: inline-block;
  height: 0.9em;
  margin: 0 8px;
  vertical-align: middle;
}

.t-icons-view__actions span {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s linear;
  color: var(--text-secondary);
}

.t-icons-view__actions span:hover {
  color: var(--text-primary);
}
</style>
