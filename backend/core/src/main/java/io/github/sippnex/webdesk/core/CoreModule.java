package io.github.sippnex.webdesk.core;

import io.github.sippnex.webdesk.core.app.domain.App;
import io.github.sippnex.webdesk.core.app.service.AppService;
import io.github.sippnex.webdesk.core.navigation.domain.NavigationNode;
import io.github.sippnex.webdesk.core.navigation.service.NavigationNodeService;
import io.github.sippnex.webdesk.core.security.domain.User;
import io.github.sippnex.webdesk.core.security.service.UserService;
import io.github.sippnex.webdesk.core.widget.domain.Widget;
import io.github.sippnex.webdesk.core.widget.service.WidgetService;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class CoreModule {

    public CoreModule(UserService userService,
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

        // register Sample App
        appService.registerApps(
                new App("SampleApp", "Sample App", "This is a sample App")
        );

        // register Sample Widget
        widgetService.registerWidgets(
                new Widget("SampleWidget", "Sample Widget", "This is a sample Widget")
        );
    }

}
