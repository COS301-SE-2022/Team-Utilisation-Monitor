import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCompanyViewComponent } from './admin-company-view/admin-company-view.component';
import { AdminListViewComponent } from './admin-list-view/admin-list-view.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminTeamProjectViewComponent } from './admin-team-project-view/admin-team-project-view.component';
import { CompGraphCompanyUtilizationComponent } from './comp-graph-company-utilization/comp-graph-company-utilization.component';

const routes: Routes = [
  {
    path: 'AdminHome',
    component: AdminHomePageComponent,
  },
  {
    path: 'AdminCompanyView',
    component: AdminCompanyViewComponent,
  },
  {
    path: 'AdminListView',
    component: AdminListViewComponent,
  },
  {
    path: 'AdminTeamProjectView',
    component: AdminTeamProjectViewComponent,
  },
  {
    path: 'CompGraphCompanyUtilization',
    component: CompGraphCompanyUtilizationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AdminRoutingModule {}
