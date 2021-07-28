package io.github.sippnex.webdesk.workflow.service;

import io.github.sippnex.webdesk.workflow.domain.WorkflowItem;
import io.github.sippnex.webdesk.workflow.domain.WorkflowTransition;
import io.github.sippnex.webdesk.workflow.domain.form.WorkflowPayloadElement;
import io.github.sippnex.webdesk.workflow.repository.WorkflowItemRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class WorkflowItemService {

    private final WorkflowService workflowService;

    private final WorkflowItemRepository workflowItemRepository;

    public WorkflowItemService(WorkflowService workflowService, WorkflowItemRepository workflowItemRepository) {
        this.workflowService = workflowService;
        this.workflowItemRepository = workflowItemRepository;
    }

    public WorkflowItem createWorkflowItem(WorkflowItem workflowItem, Long transitionId) {
        workflowItem.setWorkflow(
                workflowService
                        .getWorkflowById(workflowItem.getWorkflow().getId())
                        .orElseThrow(() -> new RuntimeException("Workflow with id %d not found".formatted(workflowItem.getWorkflow().getId())))
        );
        executeInitialTransition(transitionId, workflowItem);
        return workflowItemRepository.save(workflowItem);
    }

    public WorkflowItem updateWorkflowItem(WorkflowItem workflowItem, Long transitionId) {
        WorkflowItem persistedWorkflowItem = workflowItemRepository
                .findById(workflowItem.getId())
                .orElseThrow(() -> new RuntimeException("Workflow Item with id %d not found".formatted(workflowItem.getId())));
        executeTransition(transitionId, persistedWorkflowItem, Optional.of(workflowItem));
        return workflowItemRepository.save(persistedWorkflowItem);
    }

    public List<WorkflowItem> getAllWorkflowItems() {
        return workflowItemRepository.findAll();
    }

    public Optional<WorkflowItem> getWorkflowItemById(Long id) {
        return workflowItemRepository.findById(id);
    }

    private void executeInitialTransition(Long transitionId, WorkflowItem workflowItem) {
        executeTransition(transitionId, workflowItem, Optional.empty());
    }

    private void executeTransition(Long transitionId, WorkflowItem workflowItem, Optional<WorkflowItem> newWorkflowItem) {
        final WorkflowTransition transition = workflowItem.getWorkflow().getTransitions().stream()
                .filter(tr -> tr.getId().equals(transitionId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Workflow Transition with id %d not found".formatted(transitionId)));

        if (!Objects.equals(transition.getSourceNode(), workflowItem.getCurrentNode())) {
            throw new RuntimeException("Illegal Transition: Workflow Item is not in correct node. Expected: %s, Actual: %s".formatted(transition.getSourceNode(), workflowItem.getCurrentNode()));
        }

        // TODO: implement transition logic (form payload update etc)
        if (newWorkflowItem.isPresent()) {
            final List<WorkflowPayloadElement> formPayload = new ArrayList<>();
            newWorkflowItem.get().getFormPayload().forEach(payloadElement -> {
                payloadElement.setWorkflowItem(workflowItem);
                formPayload.add(payloadElement);
            });
            workflowItem.setFormPayload(formPayload);
        } else {
            workflowItem.getFormPayload().forEach(formPayload -> formPayload.setWorkflowItem(workflowItem));
        }

        workflowItem.setCurrentNode(transition.getTargetNode());
    }

}
