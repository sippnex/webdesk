import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuickActionsWidgetModule} from "./widgets/quick-actions-widget/quick-actions-widget.module";
import {WorkflowOverviewWidgetModule} from "./widgets/workflow-overview-widget/workflow-overview-widget.module";
import {WorkflowInstanceAppModule} from "./apps/workflow-instance-app/workflow-instance-app.module";
import {WorkflowAppModule} from "./apps/workflow-app/workflow-app.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WorkflowAppModule,
    WorkflowInstanceAppModule,
    QuickActionsWidgetModule,
    WorkflowOverviewWidgetModule,
  ]
})
export class WorkflowModule { }
