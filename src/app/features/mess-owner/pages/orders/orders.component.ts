import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.loadOrders(today);
  }

  loadOrders(date: string) {
    this.orderService.getOrders(date).subscribe({
      next: (res: any) => {
        const data = res?.data ?? res ?? [];

        // 🔥 Normalize API data
        this.orders = data.map((o: any) => ({
          ...o,
          status: this.mapStatus(o.status),
          mealSlot: this.mapMeal(o.mealSlot)
        }));

        console.log("ORDERS:", this.orders);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  // 🔥 ENUM FIX
  mapStatus(status: number): string {
    switch (status) {
      case 1: return 'Pending';
      case 2: return 'Preparing';
      case 3: return 'OutForDelivery';
      case 4: return 'Delivered';
      case 5: return 'Skipped';
      case 6: return 'Cancelled';
      default: return 'Unknown';
    }
  }

  mapMeal(meal: any): string {
    // already string? return as-is
    if (typeof meal === 'string') return meal;

    switch (meal) {
      case 1: return 'Breakfast';
      case 2: return 'Lunch';
      case 3: return 'Dinner';
      default: return '-';
    }
  }
}