import * as React from 'react';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import Item from '..';

describe('<Item />', () => {
  it('renders its children', () => {
    const item = mountWithAppProvider(<Item>test</Item>);
    expect(item.contains('test')).toBe(true);
  });

  it('renders an li element', () => {
    const item = mountWithAppProvider(<Item>test</Item>);
    expect(item.find('li').exists()).toBe(true);
  });
});
