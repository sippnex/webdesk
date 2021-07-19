package io.github.sippnex.webdesk.core.navigation.service;

import io.github.sippnex.webdesk.core.navigation.domain.NavigationNode;
import io.github.sippnex.webdesk.core.navigation.repository.NavigationNodeRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NavigationNodeService {

    private final NavigationNodeRepository navigationNodeRepository;

    public NavigationNodeService(NavigationNodeRepository navigationNodeRepository) {
        this.navigationNodeRepository = navigationNodeRepository;
    }

    public NavigationNode createNavigationNode(NavigationNode navigationNode) {
        return navigationNodeRepository.save(navigationNode);
    }

    public NavigationNode updateNavigationNode(NavigationNode navigationNode) {
        return navigationNodeRepository.save(navigationNode);
    }

    public Optional<NavigationNode> getNavigationTree() {
        return navigationNodeRepository.findByParentIsNull();
    }
}
