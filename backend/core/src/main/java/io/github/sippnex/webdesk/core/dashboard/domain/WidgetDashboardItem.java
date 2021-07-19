package io.github.sippnex.webdesk.core.dashboard.domain;

import io.github.sippnex.webdesk.core.widget.domain.Widget;
import io.github.sippnex.webdesk.core.widget.util.WidgetConverter;

import javax.persistence.Convert;
import javax.persistence.Entity;

@Entity
public class WidgetDashboardItem extends DashboardItem {

    @Convert(converter = WidgetConverter.class)
    private Widget widget;

    public WidgetDashboardItem() {
    }

    public WidgetDashboardItem(Integer x,
                               Integer y,
                               Integer width,
                               Integer height,
                               Widget widget) {
        super(x, y, width, height);
        this.widget = widget;
    }

    public Widget getWidget() {
        return widget;
    }

    public void setWidget(Widget widget) {
        this.widget = widget;
    }
}
