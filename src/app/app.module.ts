import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-highcharts';

import * as AnnotationsModule from 'highcharts/modules/annotations';

import * as Highcharts from 'highcharts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

AnnotationsModule(Highcharts);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule.forRoot(Highcharts)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    AnnotationsModule(Highcharts);
  }

 }
