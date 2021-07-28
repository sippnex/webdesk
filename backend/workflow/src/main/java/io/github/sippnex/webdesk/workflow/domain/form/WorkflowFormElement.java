package io.github.sippnex.webdesk.workflow.domain.form;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import io.github.sippnex.webdesk.core.util.Updatable;
import io.github.sippnex.webdesk.workflow.domain.Workflow;

import javax.persistence.*;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = WorkflowFormTextElement.class, name = "WorkflowFormTextElement"),
        @JsonSubTypes.Type(value = WorkflowFormRichTextElement.class, name = "WorkflowFormRichTextElement"),
        @JsonSubTypes.Type(value = WorkflowFormSelectElement.class, name = "WorkflowFormSelectElement"),
        @JsonSubTypes.Type(value = WorkflowFormDatePickerElement.class, name = "WorkflowFormDatePickerElement"),
        @JsonSubTypes.Type(value = WorkflowFormDateRangePickerElement.class, name = "WorkflowFormDateRangePickerElement")
})
@Entity
public abstract class WorkflowFormElement implements Updatable<WorkflowFormElement, Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String displayName;

    @ManyToOne
    @JsonIgnore
    private Workflow workflow;

    public WorkflowFormElement() {
    }

    public WorkflowFormElement(String name) {
        this.name = name;
    }

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

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }

    @Override
    public void update(WorkflowFormElement formElement) {
        this.name = formElement.getName();
        this.displayName = formElement.getDisplayName();
    }
}
