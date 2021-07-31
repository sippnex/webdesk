package io.github.sippnex.webdesk.workflow.service;

import io.github.sippnex.webdesk.workflow.domain.form.WorkflowFormElement;
import io.github.sippnex.webdesk.workflow.repository.WorkflowFormElementRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkflowFormElementService {

    private final WorkflowFormElementRepository workflowFormElementRepository;

    public WorkflowFormElementService(WorkflowFormElementRepository workflowFormElementRepository) {
        this.workflowFormElementRepository = workflowFormElementRepository;
    }

    public WorkflowFormElement createFormElement(WorkflowFormElement transition) {
        return workflowFormElementRepository.save(transition);
    }

    public WorkflowFormElement updateFormElement(WorkflowFormElement formElement) {
        WorkflowFormElement persistedFormElement = workflowFormElementRepository
                .findById(formElement.getId())
                .orElseThrow(() -> new RuntimeException("Workflow Form Element with id %d not found".formatted(formElement.getId())));
        persistedFormElement.update(formElement);
        return workflowFormElementRepository.save(persistedFormElement);
    }

    public List<WorkflowFormElement> getAllFormElements() {
        return workflowFormElementRepository.findAll();
    }

    public Optional<WorkflowFormElement> getFormElementById(Long id) {
        return workflowFormElementRepository.findById(id);
    }
}
