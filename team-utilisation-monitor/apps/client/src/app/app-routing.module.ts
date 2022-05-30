import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  IndividualHomePageComponent
} from "../../../../libs/client/individual/feature/src/lib/individual-home-page/individual-home-page.component";
import {ClientIndividualFeatureModule} from "@team-utilisation-monitor/client/individual/feature";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@team-utilisation-monitor/client/authentication/feature').then(
        (x) => x.ClientAuthenticationFeatureModule
      ),
  },
  {

    path: '',
    loadChildren: () =>
      import('@team-utilisation-monitor/client/admin/feature').then(
        (x) => x.ClientAdminFeatureModule
      ),
  },

  {

    path: '',
    loadChildren: () =>
      import('@team-utilisation-monitor/client/individual/feature').then(
        (x) => x.ClientIndividualFeatureModule
      ),
  },

]
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
  })
export class AppRoutingModule { }
