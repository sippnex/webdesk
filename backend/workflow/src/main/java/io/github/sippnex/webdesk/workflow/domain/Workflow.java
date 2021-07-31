package io.github.sippnex.webdesk.workflow.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import io.github.sippnex.webdesk.core.util.Updatable;
import io.github.sippnex.webdesk.core.util.UpdateUtil;
import io.github.sippnex.webdesk.workflow.domain.form.WorkflowFormElement;
import io.github.sippnex.webdesk.workflow.web.rest.WorkflowResource;

import javax.persistence.*;
import java.util.List;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id",
        resolver = WorkflowResource.class
)
public class Workflow implements Updatable<Workflow, Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "workflow", orphanRemoval = true)
    private List<WorkflowNode> nodes;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "workflow", orphanRemoval = true)
    private List<WorkflowTransition> transitions;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "workflow", orphanRemoval = true)
    private List<WorkflowFormElement> formElements;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<WorkflowNode> getNodes() {
        return nodes;
    }

    public void setNodes(List<WorkflowNode> nodes) {
        this.nodes = nodes;
    }

    public List<WorkflowTransition> getTransitions() {
        return transitions;
    }

    public void setTransitions(List<WorkflowTransition> transitions) {
        this.transitions = transitions;
    }

    public List<WorkflowFormElement> getFormElements() {
        return formElements;
    }

    public void setFormElements(List<WorkflowFormElement> formElements) {
        this.formElements = formElements;
    }

    public void update(Workflow workflow) {
        // update basic attributes
        this.name = workflow.getName();

        // update nodes
        this.nodes = UpdateUtil.updateList(this.nodes, workflow.getNodes());

        // update transitions
        this.transitions = UpdateUtil.updateList(this.transitions, workflow.getTransitions());

        // update form elements
        this.formElements = UpdateUtil.updateList(this.formElements, workflow.getFormElements());
    }

}
