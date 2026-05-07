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

  constructor(private authService : AuthService,
    private router : Router,
    private toastr : ToastrService
  ){}

  logout() {
  this.authService.handleLogout();
  this.router.navigate(['/auth/login']);
  this.toastr.success('Logged out successfully');
}
}
