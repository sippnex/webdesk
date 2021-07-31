package io.github.sippnex.webdesk.workflow.repository;

import io.github.sippnex.webdesk.workflow.domain.WorkflowNode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkflowNodeRepository extends JpaRepository<WorkflowNode, Long> {

    List<WorkflowNode> findAllByWorkflowId(Long workflowId);

}
