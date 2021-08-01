import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WorkflowAction} from "../../../../model/workflow-action.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkflowTransition} from "../../../../model/workflow-transition.interface";
import {WorkflowTransitionService} from "../../../../services/workflow-transition.service";
import {ModelFormBinding, UnsavedChangesProtector} from "@webdesk/core";
import {WorkflowNode} from "../../../../model/workflow-node.interface";
import {WorkflowNodeService} from "../../../../services/workflow-node.service";

const WORKFLOW_ACTIONS: WorkflowAction[] = [
  new WorkflowAction(1, 'Zeitereignis buchen')
];

@Component({
  selector: 'app-workflow-transition-detail',
  templateUrl: './workflow-transition-detail.component.html',
  styleUrls: ['./workflow-transition-detail.component.css']
})
export class WorkflowTransitionDetailComponent implements OnInit, ModelFormBinding, UnsavedChangesProtector {

  transition: WorkflowTransition;
  availableNodes: WorkflowNode[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
    order: new FormControl(''),
    sourceNode: new FormControl(''),
    targetNode: new FormControl('', [Validators.required]),
  });

  displayedActionColumns: string[] = ['id', 'name', 'controls'];
  public actions: WorkflowAction[] = WORKFLOW_ACTIONS;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workflowTransitionService: WorkflowTransitionService,
              private workflowNodeService: WorkflowNodeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      await this.initModel(params);
      await this.initForm();
      await this.updateForm();
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

  goBack(): void {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }

  isSaveEnabled(): boolean {
    return true;
  }

  async saveChanges(refresh: boolean = false): Promise<void> {
    this.updateModel();
    const transition: WorkflowTransition = await this.workflowTransitionService.saveTransition(this.transition).toPromise();
    this.form.markAsPristine();
    if (refresh) {
      this.router.navigate([`../${transition.id}`], {relativeTo: this.route, replaceUrl: true });
    } else {
      this.transition = transition;
    }
  }

  async initModel(params: Params): Promise<void> {
    this.availableNodes = await this.workflowNodeService.getNodesByWorkflowId(+params.workflowId).toPromise();
    if (params.transitionId && params.transitionId !== '0') {
      this.transition = await this.workflowTransitionService.getTransitionById(+params.transitionId).toPromise();
    } else {
      this.transition = {
        name: '',
        icon: '',
        order: 0,
        workflowId: +params.workflowId
      };
    }
  }

  initForm(): void {
    this.form.get('id')!.disable();
  }

  updateForm(): void {
    this.form.reset();
    this.form.get('id')!.setValue(this.transition?.id);
    this.form.get('name')!.setValue(this.transition?.name);
    this.form.get('icon')!.setValue(this.transition?.icon);
    this.form.get('order')!.setValue(this.transition?.order);
    this.form.get('sourceNode')!.setValue(this.transition?.sourceNode);
    this.form.get('targetNode')!.setValue(this.transition?.targetNode);
  }

  updateModel(): void {
    this.transition = {
      ...this.transition,
      id: this.form.get('id')!.value,
      name: this.form.get('name')!.value,
      icon: this.form.get('icon')!.value,
      order: this.form.get('order')!.value,
      sourceNode: this.form.get('sourceNode')!.value,
      targetNode: this.form.get('targetNode')!.value,
    }
  }

  compareNodes(node1: WorkflowNode, node2: WorkflowNode): boolean {
    return node1?.id === node2?.id;
  }

}
