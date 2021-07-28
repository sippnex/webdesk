import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WorkflowAction} from "../../../../model/workflow-action.model";

const WORKFLOW_ACTIONS: WorkflowAction[] = [
  new WorkflowAction(1, 'Zeitereignis buchen')
];

@Component({
  selector: 'app-admin-workflow-transition-detail',
  templateUrl: './admin-workflow-transition-detail.component.html',
  styleUrls: ['./admin-workflow-transition-detail.component.css']
})
export class AdminWorkflowTransitionDetailComponent implements OnInit {

  public workflowId: number;
  public transitionId: number;

  displayedActionColumns: string[] = ['id', 'name', 'controls'];
  public actions: WorkflowAction[] = WORKFLOW_ACTIONS;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.workflowId = +params.workflowId;
      this.transitionId = +params.transitionId;
    });
  }

  public getActionIdText(action: WorkflowAction): string {
    return action ? action.id.toString() : '';
  }

  public getActionNameText(action: WorkflowAction): string {
    return action ? action.name : '';
  }

  public openWorkflowAction(action?: WorkflowAction): void {
    this.router.navigate([`./action/${action ? action.id : 0}`], {relativeTo: this.route});
  }

}
