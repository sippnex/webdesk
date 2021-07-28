import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WorkflowItem} from "../../model/workflow-item.interface";
import {Workflow} from "../../model/workflow.interface";
import {WorkflowTransition} from "../../model/workflow-transition.interface";
import {WorkflowService} from "../../workflow.service";
import {WorkflowFormElement} from "../../model/workflow-form-element.interface";

@Component({
  selector: 'app-workflow-app',
  templateUrl: './workflow-app.component.html',
  styleUrls: ['./workflow-app.component.css']
})
export class WorkflowAppComponent implements OnInit {

  workflowItem: WorkflowItem;
  workflow: Workflow;
  availableTransitions: WorkflowTransition[];

  constructor(private route: ActivatedRoute, private workflowService: WorkflowService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.workflowItemId) {
        // TODO: implement workflow item behaviour
      } else if (queryParams.workflowId) {
        this.workflowService.getWorkflowById(+queryParams.workflowId).subscribe((workflow: Workflow) => {
          this.workflow = workflow;
          this.availableTransitions = this.getAvailableTransitions();
        });
      } else {
        // TODO: implement error handling
      }
    });
  }

  private getAvailableTransitions(): WorkflowTransition[] {
    if (this.workflowItem && this.workflow) {
      return this.workflow.transitions.filter(transition => transition.sourceNode && transition.sourceNode === this.workflowItem.currentNode);
    } else {
      return this.workflow.transitions.filter(transition => !transition.sourceNode);
    }
  }

  isTextElement(formElement: WorkflowFormElement): boolean {
    return formElement.type === 'WorkflowFormTextElement';
  }

}
