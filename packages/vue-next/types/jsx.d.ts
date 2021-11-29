import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    type Element = VNode;
    type ElementClass = Vue;
    interface ElementAttributesProperty {
      $props: {};
    }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
