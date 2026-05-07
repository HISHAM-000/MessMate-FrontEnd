import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private subscriptionService: SubscriptionService,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (res: any) => {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.orders = res.data.filter((order: any) => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= today; // ✅ only today + future
        });

        console.log('FILTERED ORDERS:', this.orders);
      },
      error: (err) => console.error(err)
    });
  }

  skip(orderId: number) {
    this.subscriptionService.skipMeal(orderId).subscribe({
      next: (res: any) => {
        this.toastr.success(res.data.message || 'Meal skipped');
        this.loadOrders(); // refresh
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to skip meal');
      }
    });
  }
}