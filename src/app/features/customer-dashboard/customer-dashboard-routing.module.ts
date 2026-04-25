import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DeliveriesComponent } from './pages/deliveries/deliveries.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BrowseMessComponent } from './pages/browse-mess/browse-mess.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerDashboardComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'deliveries', component: DeliveriesComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'subscription', component: SubscriptionComponent },
      { path: 'browse-mess', component: BrowseMessComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDashboardRoutingModule { }
