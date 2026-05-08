import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  constructor(private authService : AuthService,
    private router : Router,
    private toastr : ToastrService,
  ){}
  logout() {
  this.authService.handleLogout();
  this.router.navigate(['/auth/login']);
  this.toastr.success('Logged out successfully');
}
}
