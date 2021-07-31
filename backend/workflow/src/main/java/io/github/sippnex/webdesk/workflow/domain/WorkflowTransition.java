package io.github.sippnex.webdesk.workflow.domain;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.github.sippnex.webdesk.core.util.Updatable;
import io.github.sippnex.webdesk.core.util.UpdateUtil;
import io.github.sippnex.webdesk.workflow.web.converter.WorkflowNodeDeserializer;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class WorkflowTransition implements Updatable<WorkflowTransition, Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String icon;

    @ManyToOne
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("workflowId")
    private Workflow workflow;

    @Column(name = "`primary`")
    private Boolean primary = false;

    @JsonDeserialize(using = WorkflowNodeDeserializer.class)
    @ManyToOne(cascade = CascadeType.ALL)
    private WorkflowNode sourceNode;

    @JsonDeserialize(using = WorkflowNodeDeserializer.class)
    @ManyToOne(cascade = CascadeType.ALL)
    private WorkflowNode targetNode;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<WorkflowAction> actions = new ArrayList<>();

    @Override
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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Boolean getPrimary() {
        return primary;
    }

    public void setPrimary(Boolean primary) {
        this.primary = primary;
    }

    public WorkflowNode getSourceNode() {
        return sourceNode;
    }

    public void setSourceNode(WorkflowNode sourceNode) {
        this.sourceNode = sourceNode;
    }

    public WorkflowNode getTargetNode() {
        return targetNode;
    }

    public void setTargetNode(WorkflowNode targetNode) {
        this.targetNode = targetNode;
    }

    public List<WorkflowAction> getActions() {
        return actions;
    }

    public void setActions(List<WorkflowAction> actions) {
        this.actions = actions;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }

    @Override
    public void update(WorkflowTransition transition) {
        // update basic attributes
        this.name = transition.getName();
        this.icon = transition.getIcon();
        this.primary = transition.getPrimary();

        // update source node
        if (transition.getSourceNode() != null && this.sourceNode != null) {
            this.sourceNode.update(transition.getSourceNode());
        } else {
            this.sourceNode = transition.getSourceNode();
        }

        // update target node
        if (transition.getTargetNode() != null && this.targetNode != null) {
            this.targetNode.update(transition.getTargetNode());
        } else {
            this.targetNode = transition.getTargetNode();
        }

        // update actions
        this.actions = UpdateUtil.updateList(this.actions, transition.getActions());
    }

    @Override
    public String toString() {
        return name;
    }
}
