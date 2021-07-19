package io.github.sippnex.webdesk.core.notification.service;

import io.github.sippnex.webdesk.core.app.domain.App;
import io.github.sippnex.webdesk.core.notification.domain.AppNotification;
import io.github.sippnex.webdesk.core.notification.repository.AppNotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppNotificationService {

    private final AppNotificationRepository appNotificationRepository;

    public AppNotificationService(AppNotificationRepository appNotificationRepository) {
        this.appNotificationRepository = appNotificationRepository;
    }

    public AppNotification createAppNotification(AppNotification appNotification) {
        return appNotificationRepository.save(appNotification);
    }

    public List<AppNotification> getAllAppNotifications() {
        return appNotificationRepository.findAll();
    }

    public List<AppNotification> getAppNotificationsForApp(App app) {
        return appNotificationRepository.findAllByApp(app);
    }

}
