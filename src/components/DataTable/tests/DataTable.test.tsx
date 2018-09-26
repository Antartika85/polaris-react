import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';

import {findByTestID} from '../../../../tests/utilities/enzyme';
import DataTable, {CombinedProps as Props} from '../DataTable';
import {Cell, Navigation} from '../components';

interface DataTableTestProps {
  sortable?: Props['sortable'];
  defaultSortDirection?: Props['defaultSortDirection'];
  initialSortColumnIndex?: Props['initialSortColumnIndex'];
  onSort?: Props['onSort'];
}

const sortable = [false, true, false, false, true, false];
const columnContentTypes: Props['columnContentTypes'] = [
  'text',
  'numeric',
  'numeric',
  'numeric',
  'numeric',
];
const spyOnSort = jest.fn();

function setup(propOverrides?: DataTableTestProps) {
  const headings = ['Product', 'Price', 'Order Number', 'Quantity', 'Subtotal'];
  const rows = [
    [
      'Navy Merino Wool Blazer with khaki chinos and yellow belt',
      '$875.00',
      124518,
      83,
      '$122,500.00',
    ],
    ['Emerald Silk Gown', '$230.00', 124689, 32, '$19,090.00'],
    ['Mauve Cashmere Scarf', '$445.00', 124533, 140, '$14,240.00'],
  ];
  const summary = ['', '', '', 255, '$155,830.00'];

  const props = {
    columnContentTypes,
    headings,
    rows,
    summary,
    ...propOverrides,
  };
  const dataTable = mountWithAppProvider(<DataTable {...props} />);

  return {
    ...props,
    dataTable,
    twoClicks: true,
  };
}

describe('<DataTable />', () => {
  it('renders a table, thead and all table body rows', () => {
    const {dataTable} = setup();

    expect(dataTable.find('table').length).toEqual(1);
    expect(dataTable.find('thead').length).toEqual(1);
    expect(dataTable.find('thead th').length).toEqual(5);
    expect(dataTable.find('tbody tr').length).toEqual(3);
  });

  it('defaults to non-sorting column headings', () => {
    const {dataTable} = setup();
    const sortableHeadings = dataTable.find(Cell).filter({sortable: true});

    expect(sortableHeadings.length).toEqual(0);
  });

  it('initial sort column defaults to first column if not specified', () => {
    const firstColumnSortable = [true, true, false, false, true, false];
    const {dataTable} = setup({
      sortable: firstColumnSortable,
      onSort: spyOnSort,
    });
    const firstHeadingCell = findByTestID(dataTable, `heading-cell-${0}`);

    expect(firstHeadingCell.props().sorted).toBe(true);
  });

  it('sets specified initial sort column', () => {
    const {dataTable} = setup({
      sortable,
      onSort: spyOnSort,
      initialSortColumnIndex: 4,
    });
    const fifthHeadingCell = findByTestID(dataTable, `heading-cell-${4}`);

    expect(fifthHeadingCell.props().sorted).toBe(true);
  });

  describe('<Cell />', () => {
    const {dataTable} = setup();
    it('passes all props', () => {
      expect(
        dataTable
          .find(Cell)
          .first()
          .prop('header'),
      ).toBe(true);
      expect(
        dataTable
          .find(Cell)
          .first()
          .prop('content'),
      ).toEqual('Product');
      expect(
        dataTable
          .find(Cell)
          .first()
          .prop('contentType'),
      ).toEqual('text');
    });
  });

  describe('<Navigation />', () => {
    const {dataTable} = setup();
    it('passes scroll props', () => {
      expect(
        dataTable
          .find(Navigation)
          .first()
          .prop('isScrolledFarthestLeft'),
      ).toBe(true);
      expect(
        dataTable
          .find(Navigation)
          .first()
          .prop('isScrolledFarthestRight'),
      ).toBe(false);
    });
  });
});
