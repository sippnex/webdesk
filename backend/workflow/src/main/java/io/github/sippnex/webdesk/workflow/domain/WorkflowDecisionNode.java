package io.github.sippnex.webdesk.workflow.domain;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
public class WorkflowDecisionNode extends WorkflowNode {

    private String condition;

    @OneToOne
    private WorkflowDecisionEndpoint endpointTrue;

    @OneToOne
    private WorkflowDecisionEndpoint endpointFalse;

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public WorkflowDecisionEndpoint getEndpointTrue() {
        return endpointTrue;
    }

    public void setEndpointTrue(WorkflowDecisionEndpoint endpointTrue) {
        this.endpointTrue = endpointTrue;
    }

    public WorkflowDecisionEndpoint getEndpointFalse() {
        return endpointFalse;
    }

    public void setEndpointFalse(WorkflowDecisionEndpoint endpointFalse) {
        this.endpointFalse = endpointFalse;
    }

    @Override
    public void update(WorkflowNode node) {
        super.update(node);
        if (node instanceof WorkflowDecisionNode) {
            this.condition = ((WorkflowDecisionNode) node).getCondition();
            this.endpointTrue.update(((WorkflowDecisionNode) node).getEndpointTrue());
            this.endpointFalse.update(((WorkflowDecisionNode) node).getEndpointFalse());
        }
    }
}
