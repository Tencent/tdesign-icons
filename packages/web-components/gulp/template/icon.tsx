// @ts-nocheck
// This file is generated automatically by `useTemplate.ts`. DO NOT EDIT IT.

import { tag } from 'omi';
import { IconBase, IconProps } from '../icon';

const element = $ELEMENT;

@tag('$ICON_TAG_NAME')
export default class $ICON_NAME extends IconBase<IconProps> {
  static icon = element;
  constructor() {
    super();
    this.props = {
      ...this.props,
      id: '$KEY',
    }
  }
}
