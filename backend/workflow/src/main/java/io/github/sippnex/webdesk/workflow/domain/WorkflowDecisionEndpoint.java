package io.github.sippnex.webdesk.workflow.domain;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class WorkflowDecisionEndpoint extends WorkflowNode {

    @ManyToOne
    private WorkflowDecisionNode parentNode;

    public WorkflowDecisionNode getParentNode() {
        return parentNode;
    }

    public void setParentNode(WorkflowDecisionNode parentNode) {
        this.parentNode = parentNode;
    }

    @Override
    public void update(WorkflowNode node) {
        super.update(node);
        if (node instanceof WorkflowDecisionEndpoint) {
            this.parentNode.update(node);
        }
    }
}
