import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private mockOrders: Order[] = [
    {
      id: 5001,
      customerId: 1,
      totalAmount: 2500,
      status: 'Completed',
      date: '2026-04-01',
      items: ['Standard Premium Thali - 1 Month Subscription']
    },
    {
      id: 5002,
      customerId: 1,
      totalAmount: 150,
      status: 'Completed',
      date: '2026-03-15',
      items: ['Extra Sweet Dish Add-on']
    }
  ];

  constructor() { }

  getMyOrders(): Observable<Order[]> {
    return of(this.mockOrders);
  }
}
