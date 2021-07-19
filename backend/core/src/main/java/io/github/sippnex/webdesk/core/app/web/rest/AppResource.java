package io.github.sippnex.webdesk.core.app.web.rest;

import io.github.sippnex.webdesk.core.app.domain.App;
import io.github.sippnex.webdesk.core.app.service.AppService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/apps")
public class AppResource {

    private final AppService appService;

    public AppResource(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("")
    public ResponseEntity<List<App>> getAllApps() {
        return new ResponseEntity<>(appService.getAllApps(), HttpStatus.OK);
    }

}
