package io.github.sippnex.webdesk.workflow.web.rest;

import io.github.sippnex.webdesk.workflow.domain.WorkflowInstance;
import io.github.sippnex.webdesk.workflow.service.WorkflowInstanceService;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/workflow/instances")
public class WorkflowInstanceResource {

    private final WorkflowInstanceService workflowInstanceService;

    public WorkflowInstanceResource(WorkflowInstanceService workflowInstanceService) {
        this.workflowInstanceService = workflowInstanceService;
    }

    @Transactional
    @PostMapping("")
    public ResponseEntity<WorkflowInstance> createWorkflowInstance(@RequestBody WorkflowInstance workflowInstance, @RequestParam Long transitionId) {
        workflowInstance = workflowInstanceService.createWorkflowInstance(workflowInstance, transitionId);
        Hibernate.initialize(workflowInstance.getWorkflow());
        Hibernate.initialize(workflowInstance.getCurrentNode());
        Hibernate.initialize(workflowInstance.getFormPayload());
        return new ResponseEntity<>(workflowInstance, HttpStatus.OK);
    }

    @Transactional
    @PutMapping("")
    public ResponseEntity<WorkflowInstance> updateWorkflowInstance(@RequestBody WorkflowInstance workflowInstance, @RequestParam Long transitionId) {
        workflowInstance = workflowInstanceService.updateWorkflowInstance(workflowInstance, transitionId);
        Hibernate.initialize(workflowInstance.getWorkflow());
        Hibernate.initialize(workflowInstance.getCurrentNode());
        Hibernate.initialize(workflowInstance.getFormPayload());
        return new ResponseEntity<>(workflowInstance, HttpStatus.OK);
    }

    @Transactional
    @GetMapping("")
    public ResponseEntity<List<WorkflowInstance>> getAllWorkflowInstances() {
        return new ResponseEntity<>(
                workflowInstanceService
                        .getAllWorkflowInstances()
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
    public ResponseEntity<WorkflowInstance> getWorkflowInstance(@PathVariable Long id) {
        return workflowInstanceService.getWorkflowInstanceById(id)
                .map(workflowItem -> {
                    Hibernate.initialize(workflowItem.getWorkflow());
                    Hibernate.initialize(workflowItem.getCurrentNode());
                    Hibernate.initialize(workflowItem.getFormPayload());
                    return new ResponseEntity<>(workflowItem, HttpStatus.OK);
                }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
