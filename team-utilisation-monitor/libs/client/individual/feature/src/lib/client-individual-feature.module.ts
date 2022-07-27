import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndividualHomePageComponent } from './individual-home-page/individual-home-page.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormGroup} from "@angular/forms";
import { FormsModule} from '@angular/forms';

import { Router } from '@angular/router';
import {IndividualRoutingModule} from "./ind-routing.module";
import { IndividualProfileComponent } from './individual-profile/individual-profile.component';

//import { DashboardComponent } from './dashboard/dashboard.component';
import {ClientAdminFeatureModule} from "@team-utilisation-monitor/client/admin/feature";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import { CompSidenavComponent } from './comp-sidenav/comp-sidenav.component';
import { UtilizationGraphComponent } from './utilization-graph/utilization-graph.component';
import { WeeklyUtilisationGraphComponent } from './weekly-utilisation-graph/weekly-utilisation-graph.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {NgChartsModule} from "ng2-charts";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTabsModule} from "@angular/material/tabs";
import { IndividualExplorePageComponent } from './individual-explore-page/individual-explore-page.component';
import {MatChipsModule} from "@angular/material/chips";

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
        ClientAdminFeatureModule,
        MatGridListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatListModule,
        MatExpansionModule,
        NgChartsModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatChipsModule,
      MatCheckboxModule,
      FormsModule
    ],
  declarations: [
    IndividualHomePageComponent,
    IndividualProfileComponent,
    CompSidenavComponent,
    UtilizationGraphComponent,
    WeeklyUtilisationGraphComponent,
    IndividualExplorePageComponent
  ],
  exports:
  [IndividualRoutingModule],
})
export class ClientIndividualFeatureModule {}
