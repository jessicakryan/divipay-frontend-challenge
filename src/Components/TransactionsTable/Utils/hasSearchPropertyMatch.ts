import { SearchableProperty, Transaction } from '../../../Shared/data.types';

export const hasSearchPropertyMatch = (
  property: SearchableProperty,
  transaction: Transaction,
  searchStr: string
): boolean => {
  let propertyValue;

  if (property === 'amount' || property === 'gst') {
    propertyValue = transaction[property].toString();
  } else {
    propertyValue = transaction[property];
  }

  return propertyValue.toLowerCase().includes(searchStr.toLowerCase());
};
