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

]
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
  })
export class AppRoutingModule { }
