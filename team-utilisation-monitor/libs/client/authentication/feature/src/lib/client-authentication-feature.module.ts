import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupAsComponent } from './signup-as/signup-as.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthenticationRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       /*{path: 'login_page', pathMatch: 'full', component:LoginComponent},
    */]),
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupAsComponent,
    HomePageComponent
  ],
  exports:[AuthenticationRoutingModule]
})
export class ClientAuthenticationFeatureModule {}
