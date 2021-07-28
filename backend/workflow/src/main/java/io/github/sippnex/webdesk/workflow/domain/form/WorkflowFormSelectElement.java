package io.github.sippnex.webdesk.workflow.domain.form;

import io.github.sippnex.webdesk.core.util.UpdateUtil;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class WorkflowFormSelectElement extends WorkflowFormElement {

    @OneToMany(cascade = CascadeType.ALL)
    private List<WorkflowFormSelectOption> options;

    public List<WorkflowFormSelectOption> getOptions() {
        return options;
    }

    public void setOptions(List<WorkflowFormSelectOption> options) {
        this.options = options;
    }

    @Override
    public void update(WorkflowFormElement formElement) {
        super.update(formElement);
        if (formElement instanceof WorkflowFormSelectElement) {
            this.options = UpdateUtil.updateList(this.options, ((WorkflowFormSelectElement) formElement).getOptions());
        }
    }
}
