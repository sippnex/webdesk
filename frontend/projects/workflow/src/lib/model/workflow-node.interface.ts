import { Heritable } from "@webdesk/core";

export interface WorkflowNode extends Heritable {
  id?: number;
  name: string;
  icon: string;
  workflowId: number;
}
