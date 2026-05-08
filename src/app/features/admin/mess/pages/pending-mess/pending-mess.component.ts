import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
  selector: 'app-pending-mess',
  templateUrl: './pending-mess.component.html',
  styleUrls: ['./pending-mess.component.css']
})
export class PendingMessComponent implements OnInit {

  pendingMesses: any[] = [];
  loading = true;
  actionLoadingId: number | null = null;

  // 🔥 Modal state
  showRejectModal = false;
  selectedUserId: number | null = null;
  rejectReason = '';

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadPendingMesses();
  }

  loadPendingMesses() {
    this.loading = true;

    this.applicationService.getPendingMesses().subscribe({
      next: (res: any) => {
        this.pendingMesses = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading pending mess:', err);
        this.loading = false;
      }
    });
  }

  // ✅ Approve mess
  approve(messId: number) {
    this.actionLoadingId = messId;

    this.applicationService.approveMess(messId).subscribe({
      next: () => {
        this.pendingMesses = this.pendingMesses.filter(m => m.id !== messId);
        this.actionLoadingId = null;
      },
      error: (err) => {
        console.error('Approve failed:', err);
        this.actionLoadingId = null;
      }
    });
  }

  // 🔥 Open modal
  openRejectModal(userId: number) {
    this.selectedUserId = userId;
    this.rejectReason = '';
    this.showRejectModal = true;
  }

  // 🔥 Close modal
  closeModal() {
    this.showRejectModal = false;
    this.selectedUserId = null;
  }

  // ❌ Confirm reject
  confirmReject() {
    if (!this.rejectReason.trim()) {
      alert('Reason is required');
      return;
    }

    if (!this.selectedUserId) return;

    this.actionLoadingId = this.selectedUserId;

    this.applicationService
      .rejectOwner(this.selectedUserId, this.rejectReason)
      .subscribe({
        next: () => {
          this.pendingMesses = this.pendingMesses.filter(
            m => m.id !== this.selectedUserId
          );

          this.closeModal();
          this.actionLoadingId = null;
        },
        error: (err) => {
          console.error('Reject failed:', err);
          this.actionLoadingId = null;
        }
      });
  }
}