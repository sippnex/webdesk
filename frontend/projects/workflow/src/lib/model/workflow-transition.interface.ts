import {WorkflowNode} from './workflow-node.interface';

export interface WorkflowTransition {
  id: number;
  name: string;
  icon: string;
  primary: boolean;
  sourceNode?: WorkflowNode;
  targetNode?: WorkflowNode;
}
