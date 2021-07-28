import {WorkflowTransition} from './workflow-transition.interface';
import {WorkflowFormElement} from "./workflow-form-element.interface";
import {WorkflowNode} from "./workflow-node.interface";

export interface Workflow {
  id?: number;
  name: string;
  formElements: WorkflowFormElement[];
  transitions: WorkflowTransition[];
  nodes: WorkflowNode[];
}
