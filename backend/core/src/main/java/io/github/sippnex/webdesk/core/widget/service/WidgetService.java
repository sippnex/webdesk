package io.github.sippnex.webdesk.core.widget.service;

import io.github.sippnex.webdesk.core.widget.domain.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WidgetService {

    private final List<Widget> widgets = new ArrayList<>();

    public void registerWidgets(Widget... widgets) {
        for (Widget widget : widgets) {
            registerWidget(widget);
        }
    }

    public void registerWidget(Widget widget) {
        if (widgets.stream().anyMatch(w -> w.getName().equals(widget.getName()))) {
            System.out.println("Could not register Widget. Widget '" + widget.getName() + " already exists!");
        }
        widgets.add(widget);
    }

    public List<Widget> getAllWidgets() {
        return widgets;
    }

    public Optional<Widget> getWidgetByName(String widgetName) {
        return widgets.stream().filter(widget -> widget.getName().equals(widgetName)).findFirst();
    }

}
