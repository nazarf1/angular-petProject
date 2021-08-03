import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDasboardComponent } from './employee-dasboard/employee-dasboard.component';
import { NotFoundComponent } from './not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  {
    path: 'Dashboard',
    component: EmployeeDasboardComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'Login',
    component: LoginPageComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: 'Dashboard/detail/:id',
    component: DetailsComponent,
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
