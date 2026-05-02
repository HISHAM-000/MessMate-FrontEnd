import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.css']
})
export class PlanFormComponent implements OnInit {

  planId!: number;
  isEditMode = false;

  plan: any = {
    name: '',
    planType: 1,
    price: null,
    durationDays: null,
    minActiveDays: null,
    isBreakfast: false,
    isLunch: false,
    isDinner: false
  };

  constructor(
    private planService: PlanService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.planId = +id;
      this.isEditMode = true;
      this.loadPlan();
    }
  }

  // ✅ LOAD PLAN
  loadPlan() {
    this.planService.getPlanById(this.planId).subscribe({
      next: (res: any) => {
        const data = res.data || res;

        this.plan = {
          ...data,
          planType: Number(data.planType) // 🔥 FIX
        };
      },
      error: () => {
        this.toaster.error("Failed to load plan");
      }
    });
  }

  // ✅ SAVE PLAN
  savePlan(form: any) {

    if (form.invalid) {
      this.toaster.error("Please fill all required fields correctly");
      return;
    }

    if (this.plan.price <= 0) {
      this.toaster.error("Price must be greater than 0");
      return;
    }

    if (!this.plan.isBreakfast && !this.plan.isLunch && !this.plan.isDinner) {
      this.toaster.error("Select at least one meal");
      return;
    }

    // 🔥 FIX ENUM
    this.plan.planType = Number(this.plan.planType);

    console.log("Sending:", this.plan);

    if (this.isEditMode) {
      this.planService.updatePlan(this.planId, this.plan).subscribe({
        next: (res: any) => {
          this.toaster.success(res?.message || "Plan updated successfully");
          this.router.navigate(['/owner/plans']);
        },
        error: (err) => this.handleError(err)
      });
    } else {
      this.planService.createPlan(this.plan).subscribe({
        next: (res: any) => {
          this.toaster.success(res?.message || "Plan created successfully");
          this.router.navigate(['/owner/plans']);
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  // ✅ ERROR HANDLER
  handleError(err: any) {
    console.error(err);

    if (err?.error?.errors) {
      Object.keys(err.error.errors).forEach(key => {
        this.toaster.error(err.error.errors[key][0]);
      });
    } else {
      this.toaster.error(err?.error?.message || "Something went wrong");
    }
  }
}