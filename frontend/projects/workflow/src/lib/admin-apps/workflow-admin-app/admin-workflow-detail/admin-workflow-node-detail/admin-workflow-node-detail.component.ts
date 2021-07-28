import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WorkflowAction} from "../../../../model/workflow-action.model";
import {WorkflowNode} from "../../../../model/workflow-node.interface";
import {WorkflowNodeService} from "../../../../workflow-node.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModelFormBinding, UnsavedChangesProtector} from "@webdesk/core";

@Component({
  selector: 'app-admin-workflow-node-detail',
  templateUrl: './admin-workflow-node-detail.component.html',
  styleUrls: ['./admin-workflow-node-detail.component.css']
})
export class AdminWorkflowNodeDetailComponent implements OnInit, ModelFormBinding, UnsavedChangesProtector {

  node: WorkflowNode;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute, private router: Router, private workflowNodeService: WorkflowNodeService) {
  }

  ngOnInit(): void {
    this.form.get('id')!.disable();
    this.route.params.subscribe(params => {
      if (params.nodeId && params.nodeId !== '0') {
        this.workflowNodeService.getNodeById(+params.nodeId).subscribe(node => {
          this.node = node;
          this.updateForm();
        });
      } else {
        this.node = {
          name: '',
          type: '',
          icon: '',
          workflowId: +params.workflowId,
        };
        this.updateForm();
      }
    });
  }

  updateForm(): void {
    this.form.reset();
    this.form.get('id')!.setValue(this.node?.id);
    this.form.get('name')!.setValue(this.node?.name);
  }

  updateModel(): void {
    this.node = {
      ...this.node,
      id: this.form.get('id')!.value,
      name: this.form.get('name')!.value,
    }
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }

  async saveChanges(): Promise<void> {
    this.updateModel();
    const node: WorkflowNode = await this.workflowNodeService.saveNode(this.node).toPromise();
    this.form.markAsPristine();
    this.router.navigate([`../${node.id}`], {relativeTo: this.route, replaceUrl: true });
  }

}
