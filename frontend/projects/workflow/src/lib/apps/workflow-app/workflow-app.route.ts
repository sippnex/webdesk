import { Routes } from '@angular/router';
import {NewWorkflowComponent} from "./new-workflow/new-workflow.component";
import {WorkflowItemListComponent} from "./workflow-item-list/workflow-item-list.component";
import {WorkflowItemDetailComponent} from "./workflow-item-detail/workflow-item-detail.component";

export const workflowAppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: WorkflowItemListComponent,
  },
  {
    path: 'detail/:workflowId',
    component: WorkflowItemDetailComponent,
  },
  {
    path: 'new',
    component: NewWorkflowComponent,
  },
];
