import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Plan, Meal } from '../../shared/models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private mockPlans: Plan[] = [
    {
      id: 1, messId: 1, name: 'Standard Premium Thali', description: '2 Meals a day (Lunch & Dinner)', pricePerMonth: 2500, type: 'Veg',
      meals: this.generateMockMeals(1)
    },
    {
      id: 2, messId: 1, name: 'Executive Non-Veg Plan', description: '2 Meals a day with 3 times Non-Veg per week', pricePerMonth: 3500, type: 'Both',
      meals: this.generateMockMeals(2)
    },
    {
      id: 3, messId: 2, name: 'Keto Lite Plan', description: 'Low carb meals twice a day', pricePerMonth: 4000, type: 'Veg',
      meals: this.generateMockMeals(3)
    }
  ];

  constructor() { }

  getPlansByMessId(messId: number): Observable<Plan[]> {
    return of(this.mockPlans.filter(p => p.messId === messId));
  }

  getPlanDetails(planId: number): Observable<Plan | undefined> {
    return of(this.mockPlans.find(p => p.id === planId));
  }

  enrollInPlan(planId: number): Observable<boolean> {
    return of(true); // Simulate successful enrollment
  }

  private generateMockMeals(planId: number): Meal[] {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let meals: Meal[] = [];
    let mealIdCounter = 1;
    days.forEach(day => {
      meals.push({
        id: mealIdCounter++, planId, dayOfWeek: day, mealType: 'Lunch',
        items: [{name: 'Chapati'}, {name: 'Dal Tadka'}, {name: 'Jeera Rice'}, {name: 'Mix Veg'}]
      });
      meals.push({
        id: mealIdCounter++, planId, dayOfWeek: day, mealType: 'Dinner',
        items: [{name: 'Paratha'}, {name: 'Paneer Butter Masala'}, {name: 'Salad'}]
      });
    });
    return meals;
  }
}
