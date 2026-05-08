import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isLoggingOut = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // onLogout() {
  //   if (this.isLoggingOut) return;

  //   this.isLoggingOut = true;

    // this.authService.logout().subscribe({
    //   next: () => {
    //     this.authService.clearClientState();

    //     this.toastr.success('Logged out successfully');

    //     this.router.navigate(['/login']);

    //     setTimeout(() => window.location.reload(), 100);
    //   },
    //   error: () => {
    //     this.authService.clearClientState();

    //     this.toastr.info('Session cleared');

  //       this.router.navigate(['/auth/login']);

  //       setTimeout(() => window.location.reload(), 100);
  //     },
  //     complete: () => {
  //       this.isLoggingOut = false;
  //     }
  //   });
  // }
  onLogout() {
  this.authService.handleLogout();
  this.router.navigate(['/auth/login']);
  this.toastr.success('Logged out successfully');
}
}