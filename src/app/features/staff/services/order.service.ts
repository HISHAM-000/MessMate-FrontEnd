import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${environment.apiUrl}/Order`;

  constructor(private http: HttpClient) {}

  getMessOrders(date?: string) {
    let url = `${this.apiUrl}/mess-orders`;

    if (date) {
      url += `?date=${date}`;
    }

    return this.http.get(url, {
      withCredentials: true
    });
  }

  updateStatus(orderId: number, status: number) {
    return this.http.put(
      `${this.apiUrl}/${orderId}/status`,
      { newStatus: status },   // 🔥 IMPORTANT: must match backend
      { withCredentials: true }
    );
  }
}