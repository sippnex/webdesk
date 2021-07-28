package io.github.sippnex.webdesk.workflow.domain;

import io.github.sippnex.webdesk.core.util.Updatable;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class WorkflowActionAttribute implements Updatable<WorkflowActionAttribute, String> {

    @Id
    private String name;

    private String description;

    public WorkflowActionAttribute() {
    }

    public WorkflowActionAttribute(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String getId() {
        return this.name;
    }

    @Override
    public void update(WorkflowActionAttribute actionAttribute) {
        this.description = actionAttribute.getDescription();
    }
}
