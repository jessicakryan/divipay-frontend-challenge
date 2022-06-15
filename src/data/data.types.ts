export interface Category {
  id: string;
  name: string;
}

export interface Merchant {
  id: string;
  name: string;
}

type TransactionStatus = 'complete' | 'exported' | 'incomplete';

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
