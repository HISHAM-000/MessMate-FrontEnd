import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/shared/models/subscription.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscription: Subscription | null = null;
  skipDate: string = '';

  constructor(private subService: SubscriptionService) { }

  ngOnInit(): void {
    this.loadSubscription();
  }

  loadSubscription(): void {
    this.subService.getMySubscription().subscribe(sub => {
      this.subscription = sub;
    });
  }

  pauseSubscription(): void {
    if (this.subscription && confirm('Are you sure you want to pause your subscription?')) {
      this.subService.pause(this.subscription.id).subscribe(() => {
        this.loadSubscription();
      });
    }
  }

  cancelSubscription(): void {
    if (this.subscription && confirm('Are you sure you want to cancel? This cannot be undone.')) {
      this.subService.cancel(this.subscription.id).subscribe(() => {
        this.loadSubscription();
      });
    }
  }

  skipMeal(): void {
    if (this.skipDate) {
      this.subService.skipMeal(this.skipDate).subscribe(() => {
        alert('Meal skipped for ' + this.skipDate);
        this.skipDate = '';
        this.loadSubscription();
      });
    } else {
      alert('Please select a date to skip.');
    }
  }
  
  calculateProgress(): number {
    if (!this.subscription) return 0;
    const start = new Date(this.subscription.startDate).getTime();
    const end = new Date(this.subscription.endDate).getTime();
    const now = new Date().getTime();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return Math.round(((now - start) / (end - start)) * 100);
  }
}
