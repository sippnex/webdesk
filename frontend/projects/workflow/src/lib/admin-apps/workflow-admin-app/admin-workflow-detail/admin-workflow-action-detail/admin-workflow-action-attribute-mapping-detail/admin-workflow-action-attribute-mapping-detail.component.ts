import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-workflow-action-attribute-mapping-detail',
  templateUrl: './admin-workflow-action-attribute-mapping-detail.component.html',
  styleUrls: ['./admin-workflow-action-attribute-mapping-detail.component.css']
})
export class AdminWorkflowActionAttributeMappingDetailComponent implements OnInit {

  public workflowId: number;
  public transitionId: number;
  public workflowActionId: number;
  public workflowActionAttributeMappingType: 'input' | 'output';
  public workflowActionAttributeMappingId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.workflowId = +params.workflowId;
      this.transitionId = +params.transitionId;
      this.workflowActionId = +params.workflowActionId;
      this.workflowActionAttributeMappingType = params.workflowActionAttributeMappingType;
      this.workflowActionAttributeMappingId = +params.workflowActionAttributeMappingId;
    });
  }

  public getAttributeAttributeMappingTypeText(): string {
    return this.workflowActionAttributeMappingType ? this.workflowActionAttributeMappingType === 'input' ? 'Eingangsparameter' : 'Ausgangsparameter' : '';
  }

}
