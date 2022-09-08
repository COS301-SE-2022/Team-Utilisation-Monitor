import { CookieService } from 'ngx-cookie-service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminListViewComponent } from './admin-list-view/admin-list-view.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminCompanyViewComponent } from './admin-company-view/admin-company-view.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CompOwnerIndividualComponent } from './comp-owner-individual/comp-owner-individual.component';
import { CompEmployeeIndividualComponent } from './comp-employee-individual/comp-employee-individual.component';
import { CompNavbarComponent } from './comp-navbar/comp-navbar.component';
import { CompAdminTopnavComponent } from './comp-admin-topnav/comp-admin-topnav.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { CompNavRequestUsersComponent } from './comp-nav-request-users/comp-nav-request-users.component';
import { CompListViewIndividualComponent } from './comp-list-view-individual/comp-list-view-individual.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CompAddUserPopupComponent } from './comp-add-user-popup/comp-add-user-popup.component';
import { CompCreateTeamPopupComponent } from './comp-create-team-popup/comp-create-team-popup.component';
import { CompCreateProjectPopupComponent } from './comp-create-project-popup/comp-create-project-popup.component';
import { AdminTeamProjectViewComponent } from './admin-team-project-view/admin-team-project-view.component';
import { CompTeamListComponent } from './comp-team-list/comp-team-list.component';
import { CompProjectListComponent } from './comp-project-list/comp-project-list.component';
import { CompAddTeamMemberPopupComponent } from './comp-add-team-member-popup/comp-add-team-member-popup.component';
import { CompGraphCompanyUtilizationComponent } from './comp-graph-company-utilization/comp-graph-company-utilization.component';
import { NgChartsModule } from "ng2-charts";
import { CompAddSkillsPopupComponent } from './comp-add-skills-popup/comp-add-skills-popup.component';
import {MatListModule} from '@angular/material/list';
import { CompAddTeamToProjectPopupComponent } from './comp-add-team-to-project-popup/comp-add-team-to-project-popup.component';
import { CompTeamIndividualComponent } from './comp-team-individual/comp-team-individual.component';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CompProjectDataViewPopupComponent } from './comp-project-data-view-popup/comp-project-data-view-popup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CompAddPositionsPopupComponent } from './comp-add-positions-popup/comp-add-positions-popup.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatCommonModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    NgChartsModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    RouterModule.forChild([]),
  ],
  providers: [CookieService],
  declarations: [
    AdminListViewComponent,
    AdminHomePageComponent,
    AdminCompanyViewComponent,
    CompOwnerIndividualComponent,
    CompEmployeeIndividualComponent,
    CompNavbarComponent,
    CompAdminTopnavComponent,
    CompNavRequestUsersComponent,
    CompListViewIndividualComponent,
    CompAddUserPopupComponent,
    CompCreateTeamPopupComponent,
    CompCreateProjectPopupComponent,
    AdminTeamProjectViewComponent,
    CompTeamListComponent,
    CompProjectListComponent,
    CompAddTeamMemberPopupComponent,
    CompGraphCompanyUtilizationComponent,
    CompAddSkillsPopupComponent,
    CompAddTeamToProjectPopupComponent,
    CompTeamIndividualComponent,
    CompProjectDataViewPopupComponent,
    CompAddPositionsPopupComponent,
  ],
  exports: [
    AdminRoutingModule,
    CompNavbarComponent,
    CompNavbarComponent,
    CompAdminTopnavComponent,
    CompAdminTopnavComponent,
    CompAdminTopnavComponent,
  ],
})
export class ClientAdminFeatureModule {}
