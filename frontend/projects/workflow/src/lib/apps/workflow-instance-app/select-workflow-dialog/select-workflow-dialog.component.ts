import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Workflow} from "../../../model/workflow.interface";
import {WorkflowService} from "../../../services/workflow.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'lib-select-workflow-dialog',
  templateUrl: './select-workflow-dialog.component.html',
  styleUrls: ['./select-workflow-dialog.component.css']
})
export class SelectWorkflowDialogComponent implements OnInit {

  workflowSearchControl = new FormControl();
  workflows: Workflow[];
  filteredWorkflows: Observable<Workflow[]>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialogRef: MatDialogRef<SelectWorkflowDialogComponent>,
              private workflowService: WorkflowService) { }

  ngOnInit(): void {
    this.workflowService.getWorkflows().subscribe((workflows: Workflow[]) => {
      this.workflows = workflows;
      this.filteredWorkflows = this.workflowSearchControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filter(name) : this.workflows.slice())
        );
    });
  }

  selectWorkflow(workflow: Workflow): void {
    this.dialogRef.close(workflow);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private filter(name: string): Workflow[] {
    const filterValue = name.toLowerCase();
    return this.workflows.filter(workflow => workflow.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
