import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subscription } from '../../shared/models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private mockSub: Subscription = {
    id: 101,
    customerId: 1,
    planId: 1,
    planName: 'Standard Premium Thali',
    messName: 'Spice Delight Mess',
    status: 'Active',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    skippedMeals: ['2026-04-10', '2026-04-15'],
    history: [
      { date: '2026-04-01', action: 'Enrolled', details: 'Paid $2500' },
      { date: '2026-04-10', action: 'Skipped Meal', details: 'Lunch skipped' }
    ]
  };

  constructor() {}

  getMySubscription(): Observable<Subscription | null> {
    return of(this.mockSub);
  }

  pause(id: number): Observable<boolean> {
    this.mockSub.status = 'Paused';
    this.mockSub.history.push({ date: new Date().toISOString().split('T')[0], action: 'Paused', details: 'User paused subscription' });
    return of(true);
  }

  cancel(id: number): Observable<boolean> {
    this.mockSub.status = 'Cancelled';
    this.mockSub.history.push({ date: new Date().toISOString().split('T')[0], action: 'Cancelled', details: 'User cancelled subscription' });
    return of(true);
  }

  skipMeal(date: string): Observable<boolean> {
    if (!this.mockSub.skippedMeals.includes(date)) {
      this.mockSub.skippedMeals.push(date);
      this.mockSub.history.push({ date: new Date().toISOString().split('T')[0], action: 'Skipped Meal', details: `Meal skipped for ${date}` });
    }
    return of(true);
  }
}
