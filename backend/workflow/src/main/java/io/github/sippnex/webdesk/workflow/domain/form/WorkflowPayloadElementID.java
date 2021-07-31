package io.github.sippnex.webdesk.workflow.domain.form;

import io.github.sippnex.webdesk.workflow.domain.WorkflowInstance;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class WorkflowPayloadElementID implements Serializable {

    @ManyToOne
    private WorkflowInstance workflowInstance;

    private String name;

    public WorkflowPayloadElementID() {
    }

    public WorkflowPayloadElementID(String name) {
        this.name = name;
    }

    public WorkflowInstance getWorkflowItem() {
        return workflowInstance;
    }

    public void setWorkflowItem(WorkflowInstance workflowInstance) {
        this.workflowInstance = workflowInstance;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
