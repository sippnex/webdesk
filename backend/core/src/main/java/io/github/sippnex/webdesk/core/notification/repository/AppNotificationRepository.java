package io.github.sippnex.webdesk.core.notification.repository;

import io.github.sippnex.webdesk.core.app.domain.App;
import io.github.sippnex.webdesk.core.notification.domain.AppNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppNotificationRepository extends JpaRepository<AppNotification, Long> {

    List<AppNotification> findAllByApp(App app);
}
