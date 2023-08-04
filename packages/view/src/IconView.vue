<template>
  <t-space style="width: 100%">
    <t-space>
      <t-radio-group default-value="filled" variant="default-filled">
        <t-radio-button value="filled">{{ lang.types.filled }}</t-radio-button>
        <t-radio-button value="outline">{{
          lang.types.outline
        }}</t-radio-button>
      </t-radio-group>
      <t-input :placeholder="lang.search" />
    </t-space>
    <t-space>
      
    </t-space>
  </t-space>
</template>
<script setup>
import {
  RadioGroup as TRadioGroup,
  RadioButton as TRadioButton,
  Input as TInput,
  Space as TSpace,
} from "tdesign-vue";
import { onMounted, ref } from "vue";
import zhCN from "./i18n/zh-CN";
import enUS from "./i18n/en-US";

const lang = ref();
onMounted(() => {
  const isEn = window.location.pathname.endsWith("en");
  lang.value = isEn ? enUS : zhCN;
});
</script>
<style></style>
<style lang="less" scoped>
@import "../node_modules/tdesign-vue/dist/tdesign.css";
</style>
