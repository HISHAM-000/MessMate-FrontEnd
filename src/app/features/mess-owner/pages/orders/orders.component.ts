import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService : OrderService){}

  ngOnInit(){
    const today = new Date().toISOString().split('T')[0]; 
    this.loadOrders(today);
  }

  loadOrders(date : string){
    this.orderService.getOrders(date).subscribe({
      next: (res : any)=>{
        this.orders = res.data || res;
        console.log(this.orders);
      },
      error: (err: any) => {
      console.error(err);
    }
    })
  }
}
