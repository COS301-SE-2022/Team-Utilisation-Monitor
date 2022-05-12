import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditPopupComponent } from './edit-popup/edit-popup.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: EditPopupComponent}
    ]),
  ],
  declarations: [
    EditPopupComponent
  ],
})
export class ClientExampleFeatureModule {}
