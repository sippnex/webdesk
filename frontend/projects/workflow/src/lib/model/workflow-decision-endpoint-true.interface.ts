import {WorkflowDecisionEndpoint} from './workflow-decision-endpoint.interface';
import {WorkflowDecisionNode} from './workflow-decision-node.interface';

export interface WorkflowDecisionEndpointTrue extends WorkflowDecisionEndpoint {
  parentNode?: WorkflowDecisionNode;
}
