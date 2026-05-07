import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.css']
})
export class SummaryCardsComponent implements OnInit {

  activePlanName: string = '';
  daysLeft: number = 0;

  upcomingMeals: number = 0;
  skippedMeals: number = 0;

  constructor(
    private subscriptionService: SubscriptionService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadSubscription();
    this.loadOrders();
  }

  // 🔹 Active Plan + Days Left
  loadSubscription() {
    this.subscriptionService.getMySubscriptions().subscribe({
      next: (res: any) => {

        const activeSub = res.data.find(
          (s: any) => s.status === 'Active'
        );

        if (!activeSub) return;

        this.activePlanName = activeSub.planName;

        const today = new Date();
        const end = new Date(activeSub.endDate);

        const diff = Math.ceil(
          (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        this.daysLeft = diff > 0 ? diff : 0;
      },
      error: (err) => console.error(err)
    });
  }

  // 🔹 Upcoming + Skipped Meals
  loadOrders() {
    this.orderService.getMyOrders().subscribe({
      next: (res: any) => {

        const today = new Date();
        today.setHours(0,0,0,0);

        const orders = res.data;

        // ✅ Upcoming = future pending
        this.upcomingMeals = orders.filter((o: any) => {
          const orderDate = new Date(o.orderDate);
          return o.status === 'Pending' && orderDate >= today;
        }).length;

        // ✅ Skipped
        this.skippedMeals = orders.filter((o: any) =>
          o.status === 'Skipped'
        ).length;

      },
      error: (err) => console.error(err)
    });
  }
}