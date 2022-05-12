import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupAsComponent } from './signup-as/signup-as.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       {path: 'login_page', pathMatch: 'full', component:LoginComponent},
       {path: 'signup_page', pathMatch: 'full', component:SignupComponent},
       {path: 'signup_as_page', pathMatch: 'full', component:SignupAsComponent},
       {path: 'home_page', pathMatch: 'full', component:HomePageComponent}
    ]),
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupAsComponent,
    HomePageComponent
  ],
})
export class ClientAuthenticationFeatureModule {}
