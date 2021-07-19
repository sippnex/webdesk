package io.github.sippnex.webdesk.core.dashboard.domain;

import io.github.sippnex.webdesk.core.app.domain.App;
import io.github.sippnex.webdesk.core.app.util.AppConverter;

import javax.persistence.Convert;
import javax.persistence.Entity;

@Entity
public class AppDashboardItem extends DashboardItem {

    @Convert(converter = AppConverter.class)
    private App app;

    public AppDashboardItem() {
    }

    public AppDashboardItem(Integer x,
                            Integer y,
                            Integer width,
                            Integer height,
                            App app) {
        super(x, y, width, height);
        this.app = app;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }
}
