package io.github.sippnex.webdesk.workflow.domain;

import java.util.Map;

public abstract class WorkflowActionRunner {

    public abstract Map<String, Object> execute(Map<String, Object> inputParameters);

}
