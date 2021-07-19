package io.github.sippnex.webdesk.core.app.util;

import io.github.sippnex.webdesk.core.app.domain.App;
import io.github.sippnex.webdesk.core.app.service.AppService;
import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;

@Component
public class AppConverter implements AttributeConverter<App, String> {

    private final AppService appService;

    public AppConverter(AppService appService) {
        this.appService = appService;
    }

    @Override
    public String convertToDatabaseColumn(App app) {
        if (app == null) {
            return null;
        }
        return app.getName();
    }

    @Override
    public App convertToEntityAttribute(String appName) {
        if (appName == null || appName.isEmpty()) {
            return null;
        }
        return appService.getAppByName(appName).orElse(null);
    }
}