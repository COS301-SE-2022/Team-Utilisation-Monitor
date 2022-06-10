import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
      import('@team-utilisation-monitor/client/shared/feature').then(
        (x) => x.ClientSharedFeatureModule
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
