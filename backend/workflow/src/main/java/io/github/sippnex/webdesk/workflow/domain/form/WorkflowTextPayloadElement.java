package io.github.sippnex.webdesk.workflow.domain.form;

import javax.persistence.Entity;

@Entity
public class WorkflowTextPayloadElement extends WorkflowPayloadElement {

    private String value;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
