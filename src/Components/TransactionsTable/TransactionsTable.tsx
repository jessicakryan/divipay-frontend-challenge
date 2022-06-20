import { ChangeEvent, useState } from 'react';
import { Category, Merchant, Transaction } from '../../Shared/data.types';
import { mapIdNameToObject } from './Utils/mapIdNameToObject';
import * as content from './constants';
import { getTransactions } from './Utils/getTransactions';
import { Checkbox } from './Checkbox';
import { CategorySelector } from './CategorySelector';
import { TRANSACTIONS_TABLE } from '../../Shared/testIds';
import {
  EmptyTableBodyCell,
  Status,
  Table,
  TableBodyCell,
  TableBodyRow,
  TableHeader,
} from './TransactionsTable.style';

interface Props {
  transactions: Transaction[];
  categories: Category[];
  merchants: Merchant[];
  filter: string;
}

const formatNumberToCurrency = (value: number) =>
  new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(
    value
  );

const formatDate = (date: string) => {
  const dateFormat = new Date(date);
  return new Intl.DateTimeFormat('en-AU').format(dateFormat);
};

export const TransactionsTable = (props: Props) => {
  const { transactions, categories, merchants, filter } = props;
  const [category, setCategory] = useState('');

  const mappedCategories = mapIdNameToObject(categories);
  const mappedMerchants = mapIdNameToObject(merchants);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const mappedTransactions = getTransactions(
    transactions,
    mappedMerchants,
    mappedCategories,
    filter,
    category
  );

  const hasTransactions = mappedTransactions.length;

  return (
    <Table data-testid={TRANSACTIONS_TABLE}>
      <thead>
        <tr>
          <TableHeader>{content.COLUMN_HEADERS.status}</TableHeader>
          <TableHeader>{content.COLUMN_HEADERS.date}</TableHeader>
          <TableHeader>{content.COLUMN_HEADERS.merchantName}</TableHeader>
          <TableHeader>{content.COLUMN_HEADERS.teamMember}</TableHeader>
          <TableHeader>
            {content.COLUMN_HEADERS.category}
            <CategorySelector
              categories={categories}
              value={category}
              handleSelect={handleCategoryChange}
            />
          </TableHeader>
          <TableHeader>{content.COLUMN_HEADERS.amount}</TableHeader>
          <TableHeader>{content.COLUMN_HEADERS.gst}</TableHeader>
          <TableHeader>{content.COLUMN_HEADERS.budget}</TableHeader>
          <TableHeader>{content.COLUMN_HEADERS.receipt}</TableHeader>
          <TableHeader>{content.COLUMN_HEADERS.billable}</TableHeader>
        </tr>
      </thead>
      <tbody>
        {!hasTransactions ? (
          <tr>
            <EmptyTableBodyCell colSpan={10}>
              {content.EMPTY_TRANSACTIONS_MESSAGE}
            </EmptyTableBodyCell>
          </tr>
        ) : (
          mappedTransactions.map((transaction, index) => (
            <TableBodyRow isEven={index % 2 === 0} key={transaction.id}>
              <TableBodyCell>
                <Status status={transaction.status}>
                  {transaction.status}
                </Status>
              </TableBodyCell>
              <TableBodyCell>{formatDate(transaction.date)}</TableBodyCell>
              <TableBodyCell>{transaction.merchant}</TableBodyCell>
              <TableBodyCell>{transaction.team_member}</TableBodyCell>
              <TableBodyCell>{transaction.category}</TableBodyCell>
              <TableBodyCell isCurrency>
                {formatNumberToCurrency(transaction.amount)}
              </TableBodyCell>
              <TableBodyCell isCurrency>
                {formatNumberToCurrency(transaction.gst)}
              </TableBodyCell>
              <TableBodyCell>{transaction.budget}</TableBodyCell>
              <TableBodyCell>
                <Checkbox
                  checked={transaction.receipt}
                  disabled
                  name={`${transaction.id}-receipt-${index}`}
                />
              </TableBodyCell>
              <TableBodyCell>
                <Checkbox
                  checked={transaction.billable}
                  name={`${transaction.id}-billable-${index}`}
                />
              </TableBodyCell>
            </TableBodyRow>
          ))
        )}
      </tbody>
    </Table>
  );
};
