import transactions from '../../data/transactions.json';
import categories from '../../data/categories.json';
import merchants from '../../data/merchants.json';

import { TransactionsTable } from '../TransactionsTable';
import { EMPTY_TRANSACTIONS_MESSAGE } from './constants';
import { CATEGORY_SELECTOR } from '../../Shared/testIds';
import {
  render,
  screen,
  within,
  fireEvent,
} from '../../__tests__/__utils__/renderers';

const renderTable = () => {
  render(
    <TransactionsTable
      transactions={[transactions[0]]}
      categories={categories}
      merchants={merchants}
      filter={''}
    />
  );
};

describe('TransactionsTable', () => {
  describe('transaction row', () => {
    it('should show the status column as expected', () => {
      renderTable();
      const firstBodyRow = screen.getAllByRole('row')[1];
      const statusCell = within(firstBodyRow).getAllByRole('cell')[0];

      expect(statusCell.textContent).toEqual('complete');
    });

    it('should show the date column as expected', () => {
      renderTable();
      const firstBodyRow = screen.getAllByRole('row')[1];
      const dateCell = within(firstBodyRow).getAllByRole('cell')[1];

      expect(dateCell.textContent).toEqual('15/04/2019');
    });

    it('should show the merchant column as expected', () => {
      renderTable();
      const firstBodyRow = screen.getAllByRole('row')[1];
      const merchantCell = within(firstBodyRow).getAllByRole('cell')[2];

      expect(merchantCell.textContent).toEqual('Facebook');
    });

    it('should show the team member column as expected', () => {
      renderTable();
      const firstBodyRow = screen.getAllByRole('row')[1];
      const teamMemberCell = within(firstBodyRow).getAllByRole('cell')[3];

      expect(teamMemberCell.textContent).toEqual('Casey Tran');
    });

    it('should show the category column as expected', () => {
      renderTable();
      const firstBodyRow = screen.getAllByRole('row')[1];
      const categoryCell = within(firstBodyRow).getAllByRole('cell')[4];

      expect(categoryCell.textContent).toEqual('Entertainment');
    });

    it('should show the amount column as expected', () => {
      renderTable();
      const firstBodyRow = screen.getAllByRole('row')[1];
      const amountCell = within(firstBodyRow).getAllByRole('cell')[5];

      expect(amountCell.textContent).toEqual('$7,189.00');
    });

    it('should show the gst column as expected', () => {
      renderTable();
      const firstBodyRow = screen.getAllByRole('row')[1];
      const gstCell = within(firstBodyRow).getAllByRole('cell')[6];

      expect(gstCell.textContent).toEqual('$653.54');
    });

    it('should show the budget column as expected', () => {
      renderTable();
      const firstBodyRow = screen.getAllByRole('row')[1];
      const budgetCell = within(firstBodyRow).getAllByRole('cell')[7];

      expect(budgetCell.textContent).toEqual('Sales Team');
    });

    it('should show the receipt column as expected', () => {
      renderTable();
      const firstBodyRow = screen.getAllByRole('row')[1];
      const receiptCell = within(firstBodyRow).getAllByRole('cell')[8];

      const checkbox = within(receiptCell).getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
    });

    it('should show the billable column as expected', () => {
      renderTable();
      const firstBodyRow = screen.getAllByRole('row')[1];
      const billableCell = within(firstBodyRow).getAllByRole('cell')[9];

      const checkbox = within(billableCell).getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
    });
  });

  it('should show a message when no transactions are found', () => {
    render(
      <TransactionsTable
        transactions={[transactions[0]]}
        categories={categories}
        merchants={merchants}
        filter={'Jane'}
      />
    );

    expect(screen.getByText(EMPTY_TRANSACTIONS_MESSAGE)).toBeInTheDocument();
  });

  it('should set the category value when category is changed', () => {
    renderTable();

    fireEvent.change(screen.getByTestId(CATEGORY_SELECTOR), {
      target: { value: '9ea558c4-666b-493f-b801-c0c1c8b259cd' },
    });

    const selectElement: HTMLSelectElement = screen.getByRole('combobox');

    expect(
      (within(selectElement).getByText('Entertainment') as HTMLOptionElement)
        .selected
    ).toBeTruthy();
  });
});
