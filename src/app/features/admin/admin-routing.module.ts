import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { PendingMessComponent } from './mess/pages/pending-mess/pending-mess.component';
import { ApprovedMessComponent } from './mess/pages/approved-mess/approved-mess.component';
import { OwnerListComponent } from './owners/pages/owner-list/owner-list.component';
import { StaffListComponent } from './staff/pages/staff-list/staff-list.component';
import { OrderListComponent } from './orders/pages/order-list/order-list.component';
import { UserListComponent } from './users/pages/user-list/user-list.component';
import { MessDetailsComponent } from './mess/pages/mess-details/mess-details.component';
import { StaffDetailsComponent } from './staff/pages/staff-details/staff-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,   // 🔥 WRAPPER
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'mess/pending', component: PendingMessComponent },
      { path: 'mess/approved', component: ApprovedMessComponent },
      { path: 'owners', component: OwnerListComponent },
      { path: 'staff', component: StaffListComponent },
      { path: 'staff/:id', component: StaffDetailsComponent },
      { path: 'staff/:messId/:staffId', component: StaffDetailsComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'users', component: UserListComponent },
      { path: 'mess/:id', component: MessDetailsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
