import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WorkflowActionAttributeMapping} from "../../../../model/workflow-action-attribute-mapping.model";
import {WorkflowActionAttribute} from "../../../../model/workflow-action-attribute.model";

const WORKFLOW_ACTION_INPUT_MAPPINGS: WorkflowActionAttributeMapping[] = [
  new WorkflowActionAttributeMapping(
    1,
    new WorkflowActionAttribute('workflowPayload.startDate', 'Workflow Payload'),
    new WorkflowActionAttribute('startDate', 'Startdatum des Ereignisses')
  )
];

const WORKFLOW_ACTION_OUTPUT_MAPPINGS: WorkflowActionAttributeMapping[] = [];

@Component({
  selector: 'app-admin-workflow-action-detail',
  templateUrl: './admin-workflow-action-detail.component.html',
  styleUrls: ['./admin-workflow-action-detail.component.css']
})
export class AdminWorkflowActionDetailComponent implements OnInit {

  public workflowId: number;
  public transitionId: number;
  public workflowActionId: number;

  displayedAttributeMappingColumns: string[] = ['id', 'source', 'target', 'controls'];
  public inputMappings: WorkflowActionAttributeMapping[] = WORKFLOW_ACTION_INPUT_MAPPINGS;
  public outputMappings: WorkflowActionAttributeMapping[] = WORKFLOW_ACTION_OUTPUT_MAPPINGS;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.workflowId = +params.workflowId;
      this.transitionId = +params.transitionId;
      this.workflowActionId = +params.workflowActionId;
    });
  }

  public getAttributeMappingIdText(attributeMapping: WorkflowActionAttributeMapping): string {
    return attributeMapping ? attributeMapping.id.toString() : '';
  }

  public getAttributeMappingSourceText(attributeMapping: WorkflowActionAttributeMapping): string {
    return attributeMapping && attributeMapping.sourceAttribute ? attributeMapping.sourceAttribute.name: '';
  }

  public getAttributeMappingTargetText(attributeMapping: WorkflowActionAttributeMapping): string {
    return attributeMapping && attributeMapping.targetAttribute ? attributeMapping.targetAttribute.name: '';
  }

  public openWorkflowActionInputMapping(inputMapping: WorkflowActionAttributeMapping): void {
    this.router.navigate([`./input/${inputMapping ? inputMapping.id : 0}`], {relativeTo: this.route});
  }

  public openWorkflowActionOutputMapping(outputMapping: WorkflowActionAttributeMapping): void {
    this.router.navigate([`./output/${outputMapping ? outputMapping.id : 0}`], {relativeTo: this.route});
  }

}
