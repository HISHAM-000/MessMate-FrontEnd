import { Component, OnInit } from '@angular/core';
import { MessService } from '../../services/mess.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mess-form',
  templateUrl: './mess-form.component.html',
  styleUrls: ['./mess-form.component.css']
})
export class MessFormComponent implements OnInit{
  isLoading = true;

  form = {
    id: 0,
    name: '',
    description: '',
    addressLine: '',
    city: '',
    state: '',
    postalCode: '',
    latitude: 0,
    longitude: 0
  };

  constructor(
    private service: MessService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMess();
  }

   loadMess() {
    this.service.getMyMess().subscribe({
      next: (res: any) => {
        const data = res.data || res;

        if (data) {
          this.form = { ...data };
        }

        this.isLoading = false;
      },
      error: () => {
        this.toastr.error("Failed to load mess");
        this.isLoading = false;
      }
    });
  }

  save() {
    const payload = {
    Id: this.form.id,
    Name: this.form.name,
    Description: this.form.description,
    AddressLine: this.form.addressLine,
    City: this.form.city,
    State: this.form.state,
    PostalCode: this.form.postalCode,
    Latitude: this.form.latitude,
    Longitude: this.form.longitude
  };

    console.log("FORM BEFORE SEND:", this.form);
    this.service.updateMess(this.form.id, payload).subscribe({
      next: (res: any) => {
        this.toastr.success(res?.message || "Mess updated successfully");
        this.router.navigate(['/owner/mess']);
      },
      error: (err: any) => {
        this.toastr.error(err?.error?.message || "Update failed");
      }
    });
  }

  cancel() {
    this.router.navigate(['/owner/mess']);
  }
}
