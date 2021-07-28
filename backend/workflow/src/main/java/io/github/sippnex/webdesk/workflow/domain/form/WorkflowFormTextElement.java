package io.github.sippnex.webdesk.workflow.domain.form;

import javax.persistence.Entity;

@Entity
public class WorkflowFormTextElement extends WorkflowFormElement {

    private Integer maxLength;

    public WorkflowFormTextElement() {
    }

    public WorkflowFormTextElement(String name) {
        super(name);
    }

    public WorkflowFormTextElement(String name, Integer maxLength) {
        super(name);
        this.maxLength = maxLength;
    }

    public Integer getMaxLength() {
        return maxLength;
    }

    public void setMaxLength(Integer maxLength) {
        this.maxLength = maxLength;
    }

    @Override
    public void update(WorkflowFormElement formElement) {
        super.update(formElement);
        if (formElement instanceof WorkflowFormTextElement) {
            this.maxLength = ((WorkflowFormTextElement) formElement).getMaxLength();
        }
    }
}
