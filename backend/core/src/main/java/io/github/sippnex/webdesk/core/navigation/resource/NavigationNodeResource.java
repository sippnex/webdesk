package io.github.sippnex.webdesk.core.navigation.resource;

import io.github.sippnex.webdesk.core.navigation.domain.NavigationNode;
import io.github.sippnex.webdesk.core.navigation.service.NavigationNodeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/navigation")
public class NavigationNodeResource {

    private final NavigationNodeService navigationNodeService;

    public NavigationNodeResource(NavigationNodeService navigationNodeService) {
        this.navigationNodeService = navigationNodeService;
    }

    @GetMapping("")
    public ResponseEntity<NavigationNode> getNavigationTree() {
        return navigationNodeService.getNavigationTree()
                .map(navigationTree -> new ResponseEntity<>(navigationTree, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
