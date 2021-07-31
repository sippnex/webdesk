import { Routes } from '@angular/router';
import {UnsavedChangesGuard} from "@webdesk/core";
import {WorkflowInstanceListComponent} from "./workflow-instance-list/workflow-instance-list.component";
import {WorkflowInstanceDetailComponent} from "./workflow-instance-detail/workflow-instance-detail.component";

export const workflowInstanceAppRoutes: Routes = [
  {
    path: '',
    component: WorkflowInstanceListComponent,
  },
  {
    path: ':workflowInstanceId',
    component: WorkflowInstanceDetailComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
];
