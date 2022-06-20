export interface IdName {
  id: string;
  name: string;
}

export type Category = IdName;
export type Merchant = IdName;

export interface Transaction {
  id: string;
  status: string;
  date: string;
  merchant: string;
  team_member: string;
  budget: string;
  receipt: boolean;
  billable: boolean;
  gst: number;
  amount: number;
  category: string;
}

export type SearchableProperty = Extract<
  keyof Transaction,
  'merchant' | 'team_member' | 'category' | 'budget' | 'amount' | 'gst'
>;
