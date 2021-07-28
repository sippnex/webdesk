import {Routes} from '@angular/router';
import {UnsavedChangesGuard} from "@webdesk/core";
import {AdminWorkflowListComponent} from "./admin-workflow-list/admin-workflow-list.component";
import {AdminWorkflowDetailComponent} from "./admin-workflow-detail/admin-workflow-detail.component";
import {AdminWorkflowTransitionDetailComponent} from "./admin-workflow-detail/admin-workflow-transition-detail/admin-workflow-transition-detail.component";
import {AdminWorkflowActionDetailComponent} from "./admin-workflow-detail/admin-workflow-action-detail/admin-workflow-action-detail.component";
import {AdminWorkflowActionAttributeMappingDetailComponent} from "./admin-workflow-detail/admin-workflow-action-detail/admin-workflow-action-attribute-mapping-detail/admin-workflow-action-attribute-mapping-detail.component";
import {AdminWorkflowFormElementDetailComponent} from "./admin-workflow-detail/admin-workflow-form-element-detail/admin-workflow-form-element-detail.component";
import {AdminWorkflowNodeDetailComponent} from "./admin-workflow-detail/admin-workflow-node-detail/admin-workflow-node-detail.component";

export const workflowAdminAppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'workflows',
    pathMatch: 'full'
  },
  {
    path: 'workflows',
    component: AdminWorkflowListComponent,
  },
  {
    path: 'workflows/:workflowId',
    component: AdminWorkflowDetailComponent
  },
  {
    path: 'workflows/:workflowId/nodes/:nodeId',
    component: AdminWorkflowNodeDetailComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'workflows/:workflowId/transition/:transitionId',
    component: AdminWorkflowTransitionDetailComponent
  },
  {
    path: 'workflows/:workflowId/transition/:transitionId/action/:workflowActionId',
    component: AdminWorkflowActionDetailComponent
  },
  {
    path: 'workflows/:workflowId/transition/:transitionId/action/:workflowActionId/:workflowActionAttributeMappingType/:workflowActionAttributeMappingId',
    component: AdminWorkflowActionAttributeMappingDetailComponent
  },
  {
    path: 'workflows/:workflowId/form-element',
    component: AdminWorkflowFormElementDetailComponent
  },
  {
    path: 'workflows/:workflowId/form-element/:formElementId',
    component: AdminWorkflowFormElementDetailComponent
  },
];
