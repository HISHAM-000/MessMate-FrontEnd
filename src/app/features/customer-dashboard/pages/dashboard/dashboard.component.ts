import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu.service';
import { MessService } from 'src/app/core/services/mess.service';
import { OrderService } from 'src/app/core/services/order.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subscription: any;
  orders: any[] = [];
  menu: any[] = [];

  constructor(
    private subService: SubscriptionService,
    private orderService: OrderService,
    private messService: MessService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.subService.getMySubscription().subscribe(res => {
      this.subscription = res;
    });

    this.orderService.getMyOrders().subscribe(res => {
      this.orders = res as any[];
    });


    // Mock today's menu for the UI showcase
    this.menu = [
      { name: 'Paneer Butter Masala' },
      { name: 'Butter Naan (3pcs)' },
      { name: 'Jeera Rice & Dal Tadka' },
      { name: 'Gulab Jamun' }
    ];
  }
}
