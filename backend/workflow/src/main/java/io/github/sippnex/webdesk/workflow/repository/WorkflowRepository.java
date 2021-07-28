package io.github.sippnex.webdesk.workflow.repository;

import io.github.sippnex.webdesk.workflow.domain.Workflow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowRepository extends JpaRepository<Workflow, Long> {

}
