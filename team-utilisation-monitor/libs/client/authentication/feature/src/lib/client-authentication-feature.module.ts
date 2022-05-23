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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ExampleComponent } from './example/example.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatProgressBarModule,

    RouterModule.forChild([
      /*{path: 'login_page', pathMatch: 'full', component:LoginComponent},
       */
    ]),
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupAsComponent,
    HomePageComponent,
    SignupAsCompanyComponent,
    SignupAsIndividualComponent,
    SignupAsTeamComponent,
    ExampleComponent,
  ],
  exports: [AuthenticationRoutingModule],
})
export class ClientAuthenticationFeatureModule {
  //private service:AuthenticationService){
  //console.log(service.addCompany());
  //console.log(service.getUserName());
  //
}
