import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffLayoutComponent } from './layout/staff-layout/staff-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/menu/menu.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { UsersComponent } from './pages/users/users.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StaffLayoutComponent,
    DashboardComponent,
    MenuComponent,
    OrdersComponent,
    OrderDetailComponent,
    SubscriptionsComponent,
    UsersComponent,
    DeliveryComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    FormsModule
  ]
})
export class StaffModule { }
