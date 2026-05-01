import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessOwnerRoutingModule } from './mess-owner-routing.module';
import { MessOwnerComponent } from './mess-owner/mess-owner.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { StatusCardComponent } from './components/status-card/status-card.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResubmitApplicationComponent } from './pages/resubmit-application/resubmit-application.component';
import { MessDetailsComponent } from './pages/mess-details/mess-details.component';
import { MessFormComponent } from './pages/mess-form/mess-form.component';
import { StaffComponent } from './pages/staff/staff.component';
import { AssignDeliveryComponent } from './pages/assign-delivery/assign-delivery.component';
import { PlansComponent } from './pages/plans/plans.component';
import { PlanFormComponent } from './pages/plan-form/plan-form.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuDayComponent } from './pages/menu-day/menu-day.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MessOwnerComponent,
    SidebarComponent,
    TopbarComponent,
    SummaryCardsComponent,
    StatusCardComponent,
    EmptyStateComponent,
    DashboardComponent,
    ResubmitApplicationComponent,
    MessDetailsComponent,
    MessFormComponent,
    StaffComponent,
    AssignDeliveryComponent,
    PlansComponent,
    PlanFormComponent,
    MenuComponent,
    MenuDayComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    MessOwnerRoutingModule,
    FormsModule
  ]
})
export class MessOwnerModule { }
