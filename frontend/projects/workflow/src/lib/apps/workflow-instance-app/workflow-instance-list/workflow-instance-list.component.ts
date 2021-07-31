import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {Workflow} from "../../../model/workflow.interface";
import {WorkflowInstanceService} from "../../../services/workflow-instance.service";
import {MatDialog} from "@angular/material/dialog";
import {SelectWorkflowDialogComponent} from "../select-workflow-dialog/select-workflow-dialog.component";
import {WorkflowInstance} from "../../../model/workflow-instance.interface";

@Component({
  selector: 'lib-workflow-instance-list',
  templateUrl: './workflow-instance-list.component.html',
  styleUrls: ['./workflow-instance-list.component.css']
})
export class WorkflowInstanceListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'workflow', 'assignee', 'currentNode', 'actions'];
  dataSource: MatTableDataSource<WorkflowInstance>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private workflowInstanceService: WorkflowInstanceService) {
  }

  ngOnInit(): void {
    this.workflowInstanceService.getWorkflowInstances().subscribe((workflowInstances: WorkflowInstance[]) => {
      this.dataSource = new MatTableDataSource<WorkflowInstance>(workflowInstances);
    });
  }

  createNewWorkflowInstance(): void {
    this.dialog.open(SelectWorkflowDialogComponent).afterClosed().subscribe((workflow: Workflow) => {
      if (workflow) {
        this.router.navigate(['./0'], {relativeTo: this.route, queryParams: {workflowId: workflow.id}});
      }
    });
  }

  openDetailView(workflow: Workflow): void {
    this.router.navigate([`./${workflow?.id}`], {relativeTo: this.route});
  }

}
