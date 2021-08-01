package io.github.sippnex.webdesk.workflow.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.github.sippnex.webdesk.workflow.domain.form.WorkflowPayloadElement;

import javax.persistence.*;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Entity
public class WorkflowInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Workflow workflow;

    @ManyToOne
    private WorkflowNode currentNode;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL)
    private List<WorkflowPayloadElement> formPayload;

    public WorkflowInstance() {
    }

    public WorkflowInstance(Workflow workflow) {
        this.workflow = workflow;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }

    public WorkflowNode getCurrentNode() {
        return currentNode;
    }

    public void setCurrentNode(WorkflowNode currentNode) {
        this.currentNode = currentNode;
    }

    public List<WorkflowPayloadElement> getFormPayload() {
        return formPayload;
    }

    public void setFormPayload(List<WorkflowPayloadElement> formPayload) {
        this.formPayload = formPayload;
    }

    @Transient
    public List<WorkflowTransition> getAvailableTransitions() {
        return workflow.getTransitions().stream()
                .filter(transition -> Objects.equals(transition.getSourceNode(), currentNode))
                .sorted(Comparator.comparingInt(WorkflowTransition::getOrder))
                .collect(Collectors.toList());
    }
}
