import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DashboardService} from "../dashboard.service";
import {Dashboard} from "../model/dashboard.interface";

export interface NewDashboardDialogResult {
  dashboards: Dashboard[];
  selectedDashboard: Dashboard;
}

@Component({
  selector: 'lib-new-dashboard-dialog',
  templateUrl: './new-dashboard-dialog.component.html',
  styleUrls: ['./new-dashboard-dialog.component.css']
})
export class NewDashboardDialogComponent implements OnInit {

  dashboards: Dashboard[] = [];
  selectedDashboard: Dashboard;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  constructor(private dialogRef: MatDialogRef<NewDashboardDialogComponent>) {
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.form.get('name')!.value);
  }
}
