package io.github.sippnex.webdesk.workflow.domain;

public class WorkflowContext {

    private final WorkflowInstance item;

    private final WorkflowTransition transition;

    public WorkflowContext(WorkflowInstance item, WorkflowTransition transition) {
        this.item = item;
        this.transition = transition;
    }

    public WorkflowInstance getItem() {
        return item;
    }

    public WorkflowTransition getTransition() {
        return transition;
    }
}
