import { hasSearchPropertyMatch } from './hasSearchPropertyMatch';
import { mapIdNameToObject } from './mapIdNameToObject';

import categories from '../../../data/categories.json';
import merchants from '../../../data/merchants.json';
import { SearchableProperty } from '../../../Shared/data.types';

interface TestCase {
  property: SearchableProperty;
  searchStr: string;
  expected: boolean;
}

describe('hasSearchPropertyMatch', () => {
  const mappedCategories = mapIdNameToObject(categories);
  const mappedMerchants = mapIdNameToObject(merchants);

  const formattedTransaction = {
    id: '4ca91d14-232c-493d-9b89-725b3a726a21',
    status: 'complete',
    date: '2019-04-15T07:37:38',
    merchant: mappedMerchants['c20b237a-da94-40cd-b85f-6a359b656929'],
    team_member: 'Casey Tran',
    budget: 'Sales Team',
    receipt: false,
    billable: false,
    gst: 653.54,
    amount: 7189,
    category: mappedCategories['9ea558c4-666b-493f-b801-c0c1c8b259cd'],
  };

  const testCases: TestCase[] = [
    {
      property: 'merchant',
      searchStr: 'face',
      expected: true,
    },
    {
      property: 'merchant',
      searchStr: 'Intercom',
      expected: false,
    },
    {
      property: 'team_member',
      searchStr: 'Cas',
      expected: true,
    },
    {
      property: 'team_member',
      searchStr: 'Jane',
      expected: false,
    },
    {
      property: 'category',
      searchStr: 'entertainment',
      expected: true,
    },
    {
      property: 'category',
      searchStr: 'Services',
      expected: false,
    },
    {
      property: 'budget',
      searchStr: 'sale',
      expected: true,
    },
    {
      property: 'budget',
      searchStr: 'office',
      expected: false,
    },
    {
      property: 'amount',
      searchStr: '89',
      expected: true,
    },
    {
      property: 'amount',
      searchStr: '11',
      expected: false,
    },
    {
      property: 'gst',
      searchStr: '.54',
      expected: true,
    },
    {
      property: 'gst',
      searchStr: '600',
      expected: false,
    },
  ];

  testCases.forEach((testCase) => {
    it(`should return ${testCase.expected} when transaction.${testCase.property} contains ${testCase.searchStr}`, () => {
      expect(
        hasSearchPropertyMatch(
          testCase.property,
          formattedTransaction,
          testCase.searchStr
        )
      ).toBe(testCase.expected);
    });
  });
});
