/**
 * uni-app x CLI 工程的类型补充声明。
 *
 * 这些是编译器在编译期注入的，不在 vue 模块的公开类型里：
 * - H5 端会把入口的 createSSRApp 重写成 createVueApp
 * - App / Page 的生命周期函数（onLaunch、onShow 等）会被自动按需引入
 * - uts 有内置的 UTSJSONObject 类型
 */
import 'vue';

declare module 'vue' {
  export function createVueApp(...args: any[]): any;
}

declare global {
  // App / Page 生命周期
  function onLaunch(hook: (...args: any[]) => void): void
  function onAppShow(hook: (...args: any[]) => void): void
  function onAppHide(hook: (...args: any[]) => void): void
  function onShow(hook: (...args: any[]) => void): void
  function onHide(hook: (...args: any[]) => void): void
  function onLoad(hook: (...args: any[]) => void): void
  function onReady(hook: (...args: any[]) => void): void
  function onUnload(hook: (...args: any[]) => void): void
  function onBackPress(hook: (...args: any[]) => boolean | void): void
  function onPageScroll(hook: (...args: any[]) => void): void

  // uts 内置 JSON 对象类型
  type UTSJSONObject = Record<string, any>
}
