import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from 'src/app/core/services/plan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.css']
})
export class PlanDetailComponent implements OnInit {

  planId!: number;
  plan: any = null;

  deliveryAddress: string = '';
  paymentMethod: number = 2;

  isEnrollModalOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planService: PlanService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.planId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPlan();
  }

  loadPlan() {
    this.planService.getPlanById(this.planId).subscribe({
      next: (res: any) => {
        this.plan = res.data;
        console.log('PLAN:', this.plan);
      },
      error: (err) => this.handleError(err)
    });
  }

  openEnrollModal() {
    this.isEnrollModalOpen = true;
  }

  closeEnrollModal() {
    this.isEnrollModalOpen = false;
  }

  enroll() {

    if (!this.plan?.messId) {
      this.toastr.error('Mess information missing');
      return;
    }

    if (!this.deliveryAddress || this.deliveryAddress.trim() === '') {
      this.toastr.warning('Please enter delivery address');
      return;
    }

    if (this.paymentMethod !== 2) {
      this.toastr.warning('Cash on Delivery is not available yet');
      return;
    }

    const request = {
      planId: this.planId,
      messId: this.plan.messId,
      deliveryAddress: this.deliveryAddress,
      deliveryLat: 0,
      deliveryLng: 0,
      paymentMethod: this.paymentMethod
    };

    console.log('REQUEST:', request);

    this.planService.enroll(request).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        this.closeEnrollModal();

        // optional redirect
        // this.router.navigate(['/customer/subscription']);
      },
      error: (err) => this.handleError(err)
    });
  }

 handleError(err: any) {
  console.error('FULL ERROR:', err);

  // Case 1: errors array (your backend)
  if (Array.isArray(err?.error?.errors)) {
    err.error.errors.forEach((e: string) => {
      this.toastr.error(e);
    });
    return;
  }

  // Case 2: validation object (ASP.NET model state)
  if (err?.error?.errors && typeof err.error.errors === 'object') {
    Object.values(err.error.errors).forEach((messages: any) => {
      messages.forEach((msg: string) => {
        this.toastr.error(msg);
      });
    });
    return;
  }

  // Case 3: single message
  if (err?.error?.message) {
    this.toastr.error(err.error.message);
    return;
  }

  if (err?.error?.title) {
    this.toastr.error(err.error.title);
    return;
  }

  // fallback
  this.toastr.error('Something went wrong');
}
}