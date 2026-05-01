import { Component } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent {

  plan: any = {
    name: '',
    planType: 1,
    price: null,
    minActiveDays: null,
    isBreakfast: false,
    isLunch: false,
    isDinner: false
  };

  constructor(
    private planService: PlanService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  savePlan(form: any) {

    // 🔥 Angular form validation
    if (form.invalid) {
      this.toaster.error("Please fill all required fields correctly");
      return;
    }

    // 🔥 Custom validation
    if (this.plan.price <= 0) {
      this.toaster.error("Price must be greater than 0");
      return;
    }

    if (!this.plan.isBreakfast && !this.plan.isLunch && !this.plan.isDinner) {
      this.toaster.error("Select at least one meal");
      return;
    }

    console.log("Sending:", this.plan);

    this.planService.createPlan(this.plan).subscribe({
      next: (res: any) => {
        this.toaster.success(res?.message || "Plan created successfully");
        this.router.navigate(['/owner/plans']);
      },
      error: (err) => {
        console.error(err);

        // 🔥 Handle backend validation errors
        if (err?.error?.errors) {
          const errors = err.error.errors;

          Object.keys(errors).forEach(key => {
            this.toaster.error(errors[key][0]);
          });

        } else {
          this.toaster.error(err?.error?.message || "Something went wrong");
        }
      }
    });
  }
}