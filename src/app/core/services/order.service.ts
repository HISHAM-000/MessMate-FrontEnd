import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../../shared/models/order.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `${environment.apiUrl}/Order`;

  constructor(private http: HttpClient) {}

  getMyOrders() {
    return this.http.get(`${this.baseUrl}/my-orders`, {
      withCredentials: true
    });
  }
}
