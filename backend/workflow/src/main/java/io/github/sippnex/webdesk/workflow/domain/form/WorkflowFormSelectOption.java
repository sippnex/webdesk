package io.github.sippnex.webdesk.workflow.domain.form;

import io.github.sippnex.webdesk.core.util.Updatable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WorkflowFormSelectOption implements Updatable<WorkflowFormSelectOption, Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String value;

    @Override
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public void update(WorkflowFormSelectOption selectOption) {
        this.value = selectOption.getValue();
    }

}
