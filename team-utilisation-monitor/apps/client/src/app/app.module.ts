import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin'
import { IncreaseNumberOfEmployeesState } from '@team-utilisation-monitor/client/admin/feature';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [FormsModule,
    HttpClientModule,
    BrowserModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,

    NgxsModule.forRoot([
      IncreaseNumberOfEmployeesState,
    ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
