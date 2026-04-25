import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterOwnerRequest } from 'src/app/shared/models/register-owner-request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-owner',
  templateUrl: './register-owner.component.html',
  styleUrls: ['./register-owner.component.css']
})
export class RegisterOwnerComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\+?[0-9\\s\\-\\(\\)]{10,20}$')]],
      authorizedName: ['', [Validators.required, Validators.minLength(2)]],
      licenseNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payload: RegisterOwnerRequest = {
      name: this.form.value.name,
      email: this.form.value.email,
      phoneNumber: this.form.value.phone,
      password: this.form.value.password,
      authorizedName: this.form.value.authorizedName,
      licenseNumber: this.form.value.licenseNumber
    };

    this.authService.registerOwner(payload).subscribe({
      next: (res) => {
        console.log('SUCCESS:', res);
        this.toastr.success('Registered successfully', 'Success');
        this.router.navigate(['/auth/login']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('ERROR:', err);
        this.toastr.error(err?.error?.message || 'Registration failed', 'Error');
        this.isLoading = false;
      }
    });

    // setTimeout(() => {
    //   this.isLoading = false;
    //   console.log('Registered Owner:', this.form.value);
    //   alert('Owner Registration Successful');
    //   // redirect or handle success
    // }, 1500);
  }
}
