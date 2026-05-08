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
    this.staffService.getStaffByMess(this.messId).subscribe({
      next: (res: any) => {
        this.staff = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/staff']);
  }
}