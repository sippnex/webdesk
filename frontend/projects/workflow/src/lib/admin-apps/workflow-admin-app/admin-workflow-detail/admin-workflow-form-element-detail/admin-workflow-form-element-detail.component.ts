import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  WorkflowFormSelectElement,
  WorkflowFormSelectOption
} from "../../../../model/workflow-form-select-element.interface";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ActivatedRoute} from "@angular/router";
import {WorkflowService} from "../../../../workflow.service";
import {Workflow} from "../../../../model/workflow.interface";
import {WorkflowFormElement} from "../../../../model/workflow-form-element.interface";

interface FormType {
  name: string;
  displayText: string;
}

const FORM_TYPES: FormType[] = [
  {
    name: 'WorkflowFormTextElement',
    displayText: 'Textfeld'
  },
  {
    name: 'WorkflowFormRichTextElement',
    displayText: 'Freitextfeld'
  },
  {
    name: 'WorkflowFormSelectElement',
    displayText: 'Auswahlfeld'
  }
];

@Component({
  selector: 'app-admin-workflow-form-element-detail',
  templateUrl: './admin-workflow-form-element-detail.component.html',
  styleUrls: ['./admin-workflow-form-element-detail.component.css']
})
export class AdminWorkflowFormElementDetailComponent implements OnInit {

  workflow: Workflow;
  formElement?: WorkflowFormElement | undefined;

  formTypes: FormType[] = FORM_TYPES;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  options: WorkflowFormSelectOption[] = [];

  constructor(private route: ActivatedRoute, private workflowService: WorkflowService) {
  }

  ngOnInit(): void {
    this.subscribeFormChanges();
    this.route.params.subscribe(params => {
      this.workflowService.getWorkflowById(+params.workflowId).subscribe((workflow: Workflow) => {
        this.workflow = workflow;
        if (params.formElementId) {
          this.formElement = this.workflow.formElements.find((formElement: WorkflowFormElement) => formElement.id === +params.formElementId);
        }
        this.setFormModel(this.formElement);
      });
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.options.push({value: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(option: WorkflowFormSelectOption): void {
    const index = this.options.indexOf(option);
    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }

  reset() {
    if (this.formElement) {
      this.setFormModel(this.workflow.formElements.find((formElement: WorkflowFormElement) => formElement.id === this.formElement!.id));
    } else {
      this.form.reset();
    }
  }

  save() {
    let formElement: WorkflowFormElement = this.getFormModel();
    if (this.formElement) {
      const index = this.workflow.formElements.findIndex((formElement: WorkflowFormElement) => formElement.id === this.formElement!.id);
      this.workflow.formElements.splice(index, 1);
    }
    this.workflow.formElements.push(formElement!);
    console.log('PUT', this.workflow);
    this.workflowService.saveWorkflow(this.workflow).subscribe((workflow: Workflow) => {
      this.workflow = workflow;
      if (!this.formElement) {
        this.formElement = this.workflow.formElements[this.workflow.formElements.length - 1];
        this.setFormModel(this.formElement);
      }
    });
  }

  private subscribeFormChanges(): void {
    this.form.get('type')!.valueChanges.subscribe(value => {
      if (value === 'WorkflowFormSelectElement') {
        console.log('add options control');
        this.form.addControl('options', new FormControl(''));
      } else {
        this.form.removeControl('options');
      }
    });
  }

  private setFormModel(formElement?: WorkflowFormElement): void {
    this.form.reset();
    this.form.get('id')!.setValue(formElement ? formElement.id : '');
    this.form.get('name')!.setValue(formElement ? formElement.name : '');
    this.form.get('type')!.setValue(formElement ? formElement.type : '');
    this.form.get('id')!.disable();

    if (formElement?.type === 'WorkflowFormSelectElement') {
      this.options = (formElement as WorkflowFormSelectElement).options;
    }
  }

  private getFormModel(): WorkflowFormElement {
    let formElement: WorkflowFormElement;
    if (this.form.get('type')!.value === 'WorkflowFormSelectElement') {
      formElement = {
        type: 'WorkflowFormSelectElement',
        id: this.form.get('id')!.value ? this.form.get('id')!.value : undefined,
        name: this.form.get('name')!.value,
        options: this.options
      } as WorkflowFormSelectElement;
    }
    return formElement!;
  }

}
