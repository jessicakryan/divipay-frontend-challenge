import { SearchableProperty, Transaction } from '../../../Shared/data.types';
import { hasSearchPropertyMatch } from './hasSearchPropertyMatch';

const propertiesToCheck: SearchableProperty[] = [
  'merchant',
  'team_member',
  'category',
  'budget',
  'amount',
  'gst',
];

export const getTransactions = (
  transactions: Transaction[],
  merchants: Record<string, string>,
  categories: Record<string, string>,
  searchStr: string,
  category: string
): Transaction[] =>
  transactions
    .filter((transaction) => transaction.category === category || !category)
    .reduce((prevTransaction, nextTransaction) => {
      const formattedCategory = categories[nextTransaction.category];
      const formattedMerchant = merchants[nextTransaction.merchant];

      const formattedNext = {
        ...nextTransaction,
        category: formattedCategory,
        merchant: formattedMerchant,
      };

      if (!searchStr) {
        return [...prevTransaction, formattedNext];
      } else if (
        propertiesToCheck.some((property) =>
          hasSearchPropertyMatch(property, formattedNext, searchStr)
        )
      ) {
        return [...prevTransaction, formattedNext];
      } else {
        return prevTransaction;
      }
    }, [] as Transaction[]);
