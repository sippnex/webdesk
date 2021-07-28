package io.github.sippnex.webdesk.app;

import io.github.sippnex.webdesk.core.EnableWebdeskCore;
import io.github.sippnex.webdesk.core.app.domain.App;
import io.github.sippnex.webdesk.core.app.service.AppService;
import io.github.sippnex.webdesk.core.navigation.domain.NavigationNode;
import io.github.sippnex.webdesk.core.navigation.service.NavigationNodeService;
import io.github.sippnex.webdesk.core.security.domain.User;
import io.github.sippnex.webdesk.core.security.service.UserService;
import io.github.sippnex.webdesk.core.widget.domain.Widget;
import io.github.sippnex.webdesk.core.widget.service.WidgetService;
import io.github.sippnex.webdesk.workflow.EnableWebdeskWorkflow;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableWebdeskCore
@EnableWebdeskWorkflow
public class WebdeskApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebdeskApplication.class, args);
    }

    public WebdeskApplication(UserService userService,
                              BCryptPasswordEncoder passwordEncoder,
                              AppService appService,
                              WidgetService widgetService,
                              NavigationNodeService navigationNodeService) {

        // create admin user if not exist
        if (userService.getUserByUsername("admin").isEmpty()) {
            userService.createUser(new User("admin", passwordEncoder.encode("admin")));
        }

        // create navigation if not exist
        if (navigationNodeService.getNavigationTree().isEmpty()) {
            final NavigationNode navigationTree = new NavigationNode();
            navigationTree.getChildren().add(new NavigationNode(navigationTree, 1, "Dashboard", "dashboard", "/dashboard"));
            navigationNodeService.createNavigationNode(navigationTree);
        }
    }

}
