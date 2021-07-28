import {WorkflowNode} from "./workflow-node.interface";
import {WorkflowPayloadElement} from "./workflow-payload-element.interface";
import {Workflow} from "./workflow.interface";
import {WorkflowTransition} from "./workflow-transition.interface";

export interface WorkflowItem {
  id?: number;
  currentNode?: WorkflowNode;
  workflow: Workflow;
  formPayload: WorkflowPayloadElement[];
  availableTransitions: WorkflowTransition[];
}
