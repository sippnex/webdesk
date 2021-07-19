package io.github.sippnex.webdesk.core.util;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;

public class UpdateUtil {

    public static <T extends Updatable<T, ID>, ID> List<T> updateList(List<T> oldList, List<T> newList) {
        final List<T> mergedList = new ArrayList<>();
        newList.forEach(newElement -> {
            if (newElement.getId() != null) {
                final T oldElement = oldList.stream()
                        .filter(el -> el.getId().equals(newElement.getId()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException(MessageFormat.format("Element with id {0} not found", newElement.getId())));
                oldElement.update(newElement);
                mergedList.add(oldElement);
            } else {
                mergedList.add(newElement);
            }
        });
        return mergedList;
    }

}
