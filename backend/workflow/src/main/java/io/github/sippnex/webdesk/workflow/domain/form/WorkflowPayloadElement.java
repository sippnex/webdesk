package io.github.sippnex.webdesk.workflow.domain.form;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import io.github.sippnex.webdesk.workflow.domain.WorkflowItem;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = WorkflowTextPayloadElement.class, name = "WorkflowTextPayloadElement"),
})
@Entity
public abstract class WorkflowPayloadElement {

    @JsonIgnore
    @EmbeddedId
    public WorkflowPayloadElementID id;

    public WorkflowPayloadElement() {
    }

    public WorkflowPayloadElement(WorkflowPayloadElementID id) {
        this.id = id;
    }

    @JsonBackReference
    public WorkflowItem getWorkflowItem() {
        return id != null ? id.getWorkflowItem() : null;
    }

    public String getName() {
        return id != null ? id.getName() : null;
    }

    public void setWorkflowItem(WorkflowItem workflowItem) {
        if (id == null) {
            this.id = new WorkflowPayloadElementID();
        }
        id.setWorkflowItem(workflowItem);
    }

    public void setName(String name) {
        if (id == null) {
            this.id = new WorkflowPayloadElementID();
        }
        id.setName(name);
    }
}
