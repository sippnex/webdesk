import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'lib-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css']
})
export class DeleteConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>) { }

  ngOnInit(): void {
  }

}
