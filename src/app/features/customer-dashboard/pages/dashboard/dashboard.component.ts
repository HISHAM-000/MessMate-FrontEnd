import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuService } from 'src/app/core/services/menu.service';
import { MessService } from 'src/app/core/services/mess.service';
import { OrderService } from 'src/app/core/services/order.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
isSkipModalOpen: boolean = false;
  todayOrders: any[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}
activeSub: any = null;

ngOnInit(): void {
  this.loadActiveSubscription();
}

loadActiveSubscription() {
  this.subscriptionService.getMySubscriptions().subscribe({
    next: (res: any) => {

      this.activeSub = res.data.find(
        (s: any) => s.status === 'Active'
      );

      console.log('ACTIVE SUB:', this.activeSub);
    },
    error: (err) => console.error(err)
  });
}
  goToOrders() {
    this.router.navigate(['/customer/orders']);
  }

  goToSubscription() {
    this.router.navigate(['/customer/subscription']);
  }

  loadTodayOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (res: any) => {

        const today = new Date();
        today.setHours(0,0,0,0);

        this.todayOrders = res.data.filter((o: any) => {
          const orderDate = new Date(o.orderDate);
          orderDate.setHours(0,0,0,0);

          return orderDate.getTime() === today.getTime()
            && o.status === 'Pending';
        });

        if (this.todayOrders.length === 0) {
          this.toastr.warning('No meals available to skip');
          this.isSkipModalOpen = false;
          return;
        }

        this.isSkipModalOpen = true;
      },
      error: () => {
        this.toastr.error('Failed to load meals');
      }
    });
  }

  openSkipModal() {
    this.loadTodayOrders();
  }

  closeSkipModal() {
    this.isSkipModalOpen = false;
  }

  skipMeal(orderId: number) {
    this.subscriptionService.skipMeal(orderId).subscribe({
      next: (res: any) => {
        this.toastr.success(res.data.message || 'Meal skipped');
        this.closeSkipModal();
      },
      error: () => {
        this.toastr.error('Failed to skip meal');
      }
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
