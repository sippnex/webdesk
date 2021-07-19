package io.github.sippnex.webdesk.core.navigation.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class NavigationNode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "`order`")
    private Integer order;

    private String title;

    private String icon;

    private String target;

    @JsonIgnore
    @ManyToOne
    private NavigationNode parent;

    @OneToMany(cascade = CascadeType.ALL)
    private List<NavigationNode> children = new ArrayList<>();

    public NavigationNode() {
    }

    public NavigationNode(NavigationNode parent, Integer order, String title) {
        this.parent = parent;
        this.order = order;
        this.title = title;
    }

    public NavigationNode(NavigationNode parent, Integer order, String title, String icon, String target) {
        this.parent = parent;
        this.order = order;
        this.title = title;
        this.icon = icon;
        this.target = target;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public NavigationNode getParent() {
        return parent;
    }

    public void setParent(NavigationNode parent) {
        this.parent = parent;
    }

    public List<NavigationNode> getChildren() {
        return children;
    }

    public void setChildren(List<NavigationNode> children) {
        this.children = children;
    }
}
