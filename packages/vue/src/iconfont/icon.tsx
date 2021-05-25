import Vue from 'vue';
import classNames from 'classnames';
import props from './props/props';
import useSizeProps from './util/useSizeProps';
import ConfigContext from './util/ConfigContext';

const { classPrefix } = ConfigContext;
const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/web/index.css';

const name = `${classPrefix}-icon`;

export const IconFont = Vue.extend({
  name,
  props: { ...props },

  computed: {
    _urls(): string[] {
      let url: Array<string> = [];
      if (this.url) {
        url = this.url instanceof Array ? this.url.concat() : [this.url];
      }
      if (this.loadDefaultIcons) {
        url.push(this.innerUrl);
      }
      return [...Array.from(new Set(url))];
    },
  },
  data() {
    return {
      innerUrl: CDN_ICONFONT_URL,
      classPrefix,
    };
  },

  // 插入 iconfont 样式
  mounted() {
    this._urls.forEach((url: any) => {
      this.checkUrlAndLoad(url, `${classPrefix}-iconfont-stylesheet--unique-class`);
    });
  },

  methods: {
    checkUrlAndLoad(url: string, id: string) {
      // 防止重复插入
      if (document.getElementById(id)) {
        return;
      }

      if (!document || !url || typeof url !== 'string') return;

      // 查询是否有对应 URL
      if (document.querySelectorAll(`[href="${url}"]`).length > 0) {
        return;
      }

      const link = document.createElement('link');
      link.setAttribute('id', id);
      link.setAttribute('href', url);
      link.setAttribute('rel', 'stylesheet');
      document.head.appendChild(link);
    },
  },

  render(createElement) {
    const data = this.$vnode.data || {};
    const { class: customClassName, style: customStyle, attrs: customAttrs, ...otherBinds } = data;

    const customProps = this.$props || {};

    const customPandA = { ...customProps, ...customAttrs };
    const { name, size = 'middle', tag = 'i', url = [], loadDefaultIcons = true } = customPandA || {};

    const { className: sizeClassName, style: sizeStyle } = useSizeProps(size);

    const className = classNames(`${classPrefix}-icon`, `${classPrefix}-icon-${name}`, sizeClassName, customClassName);

    const finalProps = {
      name,
      size,
      tag,
      url,
      loadDefaultIcons,
    };

    let finalStyle;
    if (customStyle instanceof Object) {
      finalStyle = { ...customStyle, ...sizeStyle };
    } else {
      finalStyle = { ...sizeStyle };
    }

    const { domProps, on, nativeOn, directives, scopedSlots, slot, key, ref, refInFor } = otherBinds;
    const finalData = {
      class: className,
      style: finalStyle,
      props: finalProps,
      attrs: customAttrs,
      domProps,
      on,
      nativeOn,
      directives,
      scopedSlots,
      slot,
      key,
      ref,
      refInFor,
    };

    return createElement(tag, finalData);
  },
});

export default IconFont;
