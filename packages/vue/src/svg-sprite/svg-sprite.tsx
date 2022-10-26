import Vue from 'vue';

import props from './props/props';
import ConfigContext from '../utils/config-context';
import useSizeProps from '../utils/use-size-props';
import { checkScriptAndLoad } from '../utils/check-url-and-load';

import '../style/css';

const { classPrefix } = ConfigContext;

const tName = `${classPrefix}-icon`;

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/tea-icon/0.1.2/fonts/index.js';

export default Vue.extend({
  name: 'Icon',
  props,
  computed: {
    iconName(): string {
      return this.url ? this.name : `${tName}-${this.name}`;
    },
    classes(): ClassName {
      const { className: sizeClassName } = useSizeProps(this.size);
      const iconName = this.url ? this.name : `${tName}-${this.name}`;
      const arr = [
        tName,
        iconName,
        sizeClassName,
      ];
      return arr;
    },
    iconStyle(): Styles {
      if (['small', 'medium', 'large'].includes(this.size)) return {};
      return {
        'font-size': this.size,
      };
    },
  },
  methods: {
    handleClick(e: MouseEvent) {
      this.$emit('click', { e });
      this.onClick?.({ e });
    },
  },
  mounted() {
    let finalUrl: Array<string> = [];

    if (this.url) {
      finalUrl = this.url instanceof Array ? this.url.concat() : [this.url];
    }
    if (this.loadDefaultIcons) {
      finalUrl.push(CDN_ICONFONT_URL);
    }
    Array.from(new Set(finalUrl)).forEach((url: string) => {
      checkScriptAndLoad(url, `${classPrefix}-svg-js-stylesheet--unique-class`);
    });
  },
  render() {
    const attrs = {
      href: `#${this.iconName}`,
    };
    return (
      <svg class={this.classes} style={this.iconStyle} onClick={this.handleClick}>
        <use {...{ attrs }}/>
      </svg>
    );
  },
});
