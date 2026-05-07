import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { StaffLayoutComponent } from './layout/staff-layout/staff-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { OrderCardComponent } from './pages/order-card/order-card.component';
import { OtpModalComponent } from './pages/otp-modal/otp-modal.component';
import { DeliveryHistoryComponent } from './pages/delivery-history/delivery-history.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { OrdersComponent } from './pages/orders/orders.component';


@NgModule({
  declarations: [
    StaffLayoutComponent,
    DashboardComponent,
    OrderCardComponent,
    OtpModalComponent,
    DeliveryHistoryComponent,
    ProfileComponent,
    SideBarComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    FormsModule
  ]
})
export class StaffModule { }
