package io.github.sippnex.webdesk.core.dashboard.repository;

import io.github.sippnex.webdesk.core.dashboard.domain.Dashboard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DashboardRepository extends JpaRepository<Dashboard, Long> {
}
