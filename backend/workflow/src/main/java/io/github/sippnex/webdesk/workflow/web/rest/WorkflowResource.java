package io.github.sippnex.webdesk.workflow.web.rest;

import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdResolver;
import io.github.sippnex.webdesk.workflow.domain.Workflow;
import io.github.sippnex.webdesk.workflow.service.WorkflowService;
import org.hibernate.Hibernate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/workflow/workflows")
public class WorkflowResource implements ObjectIdResolver {

    private final WorkflowService workflowService;

    public WorkflowResource(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    @Transactional
    @PostMapping("")
    public ResponseEntity<Workflow> createWorkflow(@RequestBody Workflow workflow) {
        workflow = workflowService.createWorkflow(workflow);
        Hibernate.initialize(workflow.getNodes());
        Hibernate.initialize(workflow.getTransitions());
        Hibernate.initialize(workflow.getFormElements());
        return new ResponseEntity<>(workflow, HttpStatus.OK);
    }

    @Transactional
    @PutMapping("")
    public ResponseEntity<Workflow> updateWorkflow(@RequestBody Workflow workflow) {
        workflow = workflowService.updateWorkflow(workflow);
        Hibernate.initialize(workflow.getNodes());
        Hibernate.initialize(workflow.getTransitions());
        Hibernate.initialize(workflow.getFormElements());
        return new ResponseEntity<>(workflow, HttpStatus.OK);
    }

    @Transactional
    @GetMapping("")
    public ResponseEntity<List<Workflow>> getAllWorkflows() {
        return new ResponseEntity<>(
                workflowService
                        .getAllWorkflows()
                        .stream()
                        .peek(workflow -> {
                            Hibernate.initialize(workflow.getNodes());
                            Hibernate.initialize(workflow.getTransitions());
                            Hibernate.initialize(workflow.getFormElements());
                        }).collect(Collectors.toList()),
                HttpStatus.OK
        );
    }

    @Transactional
    @GetMapping("{id}")
    public ResponseEntity<Workflow> getWorkflow(@PathVariable Long id) {
        return workflowService.getWorkflowById(id)
                .map(workflow -> {
                    Hibernate.initialize(workflow.getNodes());
                    Hibernate.initialize(workflow.getTransitions());
                    Hibernate.initialize(workflow.getFormElements());
                    return new ResponseEntity<>(workflow, HttpStatus.OK);
                }).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public void bindItem(ObjectIdGenerator.IdKey id, Object pojo) {

    }

    @Override
    public Object resolveId(ObjectIdGenerator.IdKey id) {
        return workflowService.getWorkflowById((Long) id.key)
                .orElseThrow(() -> new RuntimeException("Workflow with id %d not found".formatted(id.key)));
    }

    @Override
    public ObjectIdResolver newForDeserialization(Object context) {
        return this;
    }

    @Override
    public boolean canUseFor(ObjectIdResolver resolverType) {
        return false;
    }
}
