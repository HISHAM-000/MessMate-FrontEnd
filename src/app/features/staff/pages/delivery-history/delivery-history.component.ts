import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery-history',
  templateUrl: './delivery-history.component.html',
  styleUrls: ['./delivery-history.component.css']
})
export class DeliveryHistoryComponent implements OnInit {

  deliveries: any[] = [];
  isLoading = false;
  selectedDate: string = '';

  constructor(
    private deliveryService: DeliveryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory() {
    this.isLoading = true;

    this.deliveryService.getHistory().subscribe({
      next: (res: any) => {
        this.deliveries = res.data || [];
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to load delivery history');
        this.isLoading = false;
      }
    });
  }

  // Optional filter (frontend)
  get filteredDeliveries() {
    if (!this.selectedDate) return this.deliveries;

    return this.deliveries.filter(d =>
      d.orderDate?.startsWith(this.selectedDate)
    );
  }
}