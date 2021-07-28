import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkflowAdminAppModule} from "./admin-apps/workflow-admin-app/workflow-admin-app.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    WorkflowAdminAppModule,
  ]
})
export class WorkflowAdminModule {
}
