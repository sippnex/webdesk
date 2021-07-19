package io.github.sippnex.webdesk.core.dashboard.service;

import io.github.sippnex.webdesk.core.dashboard.domain.Dashboard;
import io.github.sippnex.webdesk.core.dashboard.repository.DashboardRepository;
import io.github.sippnex.webdesk.core.security.service.JwtService;
import io.github.sippnex.webdesk.core.security.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DashboardService {

    private final JwtService jwtService;

    private final UserService userService;

    private final DashboardRepository dashboardRepository;

    public DashboardService(JwtService jwtService, UserService userService, DashboardRepository dashboardRepository) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.dashboardRepository = dashboardRepository;
    }

    public List<Dashboard> getDashboards() {
        return dashboardRepository.findAll();
    }

    public Optional<Dashboard> getDashboardById(Long id) {
        return dashboardRepository.findById(id);
    }

    public Dashboard createDashboard(Dashboard dashboard) {
        final String username = jwtService.getUsernameFromToken((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
        dashboard.setId(null);
        dashboard.setUser(
                userService.getUserByUsername(username)
                        .orElseThrow(() -> new RuntimeException("User '%s' not found".formatted(username)))
        );
        return dashboardRepository.save(dashboard);
    }

    public Dashboard updateDashboard(Dashboard dashboard) {
        Dashboard persistedDashboard = dashboardRepository
                .findById(dashboard.getId())
                .orElseThrow(() -> new RuntimeException("Dashboard with id %d not found".formatted(dashboard.getId())));
        persistedDashboard.update(dashboard);
        return dashboardRepository.save(persistedDashboard);
    }

    public void deleteDashboardById(Long id) {
        dashboardRepository.findById(id).orElseThrow(() -> new RuntimeException("Dashboard with id %d not found".formatted(id)));
        dashboardRepository.deleteById(id);
    }

}
