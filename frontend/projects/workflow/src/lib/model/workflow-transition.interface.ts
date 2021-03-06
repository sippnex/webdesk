import {WorkflowNode} from './workflow-node.interface';

export interface WorkflowTransition {
  id?: number;
  name: string;
  icon: string;
  order: number;
  workflowId: number;
  sourceNode?: WorkflowNode;
  targetNode?: WorkflowNode;
}
