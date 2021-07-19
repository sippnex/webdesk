package io.github.sippnex.webdesk.core.dashboard.domain;

import io.github.sippnex.webdesk.core.security.domain.User;
import io.github.sippnex.webdesk.core.util.Updatable;
import io.github.sippnex.webdesk.core.util.UpdateUtil;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Dashboard implements Updatable<Dashboard, Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToOne(fetch = FetchType.EAGER)
    private User user;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<DashboardItem> items = new ArrayList<>();

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<DashboardItem> getItems() {
        return items;
    }

    public void setItems(List<DashboardItem> items) {
        this.items = items;
    }

    @Override
    public void update(Dashboard dashboard) {
        this.name = dashboard.getName();
        this.items = UpdateUtil.updateList(this.items, dashboard.getItems());
    }
}
