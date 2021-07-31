import { Heritable } from "@webdesk/core";

export interface WorkflowFormElement extends Heritable {
  id?: number;
  name: string;
  workflowId: number;
}
