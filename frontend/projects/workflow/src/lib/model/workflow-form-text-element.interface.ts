import {WorkflowFormElement} from './workflow-form-element.interface';

export interface WorkflowFormTextElement extends WorkflowFormElement {
  maxLength?: number;
}
