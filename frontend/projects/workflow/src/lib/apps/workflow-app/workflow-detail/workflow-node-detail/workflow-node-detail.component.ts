import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WorkflowNode} from "../../../../model/workflow-node.interface";
import {WorkflowNodeService} from "../../../../services/workflow-node.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModelFormBinding, UnsavedChangesProtector} from "@webdesk/core";

@Component({
  selector: 'app-workflow-node-detail',
  templateUrl: './workflow-node-detail.component.html',
  styleUrls: ['./workflow-node-detail.component.css']
})
export class WorkflowNodeDetailComponent implements OnInit, ModelFormBinding, UnsavedChangesProtector {

  node: WorkflowNode;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    icon: new FormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workflowNodeService: WorkflowNodeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      await this.initModel(params);
      await this.initForm();
      await this.updateForm();
    });
  }

  goBack(): void {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  async initModel(params: Params): Promise<void> {
    if (params.nodeId && params.nodeId !== '0') {
      this.node = await this.workflowNodeService.getNodeById(+params.nodeId).toPromise();
    } else {
      this.node = {
        name: '',
        type: '',
        icon: '',
        workflowId: +params.workflowId,
      };
    }
  }

  initForm(): void {
    this.form.get('id')!.disable();
  }

  updateForm(): void {
    this.form.reset();
    this.form.get('id')!.setValue(this.node?.id);
    this.form.get('name')!.setValue(this.node?.name);
    this.form.get('icon')!.setValue(this.node?.icon);
  }

  updateModel(): void {
    this.node = {
      ...this.node,
      id: this.form.get('id')!.value,
      name: this.form.get('name')!.value,
      icon: this.form.get('icon')!.value,
    }
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }

  isSaveEnabled(): boolean {
    return true;
  }

  async saveChanges(refresh: boolean = false): Promise<void> {
    this.updateModel();
    const node: WorkflowNode = await this.workflowNodeService.saveNode(this.node).toPromise();
    this.form.markAsPristine();
    if (refresh) {
      this.router.navigate([`../${node.id}`], {relativeTo: this.route, replaceUrl: true });
    } else {
      this.node = node;
    }
  }

}
