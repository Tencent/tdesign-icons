import { App } from 'vue';
import withInstall from './utils/with-install';
import * as icons from './icons';

export function install(app: App): void {
  Object.keys(icons).forEach((key) => {
    // @ts-ignore
    const icon = withInstall(icons[key]);
    app.use(icon);
  });
}

export * from './icons';
export * from './manifest';
export * from './iconfont/index';
export * from './svg-sprite/index';
export * from './global-config';
export default {
  install,
};
