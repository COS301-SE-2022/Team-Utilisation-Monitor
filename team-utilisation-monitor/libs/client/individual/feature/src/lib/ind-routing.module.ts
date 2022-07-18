import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndividualHomePageComponent} from "./individual-home-page/individual-home-page.component";
import {ClientIndividualServiceService} from "./client-individual-service/client-individual-service.service";
import {IndividualProfileComponent} from "./individual-profile/individual-profile.component";
import {UtilizationGraphComponent} from "./utilization-graph/utilization-graph.component";
import {WeeklyUtilisationGraphComponent} from "./weekly-utilisation-graph/weekly-utilisation-graph.component";
import { IndividualExplorePageComponent} from "./individual-explore-page/individual-explore-page.component";

const routes: Routes = [
  /*{
    path: '',
    component: IndividualHomePageComponent,
  },*/
  {
    path: 'individual_home_page',
    component: IndividualHomePageComponent,
  },
  {
    path: 'individual_profile_page',
    component: IndividualProfileComponent,
  },
  {
    path: 'utilization_graph',
    component: UtilizationGraphComponent,
  },
  {
    path: 'weekly_utilization_graph',
    component: WeeklyUtilisationGraphComponent,
  },
  {
    path: 'individual_explore_page',
    component:  IndividualExplorePageComponent,
  },
  {
    path: '**',
    redirectTo: 'login_page',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ClientIndividualServiceService],
})
export class IndividualRoutingModule {}
