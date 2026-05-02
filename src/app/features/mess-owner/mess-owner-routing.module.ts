import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessOwnerComponent } from './mess-owner/mess-owner.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MessDetailsComponent } from './pages/mess-details/mess-details.component';
import { MessFormComponent } from './pages/mess-form/mess-form.component';
import { StaffComponent } from './pages/staff/staff.component';
import { PlansComponent } from './pages/plans/plans.component';
import { PlanFormComponent } from './pages/plan-form/plan-form.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuDayComponent } from './pages/menu-day/menu-day.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ResubmitApplicationComponent } from './pages/resubmit-application/resubmit-application.component';

const routes: Routes = [
  {
    path: '',
    component: MessOwnerComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'mess', component: MessDetailsComponent },
      { path: 'mess-form', component: MessFormComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'plans', component: PlansComponent },
      { path: 'plan-form', component: PlanFormComponent },
      { path: 'plan-form/:id', component: PlanFormComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'menu-day/:day', component: MenuDayComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'resubmit', component: ResubmitApplicationComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessOwnerRoutingModule { }
