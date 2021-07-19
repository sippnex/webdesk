package io.github.sippnex.webdesk.core.widget.web.rest;

import io.github.sippnex.webdesk.core.widget.domain.Widget;
import io.github.sippnex.webdesk.core.widget.service.WidgetService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/widgets")
public class WidgetResource {

    private final WidgetService widgetService;

    public WidgetResource(WidgetService widgetService) {
        this.widgetService = widgetService;
    }

    @GetMapping("")
    public ResponseEntity<List<Widget>> getWidgets() {
        return new ResponseEntity<>(widgetService.getAllWidgets(), HttpStatus.OK);
    }

}
