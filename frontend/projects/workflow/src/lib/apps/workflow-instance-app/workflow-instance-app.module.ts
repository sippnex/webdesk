import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppService} from "@webdesk/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {RouterModule} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {WorkflowInstanceDetailComponent} from "./workflow-instance-detail/workflow-instance-detail.component";
import {WorkflowInstanceListComponent} from "./workflow-instance-list/workflow-instance-list.component";
import {workflowInstanceAppRoutes} from "./workflow-instance-app.route";
import {SelectWorkflowDialogComponent} from "./select-workflow-dialog/select-workflow-dialog.component";

@NgModule({
  declarations: [
    SelectWorkflowDialogComponent,
    WorkflowInstanceDetailComponent,
    WorkflowInstanceListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
  ]
})
export class WorkflowInstanceAppModule {
  constructor(private appService: AppService) {
    this.appService.registerApp('WorkflowInstanceApp', {
      path: 'workflow/instances',
      children: workflowInstanceAppRoutes
    });
  }
}
