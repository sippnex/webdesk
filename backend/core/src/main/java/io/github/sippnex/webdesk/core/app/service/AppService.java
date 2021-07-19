package io.github.sippnex.webdesk.core.app.service;

import io.github.sippnex.webdesk.core.app.domain.App;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppService {

    private final List<App> apps = new ArrayList<>();

    public void registerApps(App... apps) {
        for (App app : apps) {
            registerApp(app);
        }
    }

    public void registerApp(App app) {
        if (apps.stream().anyMatch(a -> a.getName().equals(app.getName()))) {
            System.out.println("Could not register App. App '" + app.getName() + " already exists!");
        }
        apps.add(app);
    }

    public List<App> getAllApps() {
        return apps;
    }

    public Optional<App> getAppByName(String appName) {
        return apps.stream().filter(app -> app.getName().equals(appName)).findFirst();
    }

}
