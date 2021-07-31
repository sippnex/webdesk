package io.github.sippnex.webdesk.workflow.web.converter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.node.IntNode;
import com.fasterxml.jackson.databind.node.LongNode;
import io.github.sippnex.webdesk.workflow.domain.WorkflowNode;
import io.github.sippnex.webdesk.workflow.service.WorkflowNodeService;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class WorkflowNodeDeserializer extends JsonDeserializer<WorkflowNode> {

    private final WorkflowNodeService workflowNodeService;

    public WorkflowNodeDeserializer(WorkflowNodeService workflowNodeService) {
        this.workflowNodeService = workflowNodeService;
    }

    @Override
    public WorkflowNode deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        final TreeNode jsonTree = jsonParser.getCodec().readTree(jsonParser);
        final Long id = ((IntNode) jsonTree.get("id")).longValue();
        return workflowNodeService.getNodeById(id)
                .orElseThrow(() -> new RuntimeException("Workflow Node with id %d not found".formatted(id)));
    }
}
