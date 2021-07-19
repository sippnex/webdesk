package io.github.sippnex.webdesk.core.dashboard.web.dto;

import io.github.sippnex.webdesk.core.dashboard.domain.WidgetDashboardItem;
import io.github.sippnex.webdesk.core.widget.web.dto.RocketWidgetDto;

public class WidgetDashboardItemDto extends DashboardItemDto {

    private RocketWidgetDto widget;

    public WidgetDashboardItemDto(WidgetDashboardItem widgetDashboardItem) {
        super(widgetDashboardItem);
        this.widget = new RocketWidgetDto(widgetDashboardItem.getWidget());
    }

    public RocketWidgetDto getWidget() {
        return widget;
    }

    public void setWidget(RocketWidgetDto widget) {
        this.widget = widget;
    }
}
