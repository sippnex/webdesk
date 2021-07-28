import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppService, SharedModule} from "@webdesk/core";
import {workflowAdminAppRoutes} from "./workflow-admin-app.route";
import {AdminWorkflowListComponent} from "./admin-workflow-list/admin-workflow-list.component";
import {AdminWorkflowDetailComponent} from "./admin-workflow-detail/admin-workflow-detail.component";
import {AdminWorkflowActionDetailComponent} from "./admin-workflow-detail/admin-workflow-action-detail/admin-workflow-action-detail.component";
import {AdminWorkflowNodeDetailComponent} from "./admin-workflow-detail/admin-workflow-node-detail/admin-workflow-node-detail.component";
import {AdminWorkflowTransitionDetailComponent} from "./admin-workflow-detail/admin-workflow-transition-detail/admin-workflow-transition-detail.component";
import {AdminWorkflowFormElementDetailComponent} from "./admin-workflow-detail/admin-workflow-form-element-detail/admin-workflow-form-element-detail.component";
import {AdminWorkflowActionAttributeMappingDetailComponent} from "./admin-workflow-detail/admin-workflow-action-detail/admin-workflow-action-attribute-mapping-detail/admin-workflow-action-attribute-mapping-detail.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    AdminWorkflowListComponent,
    AdminWorkflowDetailComponent,
    AdminWorkflowActionDetailComponent,
    AdminWorkflowNodeDetailComponent,
    AdminWorkflowTransitionDetailComponent,
    AdminWorkflowFormElementDetailComponent,
    AdminWorkflowActionAttributeMappingDetailComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatChipsModule,
    SharedModule,
  ]
})
export class WorkflowAdminAppModule {
  constructor(private appService: AppService) {
    this.appService.registerApp('WorkflowAdminApp', {
      path: 'workflow-admin',
      children: workflowAdminAppRoutes
    });
  }
}
