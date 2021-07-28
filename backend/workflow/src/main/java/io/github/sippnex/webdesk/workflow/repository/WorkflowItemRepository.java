package io.github.sippnex.webdesk.workflow.repository;

import io.github.sippnex.webdesk.workflow.domain.WorkflowItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowItemRepository extends JpaRepository<WorkflowItem, Long> {
}
