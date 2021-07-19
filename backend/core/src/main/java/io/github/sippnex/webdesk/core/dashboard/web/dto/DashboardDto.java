package io.github.sippnex.webdesk.core.dashboard.web.dto;

import io.github.sippnex.webdesk.core.dashboard.domain.AppDashboardItem;
import io.github.sippnex.webdesk.core.dashboard.domain.Dashboard;
import io.github.sippnex.webdesk.core.dashboard.domain.WidgetDashboardItem;
import io.github.sippnex.webdesk.core.security.web.dto.UserDto;

import java.util.List;
import java.util.stream.Collectors;

public class DashboardDto {

    private Long id;

    private String name;

    private UserDto user;

    private List<DashboardItemDto> items;

    public DashboardDto(Dashboard dashboard) {
        this.id = dashboard.getId();
        this.user = new UserDto(dashboard.getUser());
        this.items = dashboard.getItems().stream()
                .map(dashboardItem -> {
                    if (dashboardItem instanceof AppDashboardItem) {
                        return new AppDashboardItemDto((AppDashboardItem) dashboardItem);
                    } else {
                        return new WidgetDashboardItemDto((WidgetDashboardItem) dashboardItem);
                    }
                }).collect(Collectors.toList());
    }

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

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public List<DashboardItemDto> getItems() {
        return items;
    }

    public void setItems(List<DashboardItemDto> items) {
        this.items = items;
    }
}
