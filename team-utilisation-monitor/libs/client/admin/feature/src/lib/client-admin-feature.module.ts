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

@NgModule({
  imports: [
    CommonModule,
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
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatBadgeModule,
    RouterModule.forChild([]),
  ],

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
  ],
  exports: [AdminRoutingModule],
})
export class ClientAdminFeatureModule {}
