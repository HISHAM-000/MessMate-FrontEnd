import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'customer', loadChildren: () => import('./features/customer-dashboard/customer-dashboard.module').then(m => m.CustomerDashboardModule) },
  { path: '', loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule), pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
