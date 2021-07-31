import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppService, SharedModule} from "@webdesk/core";
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
import {RouterModule} from "@angular/router";
import {WorkflowActionDetailComponent} from "./workflow-detail/workflow-action-detail/workflow-action-detail.component";
import {WorkflowNodeDetailComponent} from "./workflow-detail/workflow-node-detail/workflow-node-detail.component";
import {WorkflowTransitionDetailComponent} from "./workflow-detail/workflow-transition-detail/workflow-transition-detail.component";
import {WorkflowFormElementDetailComponent} from "./workflow-detail/workflow-form-element-detail/workflow-form-element-detail.component";
import {WorkflowActionAttributeMappingDetailComponent} from "./workflow-detail/workflow-action-detail/workflow-action-attribute-mapping-detail/workflow-action-attribute-mapping-detail.component";
import {workflowAppRoutes} from "./workflow-app.route";
import {WorkflowListComponent} from "./workflow-list/workflow-list.component";
import {WorkflowDetailComponent} from "./workflow-detail/workflow-detail.component";

@NgModule({
  declarations: [
    WorkflowListComponent,
    WorkflowDetailComponent,
    WorkflowActionDetailComponent,
    WorkflowNodeDetailComponent,
    WorkflowTransitionDetailComponent,
    WorkflowFormElementDetailComponent,
    WorkflowActionAttributeMappingDetailComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
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
export class WorkflowAppModule {
  constructor(private appService: AppService) {
    this.appService.registerApp('WorkflowApp', {
      path: 'workflow/workflows',
      children: workflowAppRoutes
    });
  }
}
