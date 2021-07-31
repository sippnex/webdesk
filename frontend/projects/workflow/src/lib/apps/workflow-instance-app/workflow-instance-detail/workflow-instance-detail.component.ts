import {Component, OnInit} from '@angular/core';
import {ModelFormBinding, UnsavedChangesProtector} from '@webdesk/core';
import {Workflow} from "../../../model/workflow.interface";
import {WorkflowTransition} from "../../../model/workflow-transition.interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WorkflowInstanceService} from "../../../services/workflow-instance.service";
import {WorkflowService} from "../../../services/workflow.service";
import {FormControl, FormGroup} from "@angular/forms";
import {WorkflowInstance} from "../../../model/workflow-instance.interface";

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
    this.workflowInstance!.workflow!.formElements.forEach(formElement => {
      this.form.addControl(formElement.name, new FormControl(''))
    });
  }

  updateForm(): void {
    // TODO: implement form update
  }

  updateModel(): void {
    // TODO: implement model update
    // manually set available transitions for new workflow
    if (!this.workflowInstance.id && this.workflowInstance.workflow) {
      this.workflowInstance.availableTransitions = this.workflowInstance.workflow.transitions.filter(transition => !transition.sourceNode);
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
    this.router.navigate([`../${workflowInstance.id}`], {relativeTo: this.route});
  }
}
