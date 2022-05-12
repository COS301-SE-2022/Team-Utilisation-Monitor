import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       {path: 'login_page', pathMatch: 'full', component:LoginComponent},
       {path: 'signup_page', pathMatch: 'full', component:SignupComponent}
    ]),
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
})
export class ClientAuthenticationFeatureModule {}
