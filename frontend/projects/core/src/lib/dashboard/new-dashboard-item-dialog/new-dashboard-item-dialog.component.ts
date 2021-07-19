import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Dashboard} from "../model/dashboard.interface";
import {App} from "../../app/app.interface";
import {Widget} from "../../widget/widget.interface";
import {WidgetService} from "../../widget/widget.service";
import {AppService} from "../../app/app.service";

export interface NewDashboardItemDialogResult {
  app?: App;
  widget?: Widget;
}

@Component({
  selector: 'lib-new-dashboard-item-dialog',
  templateUrl: './new-dashboard-item-dialog.component.html',
  styleUrls: ['./new-dashboard-item-dialog.component.css']
})
export class NewDashboardItemDialogComponent implements OnInit {

  dashboard: Dashboard;
  widgets: Widget[] = [];
  apps: App[] = [];

  constructor(private widgetService: WidgetService, private appService: AppService, private dialogRef: MatDialogRef<NewDashboardItemDialogComponent>) {
  }

  ngOnInit(): void {
    this.widgetService.getAllWidgets().subscribe(widgets => this.widgets = widgets);
    this.appService.getAllApps().subscribe(apps => this.apps = apps);
  }

  addWidget(widget: Widget): void {
    this.dialogRef.close({
      widget: widget
    });
  }

  addApp(app: App): void {
    this.dialogRef.close({
      app: app
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
