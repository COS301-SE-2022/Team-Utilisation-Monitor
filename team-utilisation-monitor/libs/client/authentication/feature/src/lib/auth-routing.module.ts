import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupAsComponent } from './signup-as/signup-as.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home_page',
    component: HomePageComponent
  },
  {
    path: 'signup_as_page',
    component: SignupAsComponent
  },
  {
    path: 'signup_page',
    component: SignupComponent
  },
  {
    path: 'signup_as_company_page',
    component: SignupComponent
  },
  {
    path: 'signup_as_team_page',
    component: SignupComponent
  },
  {
    path: 'signup_as_individual_page',
    component: SignupComponent
  },
  {
    path: '**',
    redirectTo: 'login_page'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}