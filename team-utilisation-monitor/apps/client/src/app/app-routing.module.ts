import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'example',
    loadChildren: () =>
      import('@team-utilisation-monitor/client/example/feature').then(
        (x) => x.ClientExampleFeatureModule
      ),
  },
]
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
  })
export class AppRoutingModule { }
