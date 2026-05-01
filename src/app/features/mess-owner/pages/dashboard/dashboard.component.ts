import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { PlanService } from '../../services/plan.service';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  isLoading = true;

  stats = {
    totalOrders: 0,
    todayMeals: 0,
    revenue: 0,
    activePlans: 0,
    staffCount: 0,
    deliveredOrders: 0
  };

  todayOrders: any[] = [];

  constructor(
    private orderService: OrderService,
    private planService: PlanService,
    private staffService: StaffService
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    const today = new Date().toISOString().split('T')[0];

    forkJoin({
      ordersRes: this.orderService.getOrders(today),
      plansRes: this.planService.getPlans(),
      staffRes: this.staffService.getStaff()
    }).subscribe({
      next: ({ ordersRes, plansRes, staffRes }: any) => {

        const orders = this.extractArray(ordersRes);
        const plans = this.extractArray(plansRes);
        const staff = this.extractArray(staffRes);

        // 🔥 KPI CALCULATIONS
        this.stats.totalOrders = orders.length;

        // ✅ TODAY MEALS (IMPORTANT FIX)
        this.stats.todayMeals = orders.reduce(
          (sum, o) => sum + (o.quantity || 1),
          0
        );

        // ✅ REVENUE
        this.stats.revenue = orders.reduce(
          (sum, o) => sum + (o.amount || 0),
          0
        );

        // ✅ DELIVERED
        this.stats.deliveredOrders = orders.filter(
          o => o.status === 'Delivered'
        ).length;

        this.stats.activePlans = plans.length;
        this.stats.staffCount = staff.length;

        this.todayOrders = orders;

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  extractArray(res: any): any[] {
    if (!res) return [];

    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.items)) return res.data.items;
    if (Array.isArray(res)) return res;

    return [];
  }
}