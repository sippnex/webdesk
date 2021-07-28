package io.github.sippnex.webdesk.workflow.domain;

public class WorkflowActionAttributeValue {

    private WorkflowActionAttribute attribute;

    private Object value;

    public WorkflowActionAttribute getAttribute() {
        return attribute;
    }

    public void setAttribute(WorkflowActionAttribute attribute) {
        this.attribute = attribute;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }
}
