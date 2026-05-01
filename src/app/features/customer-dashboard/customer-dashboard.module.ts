import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DeliveriesComponent } from './pages/deliveries/deliveries.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { TodayMealComponent } from './components/today-meal/today-meal.component';
import { RecentOrderComponent } from './components/recent-order/recent-order.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { BrowseMessComponent } from './pages/browse-mess/browse-mess.component';
import { MessDetailComponent } from './pages/mess-detail/mess-detail.component';
import { PlanDetailComponent } from './pages/plan-detail/plan-detail.component';


@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    DashboardComponent,
    SubscriptionComponent,
    OrdersComponent,
    DeliveriesComponent,
    PaymentsComponent,
    ProfileComponent,
    SummaryCardsComponent,
    TodayMealComponent,
    RecentOrderComponent,
    CustomerDashboardComponent,
    BrowseMessComponent,
    MessDetailComponent,
    PlanDetailComponent
  ],
  imports: [
    CommonModule,
    CustomerDashboardRoutingModule,
    FormsModule
  ]
})
export class CustomerDashboardModule { }
