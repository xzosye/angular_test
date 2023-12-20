import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ManagerComponent } from './manager/manager.component';
import { UserComponent } from './user/user.component';
import { PerformanceComponent } from './performance/performance.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'performance', component: PerformanceComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard], // Make sure AuthGuard is used here
    data: { position: 'admin' }, // Set the required position for this route
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthGuard], // Make sure AuthGuard is used here
    data: { position: 'manager' }, // Set the required position for this route
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard], // Make sure AuthGuard is used here
    data: { position: 'user' }, // Set the required position for this route
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
