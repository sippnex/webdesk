import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Workflow} from "../../../model/workflow.interface";
import {WorkflowService} from "../../../workflow.service";

@Component({
  selector: 'app-admin-workflow-list',
  templateUrl: './admin-workflow-list.component.html',
  styleUrls: ['./admin-workflow-list.component.css']
})
export class AdminWorkflowListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'nodes', 'transitions', 'controls'];
  workflows: Workflow[];

  constructor(private route: ActivatedRoute, private router: Router, private workflowService: WorkflowService) { }

  ngOnInit(): void {
    this.workflowService.getWorkflows().subscribe((workflows: Workflow[]) => {
      this.workflows = workflows;
    });
  }

  openDetailView(workflow?: Workflow): void {
    const target = workflow ? `./${workflow?.id}` : './0';
    this.router.navigate([target], {relativeTo: this.route});
  }
}
