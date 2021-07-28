import {WorkflowActionAttribute} from "./workflow-action-attribute.model";

export class WorkflowActionAttributeMapping {
  constructor(public id: number,
              public sourceAttribute: WorkflowActionAttribute,
              public targetAttribute: WorkflowActionAttribute) {
  }
}
