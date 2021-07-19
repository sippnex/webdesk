package io.github.sippnex.webdesk.core.app.domain;

import java.io.Serializable;

public class App implements Serializable {

    private String name;

    private String title;

    private String description;

    public App() {
    }

    public App(String name, String title, String description) {
        this.name = name;
        this.title = title;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
