// This file is generated automatically by `useTemplate.ts`. DO NOT EDIT IT.

import { createElement, forwardRef, Ref } from 'react';
import { IconBase, IconProps } from '../icon';

const element = $ELEMENT;

const $ICON_NAME = forwardRef<SVGElement, IconProps>((props: IconProps, ref: Ref<SVGElement>) =>
  createElement(
    IconBase,
    Object.assign({}, props, {
      id: '$KEY',
      ref,
      icon: element,
    }),
  ),
);

$ICON_NAME.displayName = '$ICON_NAME';

export default $ICON_NAME;
