import { getTransactions } from './getTransactions';
import { mapIdNameToObject } from './mapIdNameToObject';
import categories from '../../../data/categories.json';
import merchants from '../../../data/merchants.json';

const transactions = [
  {
    id: '4ca91d14-232c-493d-9b89-725b3a726a21',
    status: 'complete',
    date: '2019-04-15T07:37:38',
    merchant: 'c20b237a-da94-40cd-b85f-6a359b656929',
    team_member: 'Casey Tran',
    budget: 'Sales Team',
    receipt: false,
    billable: false,
    gst: 653.54,
    amount: 7189,
    category: '9ea558c4-666b-493f-b801-c0c1c8b259cd',
  },
  {
    id: '2eba5cfd-8696-458e-a3a4-f1f8823fec71',
    status: 'exported',
    date: '2019-05-23T20:35:58',
    merchant: '30650d28-8ebf-454d-940b-27f7518b4550',
    team_member: 'Angela Sawyer',
    budget: 'Marketing Team',
    receipt: false,
    billable: true,
    gst: 453,
    amount: 4983,
    category: '0ef187b3-bb6d-45a1-b5a2-3e584603badb',
  },
];

const ENTERTAINMENT_CATEGORY = '9ea558c4-666b-493f-b801-c0c1c8b259cd';
const GENERAL_EXPENSES_CATEGORY = '0ef187b3-bb6d-45a1-b5a2-3e584603badb';
const SUPERMARKET_CATEGORY = 'b8a84008-4054-4951-beea-97a39c4410db';

const mappedMerchants = mapIdNameToObject(merchants);
const mappedCategories = mapIdNameToObject(categories);

describe('getTransactions', () => {
  it('should return all transactions when there is no selected category and no provided search string', () => {
    expect(
      getTransactions(transactions, mappedMerchants, mappedCategories, '', '')
    ).toHaveLength(2);
  });

  it('should return transactions in the expected shape', () => {
    const expected = transactions.map((transaction) => ({
      ...transaction,
      merchant: mappedMerchants[transaction.merchant],
      category: mappedCategories[transaction.category],
    }));

    expect(
      getTransactions(transactions, mappedMerchants, mappedCategories, '', '')
    ).toEqual(expected);
  });

  it('should return transactions that match a provided search string', () => {
    const expected = [
      {
        id: '4ca91d14-232c-493d-9b89-725b3a726a21',
        status: 'complete',
        date: '2019-04-15T07:37:38',
        merchant: 'Facebook',
        team_member: 'Casey Tran',
        budget: 'Sales Team',
        receipt: false,
        billable: false,
        gst: 653.54,
        amount: 7189,
        category: 'Entertainment',
      },
    ];

    expect(
      getTransactions(
        transactions,
        mappedMerchants,
        mappedCategories,
        'Cas',
        ''
      )
    ).toEqual(expected);
  });

  it('should return transactions that match a selected category', () => {
    const expected = [
      {
        id: '2eba5cfd-8696-458e-a3a4-f1f8823fec71',
        status: 'exported',
        date: '2019-05-23T20:35:58',
        merchant: 'Intercom',
        team_member: 'Angela Sawyer',
        budget: 'Marketing Team',
        receipt: false,
        billable: true,
        gst: 453,
        amount: 4983,
        category: 'General Expenses',
      },
    ];

    expect(
      getTransactions(
        transactions,
        mappedMerchants,
        mappedCategories,
        '',
        GENERAL_EXPENSES_CATEGORY
      )
    ).toEqual(expected);
  });

  it('should return expected transactions that match a provided search string and category', () => {
    const expected = [
      {
        id: '2eba5cfd-8696-458e-a3a4-f1f8823fec71',
        status: 'exported',
        date: '2019-05-23T20:35:58',
        merchant: 'Intercom',
        team_member: 'Angela Sawyer',
        budget: 'Marketing Team',
        receipt: false,
        billable: true,
        gst: 453,
        amount: 4983,
        category: 'General Expenses',
      },
    ];

    expect(
      getTransactions(
        transactions,
        mappedMerchants,
        mappedCategories,
        'Saw',
        GENERAL_EXPENSES_CATEGORY
      )
    ).toEqual(expected);
  });

  it('should return an empty array when category does NOT match but contains the provided search string', () => {
    expect(
      getTransactions(
        transactions,
        mappedMerchants,
        mappedCategories,
        'Saw',
        ENTERTAINMENT_CATEGORY
      )
    ).toHaveLength(0);
  });

  it('should return an empty array when category matches but does NOT contain the provided search string', () => {
    expect(
      getTransactions(
        transactions,
        mappedMerchants,
        mappedCategories,
        'Jane',
        ENTERTAINMENT_CATEGORY
      )
    ).toHaveLength(0);
  });
  it('should return an empty array when a match is NOT found', () => {
    expect(
      getTransactions(
        transactions,
        mappedMerchants,
        mappedCategories,
        'Jane',
        SUPERMARKET_CATEGORY
      )
    ).toHaveLength(0);
  });
});
