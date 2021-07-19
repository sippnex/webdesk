package io.github.sippnex.webdesk.core.notification.resource;

import io.github.sippnex.webdesk.core.notification.domain.AppNotification;
import io.github.sippnex.webdesk.core.notification.service.AppNotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications/apps")
public class AppNotificationResource {

    private final AppNotificationService appNotificationService;

    public AppNotificationResource(AppNotificationService appNotificationService) {
        this.appNotificationService = appNotificationService;
    }

    @GetMapping("")
    public ResponseEntity<List<AppNotification>> getAllAppNotifications() {
        return new ResponseEntity<>(appNotificationService.getAllAppNotifications(), HttpStatus.OK);
    }

}
