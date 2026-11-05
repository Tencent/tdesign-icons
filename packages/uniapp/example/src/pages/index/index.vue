<template>
  <view class="page">
    <view class="header">
      <view class="header-title">TDesign Icons · uni-app</view>
      <view class="header-desc">通过 uni_modules + easycom 直接使用，无需 import</view>
    </view>

    <!-- 配置面板 -->
    <view class="panel">
      <view class="panel-row">
        <text class="panel-label">颜色模式</text>
        <view class="segmented">
          <view
            v-for="item in colorTypes"
            :key="item.key"
            class="segmented-item"
            :class="{ 'segmented-item--active': colorType === item.key }"
            @click="colorType = item.key"
          >
            {{ item.label }}
          </view>
        </view>
      </view>

      <view class="panel-row">
        <text class="panel-label">描边宽度 {{ strokeWidth }}</text>
        <slider
          class="panel-slider"
          :value="strokeWidth"
          :min="1"
          :max="3"
          :step="0.5"
          active-color="#0052d9"
          block-color="#0052d9"
          :block-size="16"
          @change="onStrokeWidthChange"
        />
      </view>

      <view class="panel-row">
        <text class="panel-label">图标尺寸</text>
        <view class="chips">
          <view
            v-for="item in sizeOptions"
            :key="item"
            class="chip"
            :class="{ 'chip--active': size === item }"
            @click="size = item"
          >
            {{ item }}
          </view>
        </view>
      </view>
    </view>

    <!--
      easycom 自动扫描 uni_modules/<id>/components/<name>/<name>.vue，
      所以这里直接写 <ability-open-icon /> 即可，不需要 import 和 components 注册。
    -->
    <view class="section-title">多色 / 可变线宽</view>
    <view class="grid">
      <ability-open-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <abstract-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <accessibility-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <system-components-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <chart-pie-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <logo-tdesign-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
    </view>

    <view class="section-title">常用图标</view>
    <view class="grid">
      <close-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <check-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <search-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <home-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <user-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <setting-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <add-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <heart-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <star-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <notification-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <mail-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      <camera-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
    </view>
  </view>
</template>

<script>
import { COLOR_TYPES, SIZE_OPTIONS, resolveColors } from '../../utils/demo';

export default {
  data() {
    return {
      colorTypes: COLOR_TYPES,
      sizeOptions: SIZE_OPTIONS,
      colorType: 'double',
      strokeWidth: 2,
      size: '32px',
    };
  },
  computed: {
    colors() {
      return resolveColors(this.colorType);
    },
  },
  methods: {
    onStrokeWidthChange(e) {
      this.strokeWidth = e.detail.value;
    },
  },
};
</script>

<style>
.page {
  min-height: 100vh;
  padding: 24rpx;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.header {
  padding: 8rpx 0 24rpx;
}

.header-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #181818;
}

.header-desc {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #888;
}

.section-title {
  padding: 8rpx 0 16rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: #333;
}

.panel {
  padding: 24rpx;
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
}

.panel-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 24rpx;
}

.panel-row:last-child {
  margin-bottom: 0;
}

.panel-label {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 12rpx;
}

.panel-slider {
  margin: 0 8rpx;
}

.segmented {
  display: flex;
  background-color: #f5f5f5;
  border-radius: 12rpx;
  padding: 6rpx;
}

.segmented-item {
  flex: 1;
  text-align: center;
  padding: 14rpx 0;
  font-size: 26rpx;
  color: #666;
  border-radius: 10rpx;
}

.segmented-item--active {
  background-color: #0052d9;
  color: #fff;
  font-weight: 600;
}

.chips {
  display: flex;
  flex-wrap: wrap;
}

.chip {
  padding: 10rpx 24rpx;
  margin: 0 16rpx 12rpx 0;
  font-size: 24rpx;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 100rpx;
}

.chip--active {
  background-color: #e6eeff;
  color: #0052d9;
  font-weight: 600;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.grid-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 8rpx;
}

.grid-name {
  margin-top: 12rpx;
  font-size: 20rpx;
  color: #999;
}

.demo-icon {
  margin: 20rpx;
}
</style>
