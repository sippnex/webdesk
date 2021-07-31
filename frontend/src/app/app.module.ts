import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {CoreModule} from "@webdesk/core";
import {WorkflowModule} from "@webdesk/workflow";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    CoreModule,
    WorkflowModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
