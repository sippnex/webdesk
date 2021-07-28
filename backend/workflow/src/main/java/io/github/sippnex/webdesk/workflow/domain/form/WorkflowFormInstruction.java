package io.github.sippnex.webdesk.workflow.domain.form;

import javax.persistence.*;

@Entity
public class WorkflowFormInstruction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private WorkflowFormElement element;

    private Boolean required;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WorkflowFormElement getElement() {
        return element;
    }

    public void setElement(WorkflowFormElement element) {
        this.element = element;
    }

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }
}
