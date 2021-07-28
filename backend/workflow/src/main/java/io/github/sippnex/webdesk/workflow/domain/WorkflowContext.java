package io.github.sippnex.webdesk.workflow.domain;

public class WorkflowContext {

    private final WorkflowItem item;

    private final WorkflowTransition transition;

    public WorkflowContext(WorkflowItem item, WorkflowTransition transition) {
        this.item = item;
        this.transition = transition;
    }

    public WorkflowItem getItem() {
        return item;
    }

    public WorkflowTransition getTransition() {
        return transition;
    }
}
