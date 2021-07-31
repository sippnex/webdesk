package io.github.sippnex.webdesk.workflow.service;

import io.github.sippnex.webdesk.workflow.domain.WorkflowNode;
import io.github.sippnex.webdesk.workflow.domain.WorkflowTransition;
import io.github.sippnex.webdesk.workflow.repository.WorkflowNodeRepository;
import io.github.sippnex.webdesk.workflow.repository.WorkflowTransitionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkflowTransitionService {

    private final WorkflowTransitionRepository workflowTransitionRepository;

    public WorkflowTransitionService(WorkflowTransitionRepository workflowTransitionRepository) {
        this.workflowTransitionRepository = workflowTransitionRepository;
    }

    public WorkflowTransition createTransition(WorkflowTransition transition) {
        return workflowTransitionRepository.save(transition);
    }

    public WorkflowTransition updateTransition(WorkflowTransition transition) {
        WorkflowTransition persistedTransition = workflowTransitionRepository
                .findById(transition.getId())
                .orElseThrow(() -> new RuntimeException("Workflow Transition with id %d not found".formatted(transition.getId())));
        persistedTransition.update(transition);
        return workflowTransitionRepository.save(persistedTransition);
    }

    public List<WorkflowTransition> getAllTransitions() {
        return workflowTransitionRepository.findAll();
    }

    public Optional<WorkflowTransition> getTransitionById(Long id) {
        return workflowTransitionRepository.findById(id);
    }
}
