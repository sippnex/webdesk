package io.github.sippnex.webdesk.workflow.service;

import io.github.sippnex.webdesk.core.app.domain.App;
import io.github.sippnex.webdesk.core.app.service.AppService;
import io.github.sippnex.webdesk.core.notification.domain.AppNotification;
import io.github.sippnex.webdesk.core.notification.service.AppNotificationService;
import io.github.sippnex.webdesk.workflow.domain.WorkflowActionRunner;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AppNotificationActionRunner extends WorkflowActionRunner {

    private final AppNotificationService appNotificationService;

    private final AppService appService;

    public AppNotificationActionRunner(AppNotificationService appNotificationService, AppService appService) {
        this.appNotificationService = appNotificationService;
        this.appService = appService;
    }

    public Map<String, Object> execute(Map<String, Object> inputParameters) {
        final App app = appService.getAppByName((String) inputParameters.get("appName")).orElseThrow(() -> new RuntimeException("App not found"));
        final String message = (String) inputParameters.get("message");
        appNotificationService.createAppNotification(new AppNotification(app, message));
        return new HashMap<>();
    }

}
