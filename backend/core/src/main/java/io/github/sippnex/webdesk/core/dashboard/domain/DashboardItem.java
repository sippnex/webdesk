package io.github.sippnex.webdesk.core.dashboard.domain;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import io.github.sippnex.webdesk.core.util.Updatable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = AppDashboardItem.class, name = "AppDashboardItem"),
        @JsonSubTypes.Type(value = WidgetDashboardItem.class, name = "WidgetDashboardItem"),
})
@Entity
public abstract class DashboardItem implements Updatable<DashboardItem, Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer x;

    private Integer y;

    private Integer cols;

    private Integer rows;

    public DashboardItem() {
    }

    public DashboardItem(Integer x, Integer y, Integer cols, Integer rows) {
        this.x = x;
        this.y = y;
        this.cols = cols;
        this.rows = rows;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }

    public Integer getCols() {
        return cols;
    }

    public void setCols(Integer cols) {
        this.cols = cols;
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }

    @Override
    public void update(DashboardItem item) {
        this.x =item.getX();
        this.y = item.getY();
        this.cols = item.getCols();
        this.rows = item.getRows();
    }
}
