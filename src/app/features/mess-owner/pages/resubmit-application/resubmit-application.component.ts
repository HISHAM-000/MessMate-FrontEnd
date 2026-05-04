import { Component } from '@angular/core';
import { MessOwnerService } from '../../services/mess-owner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resubmit-application',
  templateUrl: './resubmit-application.component.html',
  styleUrls: ['./resubmit-application.component.css']
})
export class ResubmitApplicationComponent {
   form = {
    name: '',
    email: '',
    phoneNumber: '',
    authorizedName: '',
    licenseNumber: ''
  };

  isLoading = false;
  
  // Unique Feature additions
  rejectionReason: string = "Your FSSAI license copy was unreadable or missing. Please ensure the license number matches official records.";

  get progressPercent(): number {
    let count = 0;
    if (this.form.name?.trim()) count++;
    if (this.form.email?.trim()) count++;
    if (this.form.phoneNumber?.trim()) count++;
    if (this.form.authorizedName?.trim()) count++;
    if (this.form.licenseNumber?.trim()) count++;
    return (count / 5) * 100;
  }

  constructor(
    private service: MessOwnerService,
    private toastr: ToastrService
  ) {}

  submit() {
    if (
      !this.form.name ||
      !this.form.email ||
      !this.form.phoneNumber ||
      !this.form.authorizedName ||
      !this.form.licenseNumber
    ) {
      this.toastr.warning("All fields are required");
      return;
    }

    this.isLoading = true;

    this.service.resubmit(this.form).subscribe({
      next: (res: any) => {
        this.toastr.success(res?.message || "Application resubmitted");

        this.form = {
          name: '',
          email: '',
          phoneNumber: '',
          authorizedName: '',
          licenseNumber: ''
        };

        this.isLoading = false;
      },
      error: (err: any) => {
        this.toastr.error(err?.error?.message || "Resubmit failed");
        this.isLoading = false;
      }
    });
  }
}
