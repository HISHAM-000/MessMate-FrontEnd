import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu.service';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-today-meal',
  templateUrl: './today-meal.component.html',
  styleUrls: ['./today-meal.component.css']
})
export class TodayMealComponent implements OnInit {

  todayMeals: any[] = [];

  constructor(
    private menuService: MenuService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.loadTodayMenu();
  }

  loadTodayMenu() {

    this.subscriptionService.getMySubscriptions().subscribe({
      next: (res: any) => {

        const activeSub = res.data.find(
          (s: any) => s.status === 'Active'
        );

        if (!activeSub) {
          console.warn('No active subscription');
          return;
        }

        const messId = activeSub.messId;

        if (!messId) {
          console.error('MessId is missing');
          return;
        }

        this.menuService.getTodayMenu(messId).subscribe({
          next: (menu: any) => {

            this.todayMeals = menu.data || [];

            // ✅ sort: Breakfast → Lunch → Dinner
            this.todayMeals.sort((a: any, b: any) => a.mealSlot - b.mealSlot);

            console.log('TODAY MEALS:', this.todayMeals);
          },
          error: (err) => {
            console.error('Error fetching today menu', err);
          }
        });

      },
      error: (err) => {
        console.error('Error fetching subscriptions', err);
      }
    });
  }

  // 🔹 Convert mealSlot number → readable text
  getMealSlotName(slot: number): string {
    switch (slot) {
      case 1:
        return '🍳 Breakfast';
      case 2:
        return '🍛 Lunch';
      case 3:
        return '🍗 Dinner';
      default:
        return 'Meal';
    }
  }
}