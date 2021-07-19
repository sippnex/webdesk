package io.github.sippnex.webdesk.core.dashboard.web.dto;

import io.github.sippnex.webdesk.core.dashboard.domain.DashboardItem;

public abstract class DashboardItemDto {

    private String type;

    private Long id;

    private Integer x;

    private Integer y;

    private Integer cols;

    private Integer rows;

    public DashboardItemDto(DashboardItem dashboardItem) {
        this.type = dashboardItem.getClass().getSimpleName();
        this.id = dashboardItem.getId();
        this.x = dashboardItem.getX();
        this.y = dashboardItem.getY();
        this.cols = dashboardItem.getCols();
        this.rows = dashboardItem.getRows();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

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
}
