import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WidgetService} from "@webdesk/core";
import {QuickActionsWidgetComponent} from "./quick-actions-widget.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    QuickActionsWidgetComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ]
})
export class QuickActionsWidgetModule {
  constructor(private widgetService: WidgetService) {
    this.widgetService.registerWidget('QuickActionsWidget', QuickActionsWidgetComponent);
  }
}
