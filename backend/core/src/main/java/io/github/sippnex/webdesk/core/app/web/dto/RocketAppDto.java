package io.github.sippnex.webdesk.core.app.web.dto;

import io.github.sippnex.webdesk.core.app.domain.App;

public class RocketAppDto {

    private String type;

    private String name;

    private String description;

    public RocketAppDto(App app) {
        this.type = app.getClass().getSimpleName();
        this.name = app.getName();
        this.description = app.getDescription();
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
