package io.github.sippnex.webdesk.workflow.domain;

import io.github.sippnex.webdesk.core.util.Updatable;

import javax.persistence.*;
import java.util.List;

@Entity
public abstract class WorkflowAction implements Updatable<WorkflowAction, Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Transient
    private List<WorkflowActionParameter> inputParameters;

    @Transient
    private List<WorkflowActionParameter> outputParameters;

    protected WorkflowAction() {
    }

    public abstract Class<? extends WorkflowActionRunner> getRunner();

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

    public List<WorkflowActionParameter> getInputParameters() {
        return inputParameters;
    }

    public void setInputParameters(List<WorkflowActionParameter> inputParameters) {
        this.inputParameters = inputParameters;
    }

    public List<WorkflowActionParameter> getOutputParameters() {
        return outputParameters;
    }

    public void setOutputParameters(List<WorkflowActionParameter> outputParameters) {
        this.outputParameters = outputParameters;
    }

    public void update(WorkflowAction action) {
        // update basic attributes
        this.name = action.getName();
    }

}
