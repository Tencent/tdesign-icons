<template>
  <t-space :style="{ width: '100%' }" direction="vertical">
    <div :style="{ width: '100%', display: 'flex' }">
      <t-radio-group v-model="currentType" variant="default-filled">
        <t-radio-button value="filled">{{ lang.types.filled }}</t-radio-button>
        <t-radio-button value="outline">{{
          lang.types.outline
        }}</t-radio-button>
      </t-radio-group>
      <t-input
        :placeholder="lang.search"
        :style="{ flex: 1, marginLeft: '16px' }"
      />
    </div>
    <div>
      <t-tabs v-model="selectTab">
        <t-tab-panel v-for="tab in tabs" :label="tab.labelCN" :value="tab.labelEn">
          <t-icon v-for="(icon) in tab.icons" :name="icon" :key="icon"></t-icon>
        </t-tab-panel>
      </t-tabs>
    </div>
  </t-space>
</template>
<script setup>
import {
  RadioGroup as TRadioGroup,
  RadioButton as TRadioButton,
  Input as TInput,
  Space as TSpace,
  Tabs as TTabs,
  TabPanel as TTabPanel,
} from "tdesign-vue";
import { Icon as TIcon } from 'tdesign-icons-vue'
import { onMounted, ref, computed, watch } from "vue";
import zhCN from "./i18n/zh-CN";
import enUS from "./i18n/en-US";
import { categories } from "./category";

const lang = ref(zhCN);
const currentType = ref("filled");
const selectTab = ref("");

const tabs = computed(() => {
  return categories[currentType.value] || {};
});

onMounted(() => {
  const isEn = window.location.pathname.endsWith("en");
  lang.value = isEn ? enUS : zhCN;
});

watch(
  () => currentType.value,
  () => {
    const tabCategories = Object.keys(tabs.value);
    selectTab.value = tabs.value[tabCategories[0]].labelEn;
  }
);
</script>
<style scoped>
@import "../node_modules/tdesign-vue/dist/tdesign.css";
@import "./vars.css";
</style>
