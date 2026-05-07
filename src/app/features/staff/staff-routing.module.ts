import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffLayoutComponent } from './layout/staff-layout/staff-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DeliveryHistoryComponent } from './pages/delivery-history/delivery-history.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: StaffLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'orders', component: OrdersComponent },
      { path: 'history', component: DeliveryHistoryComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
