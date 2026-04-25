import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private baseUrl = `${environment.apiUrl}/Subscription`;

  constructor(private http: HttpClient) {}

  getMySubscription() {
    return this.http.get(`${this.baseUrl}/my-Subscription`);
  }

  pause(id: number) {
    return this.http.post(`${this.baseUrl}/${id}/pause`, {});
  }

  cancel(id: number) {
    return this.http.post(`${this.baseUrl}/${id}/cancel`, {});
  }
}
