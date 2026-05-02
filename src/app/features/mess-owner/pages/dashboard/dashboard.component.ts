import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { PlanService } from '../../services/plan.service';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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

  // ✅ Greeting
  get greeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }

  // ✅ Progress Calculation
  get mealProgress() {
    if (this.stats.todayMeals === 0) return 0;
    const progress = Math.round(
      (this.stats.deliveredOrders / this.stats.todayMeals) * 100
    );
    return progress > 100 ? 100 : progress;
  }

  // ✅ KPI Cards
  get statCards() {
    return [
      { title: 'Total Orders', value: this.stats.totalOrders, icon: 'receipt_long', color: 'blue', trend: '+12%', trendUp: true },
      { title: 'Today\'s Meals', value: this.stats.todayMeals, icon: 'restaurant', color: 'green', trend: '+5%', trendUp: true },
      { title: 'Revenue Today', value: '₹' + this.stats.revenue, icon: 'account_balance_wallet', color: 'purple', trend: '+18%', trendUp: true },
      { title: 'Delivered', value: this.stats.deliveredOrders, icon: 'local_shipping', color: 'teal', trend: '+2%', trendUp: true },
      { title: 'Active Plans', value: this.stats.activePlans, icon: 'verified', color: 'orange', trend: '-1%', trendUp: false },
      { title: 'Staff Count', value: this.stats.staffCount, icon: 'badge', color: 'rose', trend: '0%', trendUp: true }
    ];
  }

  // ✅ STATUS MAPPER (FIX)
  getStatusText(status: number): string {
    switch (status) {
      case 1: return 'Pending';
      case 2: return 'Preparing';
      case 3: return 'OutForDelivery';
      case 4: return 'Delivered';
      default: return 'Unknown';
    }
  }

  // ✅ LOAD DASHBOARD
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

        // 🔥 Transform orders (IMPORTANT FIX)
        const mappedOrders = orders.map((o: any) => ({
          ...o,
          statusText: this.getStatusText(o.status)
        }));

        // ✅ KPIs
        this.stats.totalOrders = mappedOrders.length;

        this.stats.todayMeals = mappedOrders.length; // since no quantity field

        this.stats.revenue = mappedOrders.reduce(
          (sum: number, o: any) => sum + (o.amount || 0),
          0
        );

        this.stats.deliveredOrders = mappedOrders.filter(
          (o: any) => o.status === 4   // ✅ FIXED
        ).length;

        this.stats.activePlans = plans.length;
        this.stats.staffCount = staff.length;

        // ✅ Assign to UI
        this.todayOrders = mappedOrders;

        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // ✅ Safe extractor
  extractArray(res: any): any[] {
    if (!res) return [];
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.items)) return res.data.items;
    if (Array.isArray(res)) return res;
    return [];
  }
}