import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/core/services/application.service';
import { MessService } from 'src/app/core/services/mess.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners: any[] = [];
  selectedOwner: any = null;
  loading = true;

  // 🔥 modal
  showRejectModal = false;
  selectedOwnerId: number | null = null;
  rejectReason = '';

  constructor(
    private applicationService: ApplicationService,
    private messService: MessService
  ) {}

  ngOnInit(): void {
    this.loadOwners();
  }

  loadOwners() {
    this.loading = true;
    this.messService.getAllMess().subscribe({
      next: (res: any) => {
        const rawData = res.data || res || [];
        this.owners = rawData.map((m: any) => ({
          ...m,
          messName: m.name || m.messName // Handle both property names
        }));
        
        this.loading = false;
        
        // Auto-select first one if available
        if (this.owners.length > 0) {
          this.selectedOwner = this.owners[0];
        }
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  selectOwner(owner: any) {
    this.selectedOwner = owner;
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
        error: (err: any) => {
          console.error(err);
        }
      });
  }
}