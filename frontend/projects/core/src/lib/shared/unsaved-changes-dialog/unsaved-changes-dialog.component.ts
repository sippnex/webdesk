import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

export interface UnsavedChangesDialogResult {
  action: 'save' | 'discard' | 'cancel';
}

@Component({
  selector: 'lib-unsaved-changes-dialog',
  templateUrl: './unsaved-changes-dialog.component.html',
  styleUrls: ['./unsaved-changes-dialog.component.css']
})
export class UnsavedChangesDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UnsavedChangesDialogComponent>) { }

  ngOnInit(): void {
  }

}
