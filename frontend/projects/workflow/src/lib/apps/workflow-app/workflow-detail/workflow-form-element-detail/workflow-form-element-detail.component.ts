import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  WorkflowFormSelectElement,
  WorkflowFormSelectOption
} from "../../../../model/workflow-form-select-element.interface";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {WorkflowFormElement} from "../../../../model/workflow-form-element.interface";
import {Workflow} from "../../../../model/workflow.interface";
import { ModelFormBinding, UnsavedChangesProtector } from '@webdesk/core';
import {WorkflowFormElementService} from "../../../../services/workflow-form-element.service";

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
  selector: 'app-workflow-form-element-detail',
  templateUrl: './workflow-form-element-detail.component.html',
  styleUrls: ['./workflow-form-element-detail.component.css']
})
export class WorkflowFormElementDetailComponent implements OnInit, ModelFormBinding, UnsavedChangesProtector {

  workflow: Workflow;
  formElement: WorkflowFormElement;

  formTypes: FormType[] = FORM_TYPES;
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  options: WorkflowFormSelectOption[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workflowFormElementService: WorkflowFormElementService) {
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

  initForm(): void {
    this.form.get('id')!.disable();
    this.form.get('type')!.valueChanges.subscribe(value => {
      if (value === 'WorkflowFormSelectElement') {
        this.form.addControl('options', new FormControl(''));
      } else {
        this.form.removeControl('options');
      }
    });
  }

  async initModel(params: Params): Promise<void> {
    if (params.formElementId && params.formElementId !== '0') {
      this.formElement = await this.workflowFormElementService.getFormElementById(+params.formElementId).toPromise();
    } else {
      this.formElement = {
        type: '',
        name: '',
        workflowId: +params.workflowId
      };
    }
  }

  updateForm(): void {
    this.form.reset();
    this.form.get('id')!.setValue(this.formElement?.id);
    this.form.get('name')!.setValue(this.formElement?.name);
    this.form.get('type')!.setValue(this.formElement?.type);
  }

  updateModel(): void {
    this.formElement = {
      ...this.formElement,
      id: this.form.get('id')!.value,
      name: this.form.get('name')!.value,
      type: this.form.get('type')!.value,
    }
  }

  async saveChanges(refresh: boolean = false): Promise<void> {
    this.updateModel();
    const formElement = await this.workflowFormElementService.saveFormElement(this.formElement).toPromise();
    this.form.markAsPristine();
    if (refresh) {
      this.router.navigate([`../${formElement.id}`], {relativeTo: this.route});
    } else {
      this.formElement = formElement;
    }
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }

  isSaveEnabled(): boolean {
    return false;
  }

}
