package io.github.sippnex.webdesk.workflow.domain;

import javax.persistence.Entity;

@Entity
public class AppNotificationWorkflowAction extends WorkflowAction {

    @Override
    public Class<? extends WorkflowActionRunner> getRunner() {
        return null;
    }
}
