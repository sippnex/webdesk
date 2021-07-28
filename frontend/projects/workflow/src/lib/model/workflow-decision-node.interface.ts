import {WorkflowNode} from './workflow-node.interface';
import {WorkflowDecisionEndpointTrue} from './workflow-decision-endpoint-true.interface';
import {WorkflowDecisionEndpointFalse} from './workflow-decision-endpoint-false.interface';

export interface WorkflowDecisionNode extends WorkflowNode {
  endpointTrue: WorkflowDecisionEndpointTrue;
  endpointFalse: WorkflowDecisionEndpointFalse;
  condition?: string;
}
