import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { PendingMessComponent } from './mess/pages/pending-mess/pending-mess.component';
import { ApprovedMessComponent } from './mess/pages/approved-mess/approved-mess.component';
import { MessDetailsComponent } from './mess/pages/mess-details/mess-details.component';
import { MessCardComponent } from './mess/components/mess-card/mess-card.component';
import { ApprovalActionsComponent } from './mess/components/approval-actions/approval-actions.component';
import { OwnerListComponent } from './owners/pages/owner-list/owner-list.component';
import { OwnerDetailsComponent } from './owners/pages/owner-details/owner-details.component';
import { OwnerCardComponent } from './owners/components/owner-card/owner-card.component';
import { RejectOwnerModalComponent } from './owners/components/reject-owner-modal/reject-owner-modal.component';
import { StaffListComponent } from './staff/pages/staff-list/staff-list.component';
import { StaffDetailsComponent } from './staff/pages/staff-details/staff-details.component';
import { StaffCardComponent } from './staff/components/staff-card/staff-card.component';
import { DeliveryHistoryComponent } from './staff/components/delivery-history/delivery-history.component';
import { OrderListComponent } from './orders/pages/order-list/order-list.component';
import { OrderDetailsComponent } from './orders/pages/order-details/order-details.component';
import { OrderTableComponent } from './orders/components/order-table/order-table.component';
import { OrderStatusBadgeComponent } from './orders/components/order-status-badge/order-status-badge.component';
import { StaffInfoComponent } from './orders/components/staff-info/staff-info.component';
import { UserListComponent } from './users/pages/user-list/user-list.component';
import { UserTableComponent } from './users/components/user-table/user-table.component';
import { RoleFilterComponent } from './users/components/role-filter/role-filter.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    PendingMessComponent,
    ApprovedMessComponent,
    MessDetailsComponent,
    MessCardComponent,
    ApprovalActionsComponent,
    OwnerListComponent,
    OwnerDetailsComponent,
    OwnerCardComponent,
    RejectOwnerModalComponent,
    StaffListComponent,
    StaffDetailsComponent,
    StaffCardComponent,
    DeliveryHistoryComponent,
    OrderListComponent,
    OrderDetailsComponent,
    OrderTableComponent,
    OrderStatusBadgeComponent,
    StaffInfoComponent,
    UserListComponent,
    UserTableComponent,
    RoleFilterComponent,
    AdminLayoutComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
