import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnsavedChangesDialogComponent} from "./unsaved-changes-dialog/unsaved-changes-dialog.component";
import {DeleteConfirmDialogComponent} from "./delete-confirm-dialog/delete-confirm-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    UnsavedChangesDialogComponent,
    DeleteConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
