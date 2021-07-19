import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import {GridsterModule} from "angular-gridster2";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {WidgetModule} from "../widget/widget.module";
import {AppDashboardItemPipe} from "./model/app-dashboard-item.pipe";
import {WidgetDashboardItemPipe} from "./model/widget-dashboard-item.pipe";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {DashboardContainerComponent} from "./dashboard.container";
import {NewDashboardDialogComponent} from "./new-dashboard-dialog/new-dashboard-dialog.component";
import {NewDashboardItemDialogComponent} from "./new-dashboard-item-dialog/new-dashboard-item-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DashboardFilterPipe } from './dashboard-filter.pipe';
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardContainerComponent,
    NewDashboardDialogComponent,
    NewDashboardItemDialogComponent,
    AppDashboardItemPipe,
    WidgetDashboardItemPipe,
    DashboardFilterPipe
  ],
  exports: [
    DashboardContainerComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    GridsterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    WidgetModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
  ]
})
export class DashboardModule {
}
