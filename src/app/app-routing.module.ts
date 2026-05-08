import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'customer', loadChildren: () => import('./features/customer-dashboard/customer-dashboard.module').then(m => m.CustomerDashboardModule) },
  { path: '', loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule), pathMatch: 'full' },
  { path: 'owner',loadChildren: () =>import('./features/mess-owner/mess-owner.module').then(m => m.MessOwnerModule)}  ,
  {
  path: 'staff',
  loadChildren: () =>
    import('./features/staff/staff.module').then(m => m.StaffModule)
},
{
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
