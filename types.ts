export interface Expense {
  id: string;
  storeName: string;
  date: string; // YYYY-MM-DD
  amount: number;
  createdAt: number;
}

export interface ReceiptData {
  storeName: string;
  date: string;
  amount: number;
}

export type LoadingState = 'idle' | 'analyzing' | 'saving' | 'error';
