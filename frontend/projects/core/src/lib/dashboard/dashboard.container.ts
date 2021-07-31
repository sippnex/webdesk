import {Component, OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {AppService} from "../app/app.service";
import {Dashboard} from "./model/dashboard.interface";
import {DashboardItem} from "./model/dashboard-item.interface";
import {AppDashboardItem} from "./model/app-dashboard-item.interface";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  NewDashboardItemDialogComponent,
  NewDashboardItemDialogResult
} from "./new-dashboard-item-dialog/new-dashboard-item-dialog.component";
import {WidgetDashboardItem} from "./model/widget-dashboard-item.interface";
import {NewDashboardDialogComponent} from "./new-dashboard-dialog/new-dashboard-dialog.component";
import {DeleteConfirmDialogComponent} from "@webdesk/core";

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard.container.html',
  styleUrls: ['./dashboard.container.css']
})
export class DashboardContainerComponent implements OnInit {

  dashboards: Dashboard[];
  selectedDashboard: Dashboard;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private dialog: MatDialog,
              private dashboardService: DashboardService,
              private appService: AppService) {
  }

  ngOnInit(): void {
    this.loadDashboards();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  createDashboard(): void {
    const dialogRef = this.dialog.open(NewDashboardDialogComponent);
    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        this.dashboardService.createDashboard(result).subscribe(() => {
          this.loadDashboards();
          this.editMode = true;
        });
      }
    });
  }

  selectDashboard(dashboard: Dashboard): void {
    this.selectedDashboard = dashboard;
  }

  async deleteDashboard(dashboard: Dashboard): Promise<void>  {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);
    const result: boolean = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.dashboardService.deleteDashboard(dashboard).subscribe(() => this.loadDashboards());
    }
  }

  addDashboardItem(): void {
    const dialogRef = this.dialog.open(NewDashboardItemDialogComponent, {
      width: '80vw',
      maxWidth: '875px'
    });
    dialogRef.afterClosed().subscribe((result: NewDashboardItemDialogResult | undefined) => {
      if (result) {
        if (result.widget) {
          this.selectedDashboard.items.push({
            type: 'WidgetDashboardItem',
            cols: 1,
            rows: 1,
            widget: result.widget
          } as WidgetDashboardItem);
        } else if (result.app) {
          this.selectedDashboard.items.push({
            type: 'AppDashboardItem',
            cols: 1,
            rows: 1,
            app: result.app
          } as AppDashboardItem);
        }
        this.dashboardService.updateDashboard(this.selectedDashboard).subscribe(() => this.loadDashboards());
      }
    });
  }

  deleteDashboardItem(item: DashboardItem): void {
    const index = this.selectedDashboard.items.findIndex((i: DashboardItem) => i.id === item.id);
    const items = [...this.selectedDashboard.items];
    items.splice(index, 1);
    this.selectedDashboard = {...this.selectedDashboard, items: items};
  }

  selectDashboardItem(dashboardItem: DashboardItem): void {
    if (dashboardItem.type === 'AppDashboardItem') {
      this.appService.openApp((dashboardItem as AppDashboardItem).app.name);
    }
  }

  private loadDashboards(): void {
    this.dashboardService.getDashboards().subscribe((dashboards: Dashboard[]) => {
      this.dashboards = dashboards;
      if (this.dashboards.length > 0) {
        this.selectedDashboard = this.dashboards[0];
      }
    });
  }
}
