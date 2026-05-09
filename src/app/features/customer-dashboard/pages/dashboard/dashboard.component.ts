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
export class DashboardComponent implements OnInit {
  isSkipModalOpen: boolean = false;
  todayOrders: any[] = [];
  greeting: string = '';
  customerName: string = 'User';
  wellnessScore: number = 85;
  stats = {
    mealsSaved: 12,
    daysActive: 45,
    streak: 5
  };
  mealSuggestion: string = '';
  wellnessTip: string = '';
  liveStatus: string = 'Kitchen is busy preparing delicious meals!';
  greetingIcon: string = '👋';
  streakRank: string = 'Rookie';
  nutritionQuote: string = '';
  dailyFocus: string = '';
  isLoading: boolean = false;
  userInitials: string = 'U';
  lastUpdated: string = 'Just now';

  private statusMessages = [
    'Kitchen is busy preparing delicious meals!',
    'Next meal prep starts in 30 minutes.',
    'Did you know? Our ingredients are sourced locally.',
    'Your favorite meal is trending today!',
    'Stay hydrated! Drink 8 glasses of water daily.'
  ];

  private suggestions = [
    'Try adding some protein to your lunch today!',
    'How about a light dinner to sleep better?',
    'Hydration is key! Drink a glass of water before your meal.',
    'Seasonal veggies are great for immunity right now.',
    'Slow down and savor each bite for better digestion.'
  ];

  constructor(
    private subscriptionService: SubscriptionService,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  activeSub: any = null;

  ngOnInit(): void {
    this.loadActiveSubscription();
    this.setGreeting();
    this.loadCustomerName();
    this.generatePersonalizedInfo();
    this.startLiveTicker();
    this.calculateStreakRank();
    this.setNutritionQuote();
    this.setDailyFocus();
  }

  setDailyFocus() {
    const days = [
      'Mindful Monday: Focus on savoring every bite.',
      'Training Tuesday: High protein meals are on the menu.',
      'Wellness Wednesday: Mid-week hydration check!',
      'Thoughtful Thursday: Plan your weekend meals.',
      'Fueling Friday: Get ready for an active weekend.',
      'Social Saturday: Share a meal with a friend!',
      'Restoration Sunday: Light meals for a fresh start.'
    ];
    this.dailyFocus = days[new Date().getDay()];
  }

  calculateStreakRank() {
    const s = this.stats.streak;
    if (s > 20) this.streakRank = 'Legend';
    else if (s > 10) this.streakRank = 'Elite';
    else if (s > 5) this.streakRank = 'Pro';
    else this.streakRank = 'Rookie';
  }

  setNutritionQuote() {
    const quotes = [
      'Your body is a temple, keep it healthy.',
      'Eat breakfast like a king, lunch like a prince.',
      'Good food is the foundation of genuine happiness.',
      'A healthy outside starts from the inside.'
    ];
    this.nutritionQuote = quotes[Math.floor(Math.random() * quotes.length)];
  }

  startLiveTicker() {
    setInterval(() => {
      this.liveStatus = this.statusMessages[Math.floor(Math.random() * this.statusMessages.length)];
    }, 8000);
  }

  generatePersonalizedInfo() {
    this.mealSuggestion = this.suggestions[Math.floor(Math.random() * this.suggestions.length)];
    const tips = [
      'Mindful eating can help you feel more satisfied.',
      'Consistency in meal timing improves metabolism.',
      'A balanced diet is a balanced life.'
    ];
    this.wellnessTip = tips[Math.floor(Math.random() * tips.length)];
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Good Morning';
      this.greetingIcon = '🌅';
    } else if (hour < 17) {
      this.greeting = 'Good Afternoon';
      this.greetingIcon = '☀️';
    } else {
      this.greeting = 'Good Evening';
      this.greetingIcon = '🌙';
    }
  }

  loadCustomerName() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.customerName = user.name || user.firstName || 'User';
        this.userInitials = this.customerName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);
      } catch (e) {
        this.customerName = 'User';
        this.userInitials = 'U';
      }
    }
    this.updateLastUpdated();
  }

  updateLastUpdated() {
    const now = new Date();
    this.lastUpdated = `Last updated: ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
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

  goToBrowseMess() {
    this.router.navigate(['/customer/browse-mess']);
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
