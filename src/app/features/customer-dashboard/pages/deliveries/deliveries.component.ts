import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  deliveries: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries() {
    this.orderService.getMyOrders().subscribe({
      next: (res: any) => {

        this.deliveries = res.data.filter((order: any) =>
          order.status === 'OutForDelivery' ||
          order.status === 'Preparing'
        );

      },
      error: (err) => console.error(err)
    });
  }
}