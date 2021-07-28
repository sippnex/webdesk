import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkflowOverviewWidgetComponent} from "./workflow-overview-widget.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {WidgetService} from "@webdesk/core";

@NgModule({
  declarations: [
    WorkflowOverviewWidgetComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
  ]
})
export class WorkflowOverviewWidgetModule {
  constructor(private widgetService: WidgetService) {
    this.widgetService.registerWidget('WorkflowOverviewWidget', WorkflowOverviewWidgetComponent);
  }
}
