import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginRequest } from 'src/app/shared/models/login-request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder,private authservice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payload: LoginRequest = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password
  };
    
  this.authservice.login(payload).subscribe({
    next: (res: any) => {
      this.toastr.success("Login Successful", "Success");
      this.isLoading = false;
       const role = res.data.role;

      if (role === 'Customer') {
        this.router.navigate(['/customer/dashboard']);
      } 
      else if (role === 'MessOwner') {
        this.router.navigate(['/owner/dashboard']);
      } 
      else if (role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      } 
      else if (role === 'MessStaff') {
        this.router.navigate(['/staff/dashboard']);
      } 
      else {
        this.router.navigate(['/']);
      }
  },
    error: (err) => {
          console.error('LOGIN ERROR:', err);
          this.isLoading = false;
          this.toastr.error(err?.error?.message || 'Invalid credentials', "Error");
       }
  });
}
}