package io.github.sippnex.webdesk.workflow.service;

import io.github.sippnex.webdesk.workflow.domain.WorkflowNode;
import io.github.sippnex.webdesk.workflow.repository.WorkflowNodeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkflowNodeService {

    private final WorkflowNodeRepository workflowNodeRepository;

    public WorkflowNodeService(WorkflowNodeRepository workflowNodeRepository) {
        this.workflowNodeRepository = workflowNodeRepository;
    }

    public WorkflowNode createNode(WorkflowNode node) {
        return workflowNodeRepository.save(node);
    }

    public WorkflowNode updateNode(WorkflowNode node) {
        WorkflowNode persistedNode = workflowNodeRepository
                .findById(node.getId())
                .orElseThrow(() -> new RuntimeException("Workflow Node with id %d not found".formatted(node.getId())));
        persistedNode.update(node);
        return workflowNodeRepository.save(persistedNode);
    }

    public List<WorkflowNode> getAllNodes() {
        return workflowNodeRepository.findAll();
    }

    public Optional<WorkflowNode> getNodeById(Long id) {
        return workflowNodeRepository.findById(id);
    }
}
