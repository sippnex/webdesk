package io.github.sippnex.webdesk.core.widget.util;

import io.github.sippnex.webdesk.core.widget.domain.Widget;
import io.github.sippnex.webdesk.core.widget.service.WidgetService;
import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;

@Component
public class WidgetConverter implements AttributeConverter<Widget, String> {

    private final WidgetService widgetService;

    public WidgetConverter(WidgetService widgetService) {
        this.widgetService = widgetService;
    }

    @Override
    public String convertToDatabaseColumn(Widget widget) {
        if (widget == null) {
            return null;
        }
        return widget.getName();
    }

    @Override
    public Widget convertToEntityAttribute(String widgetName) {
        if (widgetName == null || widgetName.isEmpty()) {
            return null;
        }
        return widgetService.getWidgetByName(widgetName).orElse(null);
    }
}