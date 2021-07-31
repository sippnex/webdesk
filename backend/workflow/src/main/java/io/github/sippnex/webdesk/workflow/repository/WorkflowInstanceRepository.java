package io.github.sippnex.webdesk.workflow.repository;

import io.github.sippnex.webdesk.workflow.domain.WorkflowInstance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowInstanceRepository extends JpaRepository<WorkflowInstance, Long> {
}
