package io.github.sippnex.webdesk.core.security.web.dto;

import io.github.sippnex.webdesk.core.security.domain.User;

public class UserDto {

    private Long id;

    private String username;

    private Long dashboardId;

    public UserDto(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getDashboardId() {
        return dashboardId;
    }

    public void setDashboardId(Long dashboardId) {
        this.dashboardId = dashboardId;
    }
}
