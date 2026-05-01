import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const today = new Date().toISOString().split('T')[0];

    this.orderService.getMessOrders(today).subscribe({
      next: (res: any) => {
        this.orders = (res.data || res).map((o: any) => ({
          ...o,
          newStatus: o.status   // 🔥 separate variable
        }));

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Failed to load orders");
        this.isLoading = false;
      }
    });
  }

  updateStatus(order: any) {

    if (order.status === order.newStatus) {
      this.toastr.warning("No change in status");
      return;
    }

    this.orderService.updateStatus(order.id, Number(order.newStatus)).subscribe({
      next: () => {
        this.toastr.success("Status updated");

        // update UI after success
        order.status = order.newStatus;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Invalid status transition");
      }
    });
  }

  // 🔥 ONLY ALLOW NEXT STEP
  getNextStatuses(current: number): number[] {

    switch (current) {
      case 1: return [2]; // Pending → Preparing
      case 2: return [3]; // Preparing → OutForDelivery
      case 3: return [4]; // OutForDelivery → Delivered
      default: return [];
    }
  }

  getStatusText(status: number): string {
    switch (status) {
      case 1: return 'Pending';
      case 2: return 'Preparing';
      case 3: return 'Out For Delivery';
      case 4: return 'Delivered';
      case 5: return 'Skipped';
      case 6: return 'Cancelled';
      default: return 'Unknown';
    }
  }
}