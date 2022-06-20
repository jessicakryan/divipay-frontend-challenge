import React from 'react';
import App from './App';
import categoriesData from '../../data/categories.json';
import merchantsData from '../../data/merchants.json';
import transactionsData from '../../data/transactions.json';
import { TRANSACTIONS_TABLE, TRANSACTION_SEARCH } from '../../Shared/testIds';
import { act } from 'react-dom/test-utils';
import { EMPTY_TRANSACTIONS_MESSAGE } from '../TransactionsTable/constants';
import {
  fireEvent,
  render,
  screen,
  within,
} from '../../__tests__/__utils__/renderers';

const renderApp = ({
  categories = categoriesData,
  merchants = merchantsData,
  transactions = transactionsData,
} = {}) =>
  render(
    <App
      categories={categories}
      merchants={merchants}
      transactions={transactions}
    />
  );

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render title, search bar and transactions table', () => {
    renderApp();

    screen.getByRole('heading', { name: 'Transactions' });
    expect(screen.getByTestId(TRANSACTION_SEARCH)).toBeInTheDocument();
    expect(screen.getByTestId(TRANSACTIONS_TABLE)).toBeInTheDocument();
  });

  it('should set the search value when search bar is changed', () => {
    renderApp();

    const searchBar = screen.getByTestId(TRANSACTION_SEARCH);

    const input = within(searchBar).getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'mockInputValue' } });

    expect(input.value).toEqual('mockInputValue');
  });

  it('should apply the filter 500ms after the search value is changed', () => {
    renderApp();

    expect(
      screen.queryByText(EMPTY_TRANSACTIONS_MESSAGE)
    ).not.toBeInTheDocument();

    const searchBar = screen.getByTestId(TRANSACTION_SEARCH);
    const input = within(searchBar).getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'mockInputValue' } });

    expect(
      screen.queryByText(EMPTY_TRANSACTIONS_MESSAGE)
    ).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(550);
    });

    expect(screen.getByText(EMPTY_TRANSACTIONS_MESSAGE)).toBeInTheDocument();
  });
});
