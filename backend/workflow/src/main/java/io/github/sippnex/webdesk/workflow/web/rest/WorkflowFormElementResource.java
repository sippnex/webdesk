package io.github.sippnex.webdesk.workflow.web.rest;

import io.github.sippnex.webdesk.workflow.domain.form.WorkflowFormElement;
import io.github.sippnex.webdesk.workflow.service.WorkflowFormElementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflow/form-elements")
public class WorkflowFormElementResource {

    private final WorkflowFormElementService workflowFormElementService;

    public WorkflowFormElementResource(WorkflowFormElementService workflowFormElementService) {
        this.workflowFormElementService = workflowFormElementService;
    }

    @PostMapping("")
    public ResponseEntity<WorkflowFormElement> createFormElement(@RequestBody WorkflowFormElement formElement) {
        formElement = workflowFormElementService.createFormElement(formElement);
        return new ResponseEntity<>(formElement, HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<WorkflowFormElement> updateTransition(@RequestBody WorkflowFormElement formElement) {
        formElement = workflowFormElementService.updateFormElement(formElement);
        return new ResponseEntity<>(formElement, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<WorkflowFormElement>> getAllFormElements() {
        return new ResponseEntity<>(workflowFormElementService.getAllFormElements(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<WorkflowFormElement> getFormElement(@PathVariable Long id) {
        return workflowFormElementService.getFormElementById(id)
                .map(formElement -> new ResponseEntity<>(formElement, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
