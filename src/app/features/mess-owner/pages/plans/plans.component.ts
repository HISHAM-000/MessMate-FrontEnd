import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  plans: any[] = [];

  // 🔥 modal state
  showDeleteModal = false;
  deletePlanId!: number;

  constructor(
    private planService: PlanService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadPlans();
  }

  loadPlans() {
    this.planService.getPlans().subscribe({
      next: (res: any) => {
        this.plans = res?.data ?? res ?? [];
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Failed to load plans");
      }
    });
  }

  editPlan(planId: number) {
    this.router.navigate(['/owner/plan-form', planId]);
  }

  // 🔥 open modal
  openDeleteModal(planId: number) {
    this.deletePlanId = planId;
    this.showDeleteModal = true;
  }

  // 🔥 close modal
  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  // 🔥 confirm delete
  confirmDelete() {
    this.planService.deletePlan(this.deletePlanId).subscribe({
      next: () => {
        // update UI instantly
        this.plans = this.plans.filter(p => p.id !== this.deletePlanId);

        this.toastr.success("Plan deleted successfully");
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Delete failed");
      }
    });
  }
}