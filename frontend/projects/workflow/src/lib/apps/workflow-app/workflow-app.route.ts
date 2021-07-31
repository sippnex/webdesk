import {Routes} from '@angular/router';
import {UnsavedChangesGuard} from "@webdesk/core";
import {WorkflowNodeDetailComponent} from "./workflow-detail/workflow-node-detail/workflow-node-detail.component";
import {WorkflowTransitionDetailComponent} from "./workflow-detail/workflow-transition-detail/workflow-transition-detail.component";
import {WorkflowActionDetailComponent} from "./workflow-detail/workflow-action-detail/workflow-action-detail.component";
import {WorkflowActionAttributeMappingDetailComponent} from "./workflow-detail/workflow-action-detail/workflow-action-attribute-mapping-detail/workflow-action-attribute-mapping-detail.component";
import {WorkflowFormElementDetailComponent} from "./workflow-detail/workflow-form-element-detail/workflow-form-element-detail.component";
import {WorkflowListComponent} from "./workflow-list/workflow-list.component";
import {WorkflowDetailComponent} from "./workflow-detail/workflow-detail.component";

export const workflowAppRoutes: Routes = [
  {
    path: '',
    component: WorkflowListComponent,
  },
  {
    path: ':workflowId',
    component: WorkflowDetailComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: ':workflowId/nodes/:nodeId',
    component: WorkflowNodeDetailComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: ':workflowId/transition/:transitionId',
    component: WorkflowTransitionDetailComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: ':workflowId/transition/:transitionId/action/:workflowActionId',
    component: WorkflowActionDetailComponent
  },
  {
    path: ':workflowId/transition/:transitionId/action/:workflowActionId/:workflowActionAttributeMappingType/:workflowActionAttributeMappingId',
    component: WorkflowActionAttributeMappingDetailComponent
  },
  {
    path: ':workflowId/form-element',
    component: WorkflowFormElementDetailComponent
  },
  {
    path: ':workflowId/form-element/:formElementId',
    component: WorkflowFormElementDetailComponent
  },
];
