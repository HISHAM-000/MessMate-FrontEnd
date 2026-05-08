import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners: any[] = [];
  loading = true;

  // 🔥 modal
  showRejectModal = false;
  selectedOwnerId: number | null = null;
  rejectReason = '';

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadOwners();
  }

  loadOwners() {
    this.applicationService.getPendingMesses().subscribe({
      next: (res: any) => {
        this.owners = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔥 Open modal
  openRejectModal(ownerId: number) {
    this.selectedOwnerId = ownerId;
    this.rejectReason = '';
    this.showRejectModal = true;
  }

  closeModal() {
    this.showRejectModal = false;
    this.selectedOwnerId = null;
  }

  // ❌ Reject owner
  confirmReject() {
    if (!this.rejectReason.trim()) {
      alert('Reason is required');
      return;
    }

    if (!this.selectedOwnerId) return;

    this.applicationService
      .rejectOwner(this.selectedOwnerId, this.rejectReason)
      .subscribe({
        next: () => {

          this.owners = this.owners.filter(
            o => o.id !== this.selectedOwnerId
          );

          this.closeModal();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}