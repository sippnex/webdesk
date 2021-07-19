package io.github.sippnex.webdesk.core.dashboard.web.dto;

import io.github.sippnex.webdesk.core.app.web.dto.RocketAppDto;
import io.github.sippnex.webdesk.core.dashboard.domain.AppDashboardItem;

public class AppDashboardItemDto extends DashboardItemDto {

    private RocketAppDto app;

    public AppDashboardItemDto(AppDashboardItem appDashboardItem) {
        super(appDashboardItem);
        this.app = new RocketAppDto(appDashboardItem.getApp());
    }

    public RocketAppDto getApp() {
        return app;
    }

    public void setApp(RocketAppDto app) {
        this.app = app;
    }
}
