<template>
  <view class="page">
    <view class="header">
      <view class="header-title">TDesign Icons · uni-app</view>
      <view class="header-desc">全量图标用 CDN 字体单色渲染 · 多色 / 可变描边宽度挑几个演示</view>
    </view>

    <!-- 两个演示入口：全量单色图标 / 多色可变处理 -->
    <view class="tabs">
      <view
        v-for="item in tabs"
        :key="item.key"
        class="tab"
        :class="{ 'tab--active': activeTab === item.key }"
        @click="activeTab = item.key"
      >{{ item.label }}</view>
    </view>

    <!--
      Tab 1：全部图标。
      t-icon 走字体图标（CDN 字体 + 码点映射），用 <text> 渲染 unicode 字符，
      切换颜色 / 尺寸只是 CSS，不重算图标内容、不重新解码图片。
      图标名清单由 pnpm run generate 从固定版本的 CDN 字体 CSS 解析。
    -->
    <view v-if="activeTab === 'all'">
      <view class="panel">
        <view class="panel-row">
          <text class="panel-label">图标颜色</text>
          <view class="chips">
            <view
              v-for="item in colorOptions"
              :key="item"
              class="chip"
              :class="{ 'chip--active': iconColor === item }"
              @click="iconColor = item"
            >
              <view class="color-dot" :style="{ backgroundColor: item }"></view>
              <text>{{ item }}</text>
            </view>
          </view>
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
            >{{ item }}</view>
          </view>
        </view>
      </view>

      <view class="search">
        <input
          class="search-input"
          :value="keyword"
          placeholder="搜索图标名，如 chart / arrow"
          confirm-type="search"
          @input="onSearch"
        />
      </view>

      <view class="section-title">全部图标 · 字体图标（{{ matchedCount }} / {{ total }}）</view>
      <view class="list-hint">当前渲染 {{ visibleNames.length }} 个 · 滚动到底自动加载更多</view>
      <view class="icon-grid">
        <view v-for="name in visibleNames" :key="name" class="grid-item">
          <t-icon :name="name" :color="iconColor" :size="size" />
          <text class="grid-name">{{ name }}</text>
        </view>
      </view>
      <view v-if="hasMore" class="list-actions">
        <view class="load-more" @click="loadMore">加载更多（还有 {{ matchedCount - visibleNames.length }} 个）</view>
        <view class="load-all" @click="loadAll">加载全部</view>
      </view>
      <view v-else-if="matchedCount" class="list-end">已加载全部 {{ visibleNames.length }} 个</view>
      <view v-if="!matchedCount" class="empty">没有匹配的图标</view>
    </view>

    <view v-else>
      <!--
        Tab 2：多色 / 可变描边宽度。
        具体图标组件支持 strokeColor / fillColor / strokeWidth，但每个都是独立组件，
        全量引入会带来明显的体积与渲染开销，因此只挑几个带多色位的代表性图标演示。
        小程序端不支持动态组件，这里保持编译期静态标签（easycom 自动注册）。
      -->
      <view class="panel">
        <view class="panel-row">
          <text class="panel-label">描边类型（描边 / 描边-填充，对齐 view 的 strokeTypes）</text>
          <view class="segmented">
            <view
              v-for="item in strokeTypes"
              :key="item.key"
              class="segmented-item"
              :class="{ 'segmented-item--active': strokeType === item.key }"
              @click="onStrokeTypeChange(item.key)"
            >{{ item.label }}</view>
          </view>
        </view>

        <view class="panel-row">
          <text class="panel-label">颜色模式（随描边类型变化，对齐 view 的 colorType）</text>
          <view class="segmented">
            <view
              v-for="item in colorTypes"
              :key="item.key"
              class="segmented-item"
              :class="{ 'segmented-item--active': colorType === item.key }"
              @click="colorType = item.key"
            >{{ item.label }}</view>
          </view>
          <text class="panel-hint">{{ colorSummary }}</text>
          <text class="panel-hint">色位：填充 f1/f2、描边 s1/s2 · 描边双色=两个独立描边色、描边-填充双色=第 2 色位跟随、多色=4 色位独立</text>
        </view>

        <view class="panel-row">
          <text class="panel-label">配色（点击色块修改当前模式下生效的色位）</text>
          <view v-for="slot in activeSlots" :key="slot.key" class="slot-row">
            <text class="slot-label">{{ slot.label }}</text>
            <view class="slot-colors">
              <view
                v-for="c in colorPalette"
                :key="c"
                class="slot-color"
                :class="{ 'slot-color--active': slot.value === c }"
                :style="{ backgroundColor: c }"
                @click="setSlotColor(slot.key, c)"
              ></view>
            </view>
            <text class="slot-value">{{ slot.value }}</text>
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
            >{{ item }}</view>
          </view>
        </view>
      </view>

      <view class="section-title">多色 / 可变描边宽度 · 精选 {{ multicolorIcons.length }} 个</view>
      <view class="grid">
        <ability-open-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <abstract-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <accessibility-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <system-components-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <chart-pie-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <certificate-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <app-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <camera-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <chart-ring-1-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <building-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <brightness-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
        <cake-icon class="demo-icon" :size="size" :stroke-width="strokeWidth" :stroke-color="colors.strokeColor" :fill-color="colors.fillColor" />
      </view>

      <view class="note">
        全量图标共 {{ total }} 个，在「{{ tabs[0].label }}」标签里用 t-icon 单色展示。
        多色 / 可变描边宽度由每个图标的独立组件提供，把全部组件打进包里会带来明显的体积与渲染开销，
        因此这里只挑 {{ multicolorIcons.length }} 个带多色位的代表性图标演示。
      </view>
    </view>
  </view>
