package io.github.sippnex.webdesk.workflow.service;

import io.github.sippnex.webdesk.workflow.domain.Workflow;
import io.github.sippnex.webdesk.workflow.repository.WorkflowRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkflowService {

    private final WorkflowRepository workflowRepository;

    public WorkflowService(WorkflowRepository workflowRepository) {
        this.workflowRepository = workflowRepository;
    }

    public Workflow createWorkflow(Workflow workflow) {
        return workflowRepository.save(workflow);
    }

    public Workflow updateWorkflow(Workflow workflow) {
        Workflow persistedWorkflow = workflowRepository
                .findById(workflow.getId())
                .orElseThrow(() -> new RuntimeException("Workflow with id %d not found".formatted(workflow.getId())));
        persistedWorkflow.update(workflow);
        return workflowRepository.save(persistedWorkflow);
    }

    public List<Workflow> getAllWorkflows() {
        return workflowRepository.findAll();
    }

    public Optional<Workflow> getWorkflowById(Long id) {
        return workflowRepository.findById(id);
    }

}
