import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@team-utilisation-monitor/client/example/feature').then(
        (x) => x.ClientExampleFeatureModule
      ),
  },
/*
  {
    path: 'Login',
    loadChildren: () =>
      import('@team-utilisation-monitor/client/Authentication/feature').then(
        (x) => x.ClientAuthenticationFeatureModule
      ),
  },*/
]
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
  })
export class AppRoutingModule { }
