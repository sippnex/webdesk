package io.github.sippnex.webdesk.workflow.repository;

import io.github.sippnex.webdesk.workflow.domain.form.WorkflowFormElement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowFormElementRepository extends JpaRepository<WorkflowFormElement, Long> {

}
