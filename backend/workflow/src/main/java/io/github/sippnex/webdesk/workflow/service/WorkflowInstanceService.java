package io.github.sippnex.webdesk.workflow.service;

import io.github.sippnex.webdesk.workflow.domain.WorkflowInstance;
import io.github.sippnex.webdesk.workflow.domain.WorkflowTransition;
import io.github.sippnex.webdesk.workflow.domain.form.WorkflowPayloadElement;
import io.github.sippnex.webdesk.workflow.repository.WorkflowInstanceRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class WorkflowInstanceService {

    private final WorkflowService workflowService;

    private final WorkflowInstanceRepository workflowInstanceRepository;

    public WorkflowInstanceService(WorkflowService workflowService, WorkflowInstanceRepository workflowInstanceRepository) {
        this.workflowService = workflowService;
        this.workflowInstanceRepository = workflowInstanceRepository;
    }

    public WorkflowInstance createWorkflowInstance(WorkflowInstance workflowInstance, Long transitionId) {
        workflowInstance.setWorkflow(
                workflowService
                        .getWorkflowById(workflowInstance.getWorkflow().getId())
                        .orElseThrow(() -> new RuntimeException("Workflow with id %d not found".formatted(workflowInstance.getWorkflow().getId())))
        );
        executeInitialTransition(transitionId, workflowInstance);
        return workflowInstanceRepository.save(workflowInstance);
    }

    public WorkflowInstance updateWorkflowInstance(WorkflowInstance workflowInstance, Long transitionId) {
        WorkflowInstance persistedWorkflowInstance = workflowInstanceRepository
                .findById(workflowInstance.getId())
                .orElseThrow(() -> new RuntimeException("Workflow Instance with id %d not found".formatted(workflowInstance.getId())));
        executeTransition(transitionId, persistedWorkflowInstance, Optional.of(workflowInstance));
        return workflowInstanceRepository.save(persistedWorkflowInstance);
    }

    public List<WorkflowInstance> getAllWorkflowInstances() {
        return workflowInstanceRepository.findAll();
    }

    public Optional<WorkflowInstance> getWorkflowInstanceById(Long id) {
        return workflowInstanceRepository.findById(id);
    }

    private void executeInitialTransition(Long transitionId, WorkflowInstance workflowInstance) {
        executeTransition(transitionId, workflowInstance, Optional.empty());
    }

    private void executeTransition(Long transitionId, WorkflowInstance workflowInstance, Optional<WorkflowInstance> newWorkflowItem) {
        final WorkflowTransition transition = workflowInstance.getWorkflow().getTransitions().stream()
                .filter(tr -> tr.getId().equals(transitionId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Workflow Transition with id %d not found".formatted(transitionId)));

        if (!Objects.equals(transition.getSourceNode(), workflowInstance.getCurrentNode())) {
            throw new RuntimeException("Illegal Transition: Workflow Item is not in correct node. Expected: %s, Actual: %s".formatted(transition.getSourceNode(), workflowInstance.getCurrentNode()));
        }

        // TODO: implement transition logic (form payload update etc)
        if (newWorkflowItem.isPresent()) {
            final List<WorkflowPayloadElement> formPayload = new ArrayList<>();
            newWorkflowItem.get().getFormPayload().forEach(payloadElement -> {
                payloadElement.setWorkflowItem(workflowInstance);
                formPayload.add(payloadElement);
            });
            workflowInstance.setFormPayload(formPayload);
        } else {
            workflowInstance.getFormPayload().forEach(formPayload -> formPayload.setWorkflowItem(workflowInstance));
        }

        workflowInstance.setCurrentNode(transition.getTargetNode());
    }

}
