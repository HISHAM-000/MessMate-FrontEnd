import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../services/staff.service';
import { ToastrService } from 'ngx-toastr';
import { DeliveryService } from '../../services/delivery.services';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staffs: any[] = [];

  showAddModal = false;
  showAssignModal = false;
  showDeleteModal = false;

  selectedStaffId!: number;
  orderId!: number;

  newStaff = {
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  };
  constructor(
    private staffService: StaffService,
    private toastr: ToastrService,
    private deliveryService: DeliveryService
  ) {}

  ngOnInit() {
    this.loadStaffs();
  }

  loadStaffs() {
    this.staffService.getStaff().subscribe({
      next: (res: any) => {
        this.staffs = res.data || res;
      },
      error: (err: any) => {
        this.toastr.error("Failed to load staff");
      }
    });
  }

   /* ADD */
  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.newStaff = { name: '', email: '', phoneNumber: '', password: '' };
  }

  confirmAdd() {
    if (!this.newStaff.name || !this.newStaff.email || !this.newStaff.password) {
      this.toastr.warning("All fields required");
      return;
    }

    this.staffService.addStaff(this.newStaff).subscribe({
      next: (res: any) => {
        this.toastr.success(res?.message || "Staff added");
        this.loadStaffs();
        this.closeAddModal();
      },
      error: (err: any) => {
        this.toastr.error(err?.error?.message || "Add failed");
      }
    });
  }

  /* ---------- ASSIGN ---------- */

  openAssignModal(staffId: number) {
    this.selectedStaffId = staffId;
    this.showAssignModal = true;
  }

  closeAssignModal() {
    this.showAssignModal = false;
    this.orderId = 0;
  }

  confirmAssign() {
  if (!this.orderId) {
    this.toastr.warning("Order ID required");
    return;
  }

  if (!this.selectedStaffId) {
    this.toastr.warning("Staff not selected");
    return;
  }

  this.deliveryService
    .assignDelivery(this.orderId, this.selectedStaffId)
    .subscribe({
      next: (res: any) => {
        this.toastr.success(res?.message || "Delivery assigned");
        this.closeAssignModal();
      },
      error: (err: any) => {
        this.toastr.error(err?.error?.message || "Assign failed");
      }
    });
}

  /* ---------- DELETE ---------- */

  openDeleteModal(staffId: number) {
    this.selectedStaffId = staffId;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    this.staffService.deleteStaff(this.selectedStaffId).subscribe({
      next: (res: any) => {
        this.staffs = this.staffs.filter(s => s.id !== this.selectedStaffId);
        this.toastr.success(res?.message || "Deleted successfully");
        this.closeDeleteModal();
      },
      error: (err: any) => {
        this.toastr.error(err?.error?.message || "Delete failed");
      }
    });
  }
}