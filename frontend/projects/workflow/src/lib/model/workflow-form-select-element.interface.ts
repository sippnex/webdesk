import {WorkflowFormElement} from './workflow-form-element.interface';

export interface WorkflowFormSelectOption {
  id?: number;
  value: string;
}

export interface WorkflowFormSelectElement extends WorkflowFormElement {
  options: WorkflowFormSelectOption[];
}
