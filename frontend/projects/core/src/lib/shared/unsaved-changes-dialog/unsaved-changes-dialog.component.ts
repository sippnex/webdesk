import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface UnsavedChangesDialogData {
  saveEnabled: boolean;
}

export interface UnsavedChangesDialogResult {
  action: 'save' | 'discard' | 'cancel';
}

@Component({
  selector: 'lib-unsaved-changes-dialog',
  templateUrl: './unsaved-changes-dialog.component.html',
  styleUrls: ['./unsaved-changes-dialog.component.css']
})
export class UnsavedChangesDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UnsavedChangesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UnsavedChangesDialogData) {
    if (data.saveEnabled === undefined) {
      data.saveEnabled = true;
    }
  }

  ngOnInit(): void {
  }

}
