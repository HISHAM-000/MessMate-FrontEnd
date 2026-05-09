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

  recentActivities = [
    { id: 1, type: 'application', title: 'New Mess Application', desc: 'submitted by "Royal Mess"', time: '2 mins ago', color: 'violet', link: '/admin/mess/pending' },
    { id: 2, type: 'audit', title: 'Audit complete', desc: 'for Order Batch #9422', time: '15 mins ago', color: 'success', link: '/admin/orders' },
    { id: 3, type: 'owner', title: 'Owner update', desc: 'Profile changed for "Hisham Ahmed"', time: '45 mins ago', color: 'warning', link: '/admin/owners' },
    { id: 4, type: 'system', title: 'System Maintenance', desc: 'scheduled for midnight', time: '2 hours ago', color: 'indigo', link: '/admin/dashboard' }
  ];

  quickActions = [
    { label: 'Review Applications', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', link: '/admin/mess/pending', color: 'violet' },
    { label: 'Manage Owners', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', link: '/admin/owners', color: 'indigo' },
    { label: 'Audit Orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', link: '/admin/orders', color: 'purple' },
    { label: 'System Settings', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4', link: '/admin/users', color: 'blue' }
  ];

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