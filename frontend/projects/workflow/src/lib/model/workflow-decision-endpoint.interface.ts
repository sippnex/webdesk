import {WorkflowNode} from './workflow-node.interface';
import {WorkflowDecisionNode} from './workflow-decision-node.interface';

export interface WorkflowDecisionEndpoint extends WorkflowNode {
  parentNode?: WorkflowDecisionNode;
}
