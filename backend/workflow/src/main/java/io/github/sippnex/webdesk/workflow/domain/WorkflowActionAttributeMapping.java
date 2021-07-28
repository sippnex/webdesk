package io.github.sippnex.webdesk.workflow.domain;

import io.github.sippnex.webdesk.core.util.Updatable;

import javax.persistence.*;

@Entity
public class WorkflowActionAttributeMapping implements Updatable<WorkflowActionAttributeMapping, Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private WorkflowActionAttribute sourceAttribute;

    @ManyToOne
    private WorkflowActionAttribute targetAttribute;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WorkflowActionAttribute getSourceAttribute() {
        return sourceAttribute;
    }

    public void setSourceAttribute(WorkflowActionAttribute sourceAttribute) {
        this.sourceAttribute = sourceAttribute;
    }

    public WorkflowActionAttribute getTargetAttribute() {
        return targetAttribute;
    }

    public void setTargetAttribute(WorkflowActionAttribute targetAttribute) {
        this.targetAttribute = targetAttribute;
    }

    @Override
    public void update(WorkflowActionAttributeMapping attributeMapping) {
        // TODO: implement update method
    }
}
