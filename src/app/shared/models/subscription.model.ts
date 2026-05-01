export interface Subscription {
  id: number;
  customerId: number;
  planId: number;
  planName: string;
  messName: string;
  status: 'Active' | 'Paused' | 'Cancelled';
  startDate: string;
  endDate: string;
  skippedMeals: string[]; // array of dates
  history: SubscriptionHistory[];
}

export interface SubscriptionHistory {
  date: string;
  action: string;
  details?: string;
}