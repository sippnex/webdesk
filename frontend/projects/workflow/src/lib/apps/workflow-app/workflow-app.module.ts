import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppService} from "@webdesk/core";
import {workflowAppRoutes} from "./workflow-app.route";
import {NewWorkflowComponent} from "./new-workflow/new-workflow.component";
import {WorkflowItemDetailComponent} from "./workflow-item-detail/workflow-item-detail.component";
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
import { WorkflowItemListComponent } from './workflow-item-list/workflow-item-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    NewWorkflowComponent,
    WorkflowItemDetailComponent,
    WorkflowItemListComponent,
  ],
  imports: [
    CommonModule,
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
  ]
})
export class WorkflowAppModule {
  constructor(private appService: AppService) {
    this.appService.registerApp('WorkflowApp', {
      path: 'workflow',
      children: workflowAppRoutes
    });
  }
}
