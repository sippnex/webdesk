import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkflowAppModule} from "./apps/workflow-app/workflow-app.module";
import {QuickActionsWidgetModule} from "./widgets/quick-actions-widget/quick-actions-widget.module";
import {WorkflowOverviewWidgetModule} from "./widgets/workflow-overview-widget/workflow-overview-widget.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WorkflowAppModule,
    QuickActionsWidgetModule,
    WorkflowOverviewWidgetModule,
  ]
})
export class WorkflowModule { }
