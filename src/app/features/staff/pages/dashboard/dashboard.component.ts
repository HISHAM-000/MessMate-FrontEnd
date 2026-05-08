import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orders: any[] = [];
  isLoading = false;

  // Stats
  total = 0;
  pending = 0;
  preparing = 0;
  outForDelivery = 0;
  delivered = 0;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading = true;

    const today = new Date().toISOString().split('T')[0];

    this.orderService.getMessOrders(today).subscribe({
      next: (res: any) => {
        this.orders = res.data || [];
        this.calculateStats();
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to load dashboard data');
        this.isLoading = false;
      }
    });
  }

  calculateStats() {
    this.total = this.orders.length;

    this.pending = this.orders.filter(o => o.status === 1).length;
    this.preparing = this.orders.filter(o => o.status === 2).length;
    this.outForDelivery = this.orders.filter(o => o.status === 3).length;
    this.delivered = this.orders.filter(o => o.status === 4).length;
  }
}