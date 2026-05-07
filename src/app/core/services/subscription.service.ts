import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  baseUrl = 'https://localhost:7200/api/Subscription';

  constructor(private http: HttpClient) {}

  getMySubscriptions() {
    return this.http.get(`${this.baseUrl}/my-Subscription`, {
      withCredentials: true
    });
  }

  pauseWithDates(subscriptionId: number, data: any) {
    return this.http.post(
      `${this.baseUrl}/${subscriptionId}/pause`,
      data,
      { withCredentials: true }
    );
  }

  cancel(subscriptionId: number) {
    return this.http.post(
      `${this.baseUrl}/${subscriptionId}/cancel`,
      {},
      { withCredentials: true }
    );
  }

  skipMeal(orderId: number) {
    return this.http.post(
      `${this.baseUrl}/skip/${orderId}`,
      {}, 
      { withCredentials: true }
    );
  }
}