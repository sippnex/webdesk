package io.github.sippnex.webdesk.core.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UpdateUtil {

    public static <T extends Updatable<T, ID>, ID> List<T> updateList(List<T> oldList, List<T> newList) {
        final List<T> elementsToDelete = new ArrayList<>();
        oldList.forEach(oldElement -> {
            final Optional<T> newElement = newList.stream()
                    .filter(el -> el.getId().equals(oldElement.getId()))
                    .findFirst();
            if (newElement.isPresent()) {
                oldElement.update(newElement.get());
                newList.remove(newElement.get());
            } else {
                elementsToDelete.add(oldElement);
            }
        });
        oldList.addAll(newList);
        oldList.removeAll(elementsToDelete);
        return oldList;
    }

}
