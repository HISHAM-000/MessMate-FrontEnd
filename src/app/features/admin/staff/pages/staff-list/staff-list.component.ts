import { Component, OnInit } from '@angular/core';
import { MessService } from 'src/app/core/services/mess.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  messes: any[] = [];
  loading = true;

  constructor(
    private messService: MessService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMesses();
  }

  loadMesses() {
    this.messService.getAllMess().subscribe({
      next: (res: any) => {
        this.messes = res.data || res || [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  openStaff(messId: number) {
    this.router.navigate(['/admin/staff', messId]);
  }
}