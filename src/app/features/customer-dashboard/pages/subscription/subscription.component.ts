import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  subscriptions: any[] = [];

  // 🔹 Pause Modal State
  isPauseModalOpen: boolean = false;
  selectedSubscriptionId: number | null = null;

  pauseFrom: string = '';
  pauseUntil: string = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  // 🔹 Load subscriptions
  loadSubscriptions() {
    this.subscriptionService.getMySubscriptions().subscribe({
      next: (res: any) => {
        this.subscriptions = res.data;
      },
      error: (err) => this.handleError(err)
    });
  }

  // 🔹 Open modal
  openPauseModal(subscriptionId: number) {
    this.selectedSubscriptionId = subscriptionId;
    this.isPauseModalOpen = true;
  }

  // 🔹 Close modal
  closePauseModal() {
    this.isPauseModalOpen = false;
    this.pauseFrom = '';
    this.pauseUntil = '';
  }

  // 🔹 Pause subscription
  pause() {

    if (!this.selectedSubscriptionId) {
      this.toastr.error('Invalid subscription');
      return;
    }

    if (!this.pauseFrom || !this.pauseUntil) {
      this.toastr.warning('Please select pause dates');
      return;
    }

    if (this.pauseFrom > this.pauseUntil) {
      this.toastr.error('Invalid date range');
      return;
    }

    const request = {
      subscriptionId: this.selectedSubscriptionId,
      pauseFrom: this.pauseFrom,
      pauseUntil: this.pauseUntil
    };

    this.subscriptionService.pauseWithDates(this.selectedSubscriptionId, request).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'Paused successfully');
        this.closePauseModal();
        this.loadSubscriptions();
      },
      error: (err) => this.handleError(err)
    });
  }

  // 🔹 Cancel
  cancel(id: number) {
    this.subscriptionService.cancel(id).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'Cancelled');
        this.loadSubscriptions();
      },
      error: (err) => this.handleError(err)
    });
  }

  // 🔹 Error handler
  handleError(err: any) {
    console.error(err);

    if (Array.isArray(err?.error?.errors)) {
      err.error.errors.forEach((e: string) => this.toastr.error(e));
      return;
    }

    if (err?.error?.errors && typeof err.error.errors === 'object') {
      Object.values(err.error.errors).forEach((messages: any) => {
        messages.forEach((msg: string) => this.toastr.error(msg));
      });
      return;
    }

    if (err?.error?.message) {
      this.toastr.error(err.error.message);
      return;
    }

    this.toastr.error('Something went wrong');
  }
}