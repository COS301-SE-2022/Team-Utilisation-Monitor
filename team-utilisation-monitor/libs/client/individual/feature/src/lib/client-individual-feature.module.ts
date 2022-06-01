import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndividualHomePageComponent } from './individual-home-page/individual-home-page.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import { Router } from '@angular/router';
import {IndividualRoutingModule} from "./ind-routing.module";

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  declarations: [
    IndividualHomePageComponent
  ],
  exports: [IndividualRoutingModule],
})
export class ClientIndividualFeatureModule {}
