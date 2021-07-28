package io.github.sippnex.webdesk.workflow.repository;

import io.github.sippnex.webdesk.workflow.domain.Workflow;
import io.github.sippnex.webdesk.workflow.domain.WorkflowNode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowNodeRepository extends JpaRepository<WorkflowNode, Long> {

}
