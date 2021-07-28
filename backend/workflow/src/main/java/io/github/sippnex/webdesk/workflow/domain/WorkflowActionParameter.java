package io.github.sippnex.webdesk.workflow.domain;

import io.github.sippnex.webdesk.core.util.Updatable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WorkflowActionParameter implements Updatable<WorkflowActionParameter, Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String expression;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    @Override
    public void update(WorkflowActionParameter workflowActionParameter) {
        this.expression = workflowActionParameter.getExpression();
    }
}
