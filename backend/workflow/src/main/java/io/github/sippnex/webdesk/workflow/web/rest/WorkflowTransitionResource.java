package io.github.sippnex.webdesk.workflow.web.rest;

import io.github.sippnex.webdesk.workflow.domain.WorkflowTransition;
import io.github.sippnex.webdesk.workflow.service.WorkflowTransitionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflow/transitions")
public class WorkflowTransitionResource {

    private final WorkflowTransitionService workflowTransitionService;

    public WorkflowTransitionResource(WorkflowTransitionService workflowTransitionService) {
        this.workflowTransitionService = workflowTransitionService;
    }

    @PostMapping("")
    public ResponseEntity<WorkflowTransition> createTransition(@RequestBody WorkflowTransition transition) {
        transition = workflowTransitionService.createTransition(transition);
        return new ResponseEntity<>(transition, HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<WorkflowTransition> updateTransition(@RequestBody WorkflowTransition transition) {
        transition = workflowTransitionService.updateTransition(transition);
        return new ResponseEntity<>(transition, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<WorkflowTransition>> getAllTransitions() {
        return new ResponseEntity<>(workflowTransitionService.getAllTransitions(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<WorkflowTransition> getTransition(@PathVariable Long id) {
        return workflowTransitionService.getTransitionById(id)
                .map(transition -> new ResponseEntity<>(transition, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
