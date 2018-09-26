import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import FooterHelp from '..';
import Icon from '../../Icon';

describe('<FooterHelp />', () => {
  let children: string;
  let footerHelp: any;

  beforeAll(() => {
    children = 'Learn more about fulfilling orders';
    footerHelp = mountWithAppProvider(<FooterHelp>{children}</FooterHelp>);
  });

  it('renders its children', () => {
    expect(footerHelp.contains(children)).toBe(true);
  });

  it('renders the help icon', () => {
    expect(footerHelp.find(Icon).prop('source')).toBe('help');
  });
});
