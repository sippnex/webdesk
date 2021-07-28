package io.github.sippnex.webdesk.workflow.web.rest;

import io.github.sippnex.webdesk.workflow.domain.WorkflowItem;
import io.github.sippnex.webdesk.workflow.service.WorkflowItemService;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/workflow-items")
public class WorkflowItemResource {

    private final WorkflowItemService workflowItemService;

    public WorkflowItemResource(WorkflowItemService workflowItemService) {
        this.workflowItemService = workflowItemService;
    }

    @Transactional
    @PostMapping("")
    public ResponseEntity<WorkflowItem> createWorkflowItem(@RequestBody WorkflowItem workflowItem, @RequestParam Long transitionId) {
        workflowItem = workflowItemService.createWorkflowItem(workflowItem, transitionId);
        Hibernate.initialize(workflowItem.getWorkflow());
        Hibernate.initialize(workflowItem.getCurrentNode());
        Hibernate.initialize(workflowItem.getFormPayload());
        return new ResponseEntity<>(workflowItem, HttpStatus.OK);
    }

    @Transactional
    @PutMapping("")
    public ResponseEntity<WorkflowItem> updateWorkflowItem(@RequestBody WorkflowItem workflowItem, @RequestParam Long transitionId) {
        workflowItem = workflowItemService.updateWorkflowItem(workflowItem, transitionId);
        Hibernate.initialize(workflowItem.getWorkflow());
        Hibernate.initialize(workflowItem.getCurrentNode());
        Hibernate.initialize(workflowItem.getFormPayload());
        return new ResponseEntity<>(workflowItem, HttpStatus.OK);
    }

    @Transactional
    @GetMapping("")
    public ResponseEntity<List<WorkflowItem>> getAllWorkflowItems() {
        return new ResponseEntity<>(
                workflowItemService
                        .getAllWorkflowItems()
                        .stream()
                        .peek(workflowItem -> {
                            Hibernate.initialize(workflowItem.getWorkflow());
                            Hibernate.initialize(workflowItem.getCurrentNode());
                            Hibernate.initialize(workflowItem.getFormPayload());
                        }).collect(Collectors.toList()),
                HttpStatus.OK
        );
    }

    @Transactional
    @GetMapping("{id}")
    public ResponseEntity<WorkflowItem> getWorkflowItem(@PathVariable Long id) {
        return workflowItemService.getWorkflowItemById(id)
                .map(workflowItem -> {
                    Hibernate.initialize(workflowItem.getWorkflow());
                    Hibernate.initialize(workflowItem.getCurrentNode());
                    Hibernate.initialize(workflowItem.getFormPayload());
                    return new ResponseEntity<>(workflowItem, HttpStatus.OK);
                }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
