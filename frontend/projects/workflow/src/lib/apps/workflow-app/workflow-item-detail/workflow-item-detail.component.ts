import {Component, OnInit} from '@angular/core';
import {WorkflowItem} from "../../../model/workflow-item.interface";
import {Workflow} from "../../../model/workflow.interface";
import {WorkflowTransition} from "../../../model/workflow-transition.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkflowService} from "../../../workflow.service";
import {WorkflowItemService} from "../../../workflow-item.service";
import {FormControl, FormGroup} from "@angular/forms";
import {WorkflowTextPayloadElement} from "../../../model/workflow-text-payload-element.interface";
import {WorkflowPayloadElement} from "../../../model/workflow-payload-element.interface";

@Component({
  selector: 'lib-workflow-item-detail',
  templateUrl: './workflow-item-detail.component.html',
  styleUrls: ['./workflow-item-detail.component.css']
})
export class WorkflowItemDetailComponent implements OnInit {

  workflow: Workflow;
  workflowItem: WorkflowItem;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workflowService: WorkflowService,
              private workflowItemService: WorkflowItemService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.workflowId) {
        this.workflowService.getWorkflowById(+params.workflowId).subscribe((workflow: Workflow) => {
          this.workflow = workflow;
          this.createForm();
          this.route.queryParams.subscribe(queryParams => {
            if (queryParams.workflowItemId) {
              this.workflowItemService.getWorkflowItemById(+queryParams.workflowItemId).subscribe((workflowItem: WorkflowItem) => {
                this.workflowItem = workflowItem;
                this.updateForm();
              });
            } else {
              this.workflowItem = {
                workflow: this.workflow,
                formPayload: [],
                availableTransitions: this.workflow.transitions.filter(transition => !transition.sourceNode)
              } as WorkflowItem;
              this.updateForm();
            }
          });
        });
      }
    });
  }

  private createForm(): void {
    this.form = new FormGroup({
      id: new FormControl('')
    });
    this.form.get('id')!.disable();
    this.workflow.formElements.forEach(formElement => {
      this.form.addControl(formElement.name, new FormControl(''))
    });
  }

  private updateForm(): void {
    this.form.reset();
    this.form.get('id')!.setValue(this.workflowItem ? this.workflowItem.id : '');
    if (this.workflowItem) {
      this.workflowItem.formPayload.forEach(formPayload => {
        const formControl = this.form.get(formPayload.name)!;
        if (formPayload.type === 'WorkflowTextPayloadElement') {
          formControl.setValue((formPayload as WorkflowTextPayloadElement).value)
        }
      });
    }
  }

  private updateModel(): void {
    const formPayload: WorkflowPayloadElement[] = [];
    this.workflow.formElements.forEach(formElement => {
      const formControl = this.form.get(formElement.name)!;
      if (formElement.type === 'WorkflowFormTextElement') {
        formPayload.push({
          type: 'WorkflowTextPayloadElement',
          name: formElement.name,
          value: formControl.value
        } as WorkflowTextPayloadElement);
      }
    });
    if (this.workflowItem) {
      this.workflowItem.formPayload = formPayload;
    } else {
      this.workflowItem = {
        workflow: this.workflow,
        formPayload: formPayload
      } as WorkflowItem;
    }
  }

  executeTransition(transition: WorkflowTransition) {
    this.updateModel();
    this.workflowItemService.saveWorkflowItem(this.workflowItem, transition).subscribe((workflowItem: WorkflowItem) => {
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {workflowItemId: workflowItem.id}
        });
    });
  }
}
