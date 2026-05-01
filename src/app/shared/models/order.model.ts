export interface Order {
  id: number;
  customerId: number;
  totalAmount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  items: string[];
}
