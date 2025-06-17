export type Transaction = {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  payment: string; // e.g., "1/3", can be enhanced to a structured type later
  date: string;    // ideally ISO format or date string like "2025-06-15"
};
