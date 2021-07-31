import {WorkflowNode} from "./workflow-node.interface";
import {WorkflowPayloadElement} from "./workflow-payload-element.interface";
import {WorkflowTransition} from "./workflow-transition.interface";
import {Workflow} from "./workflow.interface";

export interface WorkflowInstance {
  id?: number;
  currentNode?: WorkflowNode;
  workflow?: Workflow;
  formPayload: WorkflowPayloadElement[];
  availableTransitions: WorkflowTransition[];
}
