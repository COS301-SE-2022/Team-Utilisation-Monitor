import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndividualHomePageComponent } from './individual-home-page/individual-home-page.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    IndividualHomePageComponent
  ],
})
export class ClientIndividualFeatureModule {}
