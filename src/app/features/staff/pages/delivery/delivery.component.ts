import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  orderId!: number;
  otp: string = '';

  deliveries: any[] = [];
  isLoading = true;

  constructor(
    private deliveryService: DeliveryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadHistory();
  }

  // 🔹 Load delivery history
  loadHistory() {
    this.deliveryService.getHistory().subscribe({
      next: (res: any) => {
        this.deliveries = res.data || res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Failed to load history");
        this.isLoading = false;
      }
    });
  }

  // 🔹 Confirm delivery using OTP
  confirmDelivery() {

    if (!this.orderId || !this.otp) {
      this.toastr.warning("Enter Order ID and OTP");
      return;
    }

    console.log("CONFIRM:", this.orderId, this.otp);

    this.deliveryService.confirmDelivery(this.orderId, this.otp).subscribe({
      next: () => {
        this.toastr.success("Delivery confirmed");

        // reset inputs
        this.orderId = 0;
        this.otp = '';

        // reload history
        this.loadHistory();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Invalid OTP or failed");
      }
    });
  }
}