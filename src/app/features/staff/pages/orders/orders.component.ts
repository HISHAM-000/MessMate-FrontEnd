import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { DeliveryService } from '../../services/delivery.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  selectedDate: string = '';
  isLoading = false;
  loadingOrderId: number | null = null;

  // ✅ Status list
  statusList = [
    { value: 1, label: 'Pending' },
    { value: 2, label: 'Preparing' },
    { value: 3, label: 'OutForDelivery' },
    { value: 4, label: 'Delivered' },
    { value: 5, label: 'Cancelled' },
    { value: 6, label: 'Skipped' }
  ];

  // 🔐 OTP modal state
  showOtpModal = false;
  selectedOrder: any = null;
  enteredOtp: string = '';

  constructor(
    private orderService: OrderService,
    private deliveryService: DeliveryService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.setToday();
    this.loadOrders();
  }

  // 📅 Set today's date
  setToday() {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
  }

  // 📦 Load orders
  loadOrders() {
    this.isLoading = true;

    this.orderService.getMessOrders(this.selectedDate)
      .subscribe({
        next: (res: any) => {
          this.orders = res.data || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
  }

  // 🔁 Status mapping
  getStatusText(status: number): string {
    return this.statusList.find(s => s.value === status)?.label || 'Unknown';
  }

  // 🔄 Handle dropdown change
  onStatusChange(order: any, event: any) {
    const newStatus = Number(event.target.value);

    // 🚨 If Delivered → require OTP
    if (newStatus === 3) {
      this.selectedOrder = order;
      this.showOtpModal = true;

      // reset dropdown UI
      event.target.value = order.status;
      return;
    }

    const previousStatus = order.status;
    this.loadingOrderId = order.id;

    // optimistic update
    order.status = newStatus;

    this.orderService.updateStatus(order.id, newStatus)
  .subscribe({
    next: () => {
      this.loadingOrderId = null;
      this.toastr.success('Status updated successfully');
    },
    error: () => {
      order.status = previousStatus;
      this.loadingOrderId = null;
      this.toastr.error('Failed to update status');
    }
  });
  }

  // 🔐 Confirm OTP
  confirmOtp() {
    if (!this.enteredOtp || !this.selectedOrder) return;

    this.loadingOrderId = this.selectedOrder.id;

   this.deliveryService.confirmDelivery(
  this.selectedOrder.id,
  this.enteredOtp
).subscribe({
  next: () => {
    this.selectedOrder.status = 3;
    this.toastr.success('Delivery confirmed');
    this.closeOtpModal();
  },
  error: () => {
    this.toastr.error('Invalid OTP');
  }
});
  }

  // ❌ Close modal
  closeOtpModal() {
    this.showOtpModal = false;
    this.selectedOrder = null;
    this.enteredOtp = '';
    this.loadingOrderId = null;
  }
}