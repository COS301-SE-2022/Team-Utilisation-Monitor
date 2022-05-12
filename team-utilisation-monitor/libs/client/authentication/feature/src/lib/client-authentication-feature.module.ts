import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupAsComponent } from './signup-as/signup-as.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       {path: 'login_page', pathMatch: 'full', component:LoginComponent},
       {path: 'signup_page', pathMatch: 'full', component:SignupComponent},
       {path: 'signup_as_page', pathMatch: 'full', component:SignupAsComponent}
    ]),
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupAsComponent
  ],
})
export class ClientAuthenticationFeatureModule {}
