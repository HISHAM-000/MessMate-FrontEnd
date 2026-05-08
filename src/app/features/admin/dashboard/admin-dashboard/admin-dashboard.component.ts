import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApplicationService } from 'src/app/core/services/application.service';
import { MessService } from 'src/app/core/services/mess.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  pendingMessCount = 0;
  activeMessCount = 0;

  // not available yet from backend
  ordersTodayCount: number | null = null;

  loading = true;

  constructor(
    private applicationService: ApplicationService,
    private messService: MessService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;

    forkJoin({
      pending: this.applicationService.getPendingMesses(),
      mess: this.messService.getAllMess()
    }).subscribe({
      next: (res: any) => {

        // ✅ Pending mess (based on your API structure)
        this.pendingMessCount = res.pending?.data?.length || 0;

        // ✅ Active mess (handles both wrapped & plain array)
        this.activeMessCount =
          res.mess?.data?.length ??
          res.mess?.length ??
          0;

        this.loading = false;
      },

      error: (err) => {
        console.error('Dashboard load error:', err);
        this.loading = false;
      }
    });
  }

  
}