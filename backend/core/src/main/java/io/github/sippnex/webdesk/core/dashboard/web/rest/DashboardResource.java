package io.github.sippnex.webdesk.core.dashboard.web.rest;

import io.github.sippnex.webdesk.core.dashboard.domain.Dashboard;
import io.github.sippnex.webdesk.core.dashboard.service.DashboardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboards")
public class DashboardResource {

    private final DashboardService dashboardService;

    public DashboardResource(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("")
    public ResponseEntity<List<Dashboard>> getDashboards() {
        return new ResponseEntity<>(dashboardService.getDashboards(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Dashboard> getDashboard(@PathVariable Long id) {
        return dashboardService.getDashboardById(id)
                .map(app -> new ResponseEntity<>(app, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("")
    public ResponseEntity<Dashboard> createDashboard(@RequestBody Dashboard dashboard) {
        return new ResponseEntity<>(dashboardService.createDashboard(dashboard), HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Dashboard> updateDashboard(@RequestBody Dashboard dashboard) {
        return new ResponseEntity<>(dashboardService.updateDashboard(dashboard), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteDashboard(@PathVariable Long id) {
        dashboardService.deleteDashboardById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
