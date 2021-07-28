package io.github.sippnex.webdesk.workflow;

import io.github.sippnex.webdesk.core.app.domain.App;
import io.github.sippnex.webdesk.core.app.service.AppService;
import io.github.sippnex.webdesk.core.widget.domain.Widget;
import io.github.sippnex.webdesk.core.widget.service.WidgetService;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan("io.github.sippnex.webdesk.workflow")
@EntityScan("io.github.sippnex.webdesk.workflow")
@EnableJpaRepositories("io.github.sippnex.webdesk.workflow")
public class WorkflowModuleConfig {

    public WorkflowModuleConfig(AppService appService, WidgetService widgetService) {
        appService.registerApps(
                new App("WorkflowApp", "Vorgänge", "Verwalten Sie Ihre Vorgänge"),
                new App("WorkflowAdminApp", "Workflow Admin", "Workflow Administration")
        );
    }

}
