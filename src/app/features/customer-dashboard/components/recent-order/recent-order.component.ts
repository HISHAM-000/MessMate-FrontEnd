import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.css']
})
export class RecentOrderComponent implements OnInit {

  recentOrders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadRecentOrders();
  }

  loadRecentOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (res: any) => {

        const orders = res.data || [];

        // ✅ Sort latest first
        orders.sort((a: any, b: any) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );

        // ✅ Take only top 5
        this.recentOrders = orders.slice(0, 5);

        console.log('RECENT ORDERS:', this.recentOrders);
      },
      error: (err) => console.error(err)
    });
  }
  getMealSlotName(slot: number): string {
  switch (slot) {
    case 1: return 'Breakfast';
    case 2: return 'Lunch';
    case 3: return 'Dinner';
    default: return 'Meal';
  }
}
}