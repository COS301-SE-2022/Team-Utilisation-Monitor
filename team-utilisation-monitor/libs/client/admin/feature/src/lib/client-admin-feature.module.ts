import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminListViewComponent } from './admin-list-view/admin-list-view.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminCompanyViewComponent } from './admin-company-view/admin-company-view.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    AdminListViewComponent,
    AdminHomePageComponent,
    AdminCompanyViewComponent,
  ],
})
export class ClientAdminFeatureModule {}
