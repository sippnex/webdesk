import {Component, OnInit} from '@angular/core';
import {ModelFormBinding, UnsavedChangesProtector} from '@webdesk/core';
import {Workflow} from "../../../model/workflow.interface";
import {WorkflowTransition} from "../../../model/workflow-transition.interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WorkflowInstanceService} from "../../../services/workflow-instance.service";
import {WorkflowService} from "../../../services/workflow.service";
import {FormControl, FormGroup} from "@angular/forms";
import {WorkflowInstance} from "../../../model/workflow-instance.interface";
import {WorkflowPayloadElement} from "../../../model/workflow-payload-element.interface";
import {WorkflowTextPayloadElement} from "../../../model/workflow-text-payload-element.interface";
import {WorkflowFormTextElement} from "../../../model/workflow-form-text-element.interface";

@Component({
  selector: 'lib-workflow-instance-detail',
  templateUrl: './workflow-instance-detail.component.html',
  styleUrls: ['./workflow-instance-detail.component.css']
})
export class WorkflowInstanceDetailComponent implements OnInit, ModelFormBinding, UnsavedChangesProtector {

  workflowInstance: WorkflowInstance;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workflowInstanceService: WorkflowInstanceService,
              private workflowService: WorkflowService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.route.queryParams.subscribe(async queryParams => {
        await this.initModel(params, queryParams);
        await this.initForm();
        await this.updateForm();
      });
    });
  }

  public goBack(): void {
    this.router.navigate([`../`], {relativeTo: this.route});
  }

  async initModel(params: Params, queryParams: Params): Promise<void> {
    if (params.workflowInstanceId && params.workflowInstanceId !== '0') {
      this.workflowInstance = await this.workflowInstanceService.getWorkflowInstanceById(+params.workflowInstanceId).toPromise();
    } else if (queryParams.workflowId) {
      const workflow = await this.workflowService.getWorkflowById(+queryParams.workflowId).toPromise();
      this.workflowInstance = {
        workflow: workflow,
        formPayload: [],
        availableTransitions: workflow.transitions.filter(transition => !transition.sourceNode)
      }
    }
  }

  initForm(): void {
    this.form = new FormGroup({});
    this.workflowInstance.workflow!.formElements.forEach(formElement => {
      this.form.addControl(formElement.name, new FormControl(''))
    });
  }

  updateForm(): void {
    this.form.reset();
    this.workflowInstance.formPayload.forEach(payloadElement => {
      let value: any;
      // TODO: implement further payload elements
      if (payloadElement.type === 'WorkflowTextPayloadElement') {
        value = (payloadElement as WorkflowTextPayloadElement).value;
      }
      this.form.get(payloadElement.name)?.setValue(value);
    });
  }

  updateModel(): void {
    const formPayload: WorkflowPayloadElement[] = [];
    this.workflowInstance.workflow!.formElements.forEach(formElement => {
      const formControl = this.form.get(formElement.name)!;
      // TODO: implement further form elements
      if (formElement.type === 'WorkflowFormTextElement') {
        formPayload.push({
          type: 'WorkflowTextPayloadElement',
          name: formElement.name,
          value: formControl.value
        } as WorkflowTextPayloadElement);
      }
    });
    this.workflowInstance = {
      ...this.workflowInstance,
      formPayload
    }
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }

  isSaveEnabled(): boolean {
    return false;
  }

  async saveChanges(transition: WorkflowTransition): Promise<void> {
    this.updateModel();
    this.form.markAsPristine();
    const workflowInstance: WorkflowInstance = await this.workflowInstanceService.saveWorkflowInstance(this.workflowInstance, transition).toPromise();
    if (!this.workflowInstance.id) {
      this.router.navigate([`../${workflowInstance.id}`], {relativeTo: this.route, replaceUrl: true});
    } else {
      this.workflowInstance = workflowInstance;
    }

  }
}
