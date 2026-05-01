import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 private apiUrl = `${environment.apiUrl}/Order`;

  constructor(private http: HttpClient) { }

  getOrders(date: string) {
  return this.http.get(`${this.apiUrl}/mess-orders?date=${date}`, {
    withCredentials: true
  });
}
}
