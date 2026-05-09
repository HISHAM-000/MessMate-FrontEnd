import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: any[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    
    // We try to get orders. If getMessOrders works for admins (returning all), we use it.
    // Otherwise, we might need a dedicated admin endpoint.
    const today = new Date().toISOString().split('T')[0];
    
    this.orderService.getMessOrders(today).subscribe({
      next: (res: any) => {
        // Handle both wrapped and plain array
        this.orders = res?.data || res || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Order load error:', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    if (!status) return 'status-pending';
    switch (status.toLowerCase()) {
      case 'completed': return 'status-success';
      case 'delivered': return 'status-success';
      case 'pending': return 'status-warning';
      case 'failed': return 'status-danger';
      case 'cancelled': return 'status-danger';
      default: return 'status-info';
    }
  }
}
