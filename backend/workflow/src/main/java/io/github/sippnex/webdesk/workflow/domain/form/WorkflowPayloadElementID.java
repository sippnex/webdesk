package io.github.sippnex.webdesk.workflow.domain.form;

import io.github.sippnex.webdesk.workflow.domain.WorkflowItem;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class WorkflowPayloadElementID implements Serializable {

    @ManyToOne
    private WorkflowItem workflowItem;

    private String name;

    public WorkflowPayloadElementID() {
    }

    public WorkflowPayloadElementID(String name) {
        this.name = name;
    }

    public WorkflowItem getWorkflowItem() {
        return workflowItem;
    }

    public void setWorkflowItem(WorkflowItem workflowItem) {
        this.workflowItem = workflowItem;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