</template>

<script>
import { ICON_NAMES } from '../../utils/icon-names';
import {
  COLOR_PRESET,
  COLOR_TYPES,
  STROKE_TYPES,
  COLOR_OPTIONS,
  COLOR_PALETTE,
  COLOR_SLOTS,
  SIZE_OPTIONS,
  MULTICOLOR_ICONS,
  editableSlots,
  resolveColors,
} from '../../utils/demo';

/**
 * 字体图标很轻，但小程序里一次挂载 2358 个节点仍有开销。
 * 分批渲染让首屏、搜索、属性切换都只涉及当前这一批；
 * 且切换颜色 / 尺寸只改 CSS，不重算图标内容、不会重新解码图片。
 */
const PAGE_SIZE = 60;

export default {
  data() {
    return {
      activeTab: 'all',
      tabs: [
        { key: 'all', label: '全部图标（CDN 字体）' },
        { key: 'multi', label: '多色 / 可变' },
      ],
      strokeTypes: STROKE_TYPES,
      strokeType: 'outlineFilled',
      colorTypes: COLOR_TYPES.outlineFilled,
      colorOptions: COLOR_OPTIONS,
      sizeOptions: SIZE_OPTIONS,
      multicolorIcons: MULTICOLOR_ICONS,
      colorPalette: COLOR_PALETTE,
      colorSlots: COLOR_SLOTS,
      fillColor1: COLOR_PRESET.fillColor1,
      fillColor2: COLOR_PRESET.fillColor2,
      strokeColor1: COLOR_PRESET.strokeColor1,
      strokeColor2: COLOR_PRESET.strokeColor2,
      matchedCount: ICON_NAMES.length,
      visibleCount: PAGE_SIZE,
      colorType: 'double',
      strokeWidth: 2,
      size: '32px',
      iconColor: COLOR_OPTIONS[0],
      keyword: '',
    };
  },
  computed: {
    total() {
      return ICON_NAMES.length;
    },
    visibleNames() {
      const keyword = this.keyword.trim().toLowerCase();
      const names = keyword
        ? ICON_NAMES.filter((name) => name.toLowerCase().includes(keyword))
        : ICON_NAMES;
      return names.slice(0, this.visibleCount);
    },
    hasMore() {
      return this.visibleCount < this.matchedCount;
    },
    slotValues() {
      return {
        fillColor1: this.fillColor1,
        fillColor2: this.fillColor2,
        strokeColor1: this.strokeColor1,
        strokeColor2: this.strokeColor2,
      };
    },
    activeSlots() {
      const keys = editableSlots(this.colorType, this.strokeType);
      return this.colorSlots
        .filter((slot) => keys.includes(slot.key))
        .map((slot) => ({ ...slot, value: this[slot.key] }));
    },
    colors() {
      return resolveColors(this.colorType, this.strokeType, this.slotValues);
    },
    colorSummary() {
      const stroke = this.strokeTypes.find((item) => item.key === this.strokeType);
      const current = this.colorTypes.find((item) => item.key === this.colorType);
      return `${stroke ? stroke.label : this.strokeType} · ${current ? current.label : this.colorType} · 描边 ${this.colors.strokeColor.join(' / ')} · 填充 ${this.colors.fillColor.join(' / ')}`;
    },
  },
  methods: {
    /** 切换描边类型时，把颜色模式收敛到新类型支持的选项（与 view 的 radio 联动一致） */
    onStrokeTypeChange(key) {
      this.strokeType = key;
      this.colorTypes = COLOR_TYPES[key];
      if (!this.colorTypes.some((item) => item.key === this.colorType)) {
        this.colorType = 'double';
      }
    },
    setSlotColor(key, color) {
      if (key === 'fillColor1') this.fillColor1 = color;
      else if (key === 'fillColor2') this.fillColor2 = color;
      else if (key === 'strokeColor1') this.strokeColor1 = color;
      else if (key === 'strokeColor2') this.strokeColor2 = color;
    },
    onSearch(e) {
      this.keyword = e.detail.value;
      const keyword = this.keyword.trim().toLowerCase();
      this.matchedCount = keyword
        ? ICON_NAMES.filter((name) => name.toLowerCase().includes(keyword)).length
        : ICON_NAMES.length;
      this.visibleCount = PAGE_SIZE;
    },
    loadMore() {
      if (!this.hasMore) return;
      this.visibleCount = Math.min(this.visibleCount + PAGE_SIZE, this.matchedCount);
    },
    loadAll() {
      this.visibleCount = this.matchedCount;
    },
    onStrokeWidthChange(e) {
      this.strokeWidth = e.detail.value;
    },
  },
  onReachBottom() {
    this.loadMore();
  },
};
</script>

<style>
@import '../../style/multicolor.css';
</style>
