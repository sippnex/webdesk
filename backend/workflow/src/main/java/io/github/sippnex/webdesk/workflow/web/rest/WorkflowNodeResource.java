package io.github.sippnex.webdesk.workflow.web.rest;

import io.github.sippnex.webdesk.workflow.domain.WorkflowNode;
import io.github.sippnex.webdesk.workflow.service.WorkflowNodeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflow/nodes")
public class WorkflowNodeResource {

    private final WorkflowNodeService workflowNodeService;

    public WorkflowNodeResource(WorkflowNodeService workflowNodeService) {
        this.workflowNodeService = workflowNodeService;
    }

    @PostMapping("")
    public ResponseEntity<WorkflowNode> createNode(@RequestBody WorkflowNode node) {
        node = workflowNodeService.createNode(node);
        return new ResponseEntity<>(node, HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<WorkflowNode> updateWorkflow(@RequestBody WorkflowNode node) {
        node = workflowNodeService.updateNode(node);
        return new ResponseEntity<>(node, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<WorkflowNode>> getAllNodes(@RequestParam(required = false) Long workflowId) {
        final List<WorkflowNode> nodes;
        if (workflowId != null) {
            nodes = workflowNodeService.getAllNodesByWorkflowId(workflowId);
        } else {
            nodes = workflowNodeService.getAllNodes();
        }
        return new ResponseEntity<>(nodes, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<WorkflowNode> getNode(@PathVariable Long id) {
        return workflowNodeService.getNodeById(id)
                .map(node -> new ResponseEntity<>(node, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
