package io.github.sippnex.webdesk.workflow.domain.form;

import java.time.LocalDate;
import java.util.List;

public class WorkflowFormDatePickerElement extends WorkflowFormElement {

    public static class DateMarking {

        private LocalDate date;

        private String description;

        private String rgbColor;

        private Boolean disabled;

        public DateMarking(LocalDate date, String description, String rgbColor, Boolean disabled) {
            this.date = date;
            this.description = description;
            this.rgbColor = rgbColor;
            this.disabled = disabled;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
            this.date = date;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getRgbColor() {
            return rgbColor;
        }

        public void setRgbColor(String rgbColor) {
            this.rgbColor = rgbColor;
        }

        public Boolean getDisabled() {
            return disabled;
        }

        public void setDisabled(Boolean disabled) {
            this.disabled = disabled;
        }
    }

    public static abstract class DateMarkingRunner {
        public abstract List<DateMarking> execute();
    }

    private List<Class<? extends DateMarkingRunner>> dateMarkingRunners;

    public List<Class<? extends DateMarkingRunner>> getDateMarkingRunners() {
        return dateMarkingRunners;
    }

    public void setDateMarkingRunners(List<Class<? extends DateMarkingRunner>> dateMarkingRunners) {
        this.dateMarkingRunners = dateMarkingRunners;
    }
}