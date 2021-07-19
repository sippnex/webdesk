package io.github.sippnex.webdesk.core.widget.web.dto;

import io.github.sippnex.webdesk.core.widget.domain.Widget;

public class RocketWidgetDto {

    private String type;

    private String name;

    private String description;

    public RocketWidgetDto(Widget widget) {
        this.type = widget.getClass().getSimpleName();
        this.name = widget.getName();
        this.description = widget.getDescription();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
