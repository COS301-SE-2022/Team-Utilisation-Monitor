import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
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
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatCommonModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
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
  //constructor(private service:AuthenticationService){
    //console.log(service.addCompany());
    //console.log(service.getUserName());
  //}
}
