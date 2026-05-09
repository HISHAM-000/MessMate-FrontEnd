import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'src/app/core/services/staff.service';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit {

  staff: any[] = [];
  messId!: number;
  loading = true;

  // 🔥 NEW
  selectedStaff: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.messId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStaff();
  }

  loadStaff() {
    this.loading = true;

    this.staffService.getStaffByMess(this.messId).subscribe({
      next: (res: any) => {
        console.log('STAFF RESPONSE:', res);

        this.staff = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Staff error:', err);
        this.loading = false;
      }
    });
  }

  // 🔥 NEW: select staff
  selectStaff(staff: any) {
    this.selectedStaff = staff;
  }

  // 🔥 NEW: clear selection
  clearSelection() {
    this.selectedStaff = null;
  }

  goBack() {
    this.router.navigate(['/admin/staff']);
  }
}