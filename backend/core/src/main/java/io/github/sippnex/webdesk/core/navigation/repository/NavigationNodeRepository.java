package io.github.sippnex.webdesk.core.navigation.repository;

import io.github.sippnex.webdesk.core.navigation.domain.NavigationNode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NavigationNodeRepository extends JpaRepository<NavigationNode, Long> {

    Optional<NavigationNode> findByParentIsNull();

}
