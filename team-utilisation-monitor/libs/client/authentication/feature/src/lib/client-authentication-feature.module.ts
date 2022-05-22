import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupAsComponent } from './signup-as/signup-as.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupAsCompanyComponent } from './signup-as-company/signup-as-company.component';
import { SignupAsIndividualComponent } from './signup-as-individual/signup-as-individual.component';
import { SignupAsTeamComponent } from './signup-as-team/signup-as-team.component';
import { AuthenticationRoutingModule } from './auth-routing.module';
import { AuthenticationService } from './Authentication.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,MatToolbarModule,

    RouterModule.forChild([
       /*{path: 'login_page', pathMatch: 'full', component:LoginComponent},
    */]),
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupAsComponent,
    HomePageComponent,
    SignupAsCompanyComponent,
    SignupAsIndividualComponent,
    SignupAsTeamComponent
  ],
  exports:[AuthenticationRoutingModule]
})
export class ClientAuthenticationFeatureModule {
  //private service:AuthenticationService){
    //console.log(service.addCompany());
    //console.log(service.getUserName());
}
