import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan, Meal } from 'src/app/shared/models/menu.model';
import { PlanService } from 'src/app/core/services/plan.service';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {
  plan: Plan | undefined;
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDay: string = 'Monday';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planService: PlanService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.planService.getPlanDetails(id).subscribe(plan => {
        this.plan = plan;
        // Auto select today
        const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
        this.selectedDay = this.daysOfWeek[todayIndex];
      });
    }
  }

  getMealsForSelectedDay(): Meal[] {
    if (!this.plan || !this.plan.meals) return [];
    return this.plan.meals.filter(m => m.dayOfWeek === this.selectedDay);
  }

  selectDay(day: string): void {
    this.selectedDay = day;
  }

  enroll(): void {
    if (this.plan) {
      this.planService.enrollInPlan(this.plan.id).subscribe(() => {
        alert('Successfully enrolled! (Simulated)');
        this.router.navigate(['/customer/subscription']);
      });
    }
  }

  goBack(): void {
    if (this.plan && this.plan.messId) {
      this.router.navigate(['/customer/mess-detail', this.plan.messId]);
    } else {
      this.router.navigate(['/customer/browse-mess']);
    }
  }
}
