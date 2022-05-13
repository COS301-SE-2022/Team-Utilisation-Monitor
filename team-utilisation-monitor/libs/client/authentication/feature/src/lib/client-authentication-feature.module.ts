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

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       {path: 'login_page', pathMatch: 'full', component:LoginComponent},
       {path: 'signup_page', pathMatch: 'full', component:SignupComponent},
       {path: 'signup_as_page', pathMatch: 'full', component:SignupAsComponent},
       {path: 'home_page', pathMatch: 'full', component:HomePageComponent},
       {path: 'signup_as_company_page', pathMatch: 'full', component:SignupAsCompanyComponent},
       {path: 'signup_as_company_individual_page', pathMatch: 'full', component:SignupAsIndividualComponent},
       {path: 'signup_as_company_team_page', pathMatch: 'full', component:SignupAsTeamComponent}
    ]),
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
})
export class ClientAuthenticationFeatureModule {}
