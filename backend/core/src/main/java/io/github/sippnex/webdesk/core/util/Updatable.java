package io.github.sippnex.webdesk.core.util;

public interface Updatable<T, ID> {

    ID getId();

    void update(T t);

}
