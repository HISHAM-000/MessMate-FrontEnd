export interface MealItem {
  name: string;
  description?: string;
}

export interface Meal {
  id: number;
  planId: number;
  dayOfWeek: string; // e.g., 'Monday', 'Tuesday'
  mealType: string; // e.g., 'Breakfast', 'Lunch', 'Dinner'
  items: MealItem[];
}

export interface Plan {
  id: number;
  messId: number;
  name: string;
  description: string;
  pricePerMonth: number;
  type: string; // 'Veg', 'Non-Veg', 'Both'
  meals?: Meal[];
}

export interface Menu {
  id: number;
  messId: number;
  plans: Plan[];
}
