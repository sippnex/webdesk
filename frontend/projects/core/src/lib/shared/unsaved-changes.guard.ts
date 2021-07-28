import {Injectable} from "@angular/core";
import {CanDeactivate} from "@angular/router";
import {UnsavedChangesProtector} from "./unsaved-changes-detector.interface";
import {MatDialog} from "@angular/material/dialog";
import {
  UnsavedChangesDialogComponent,
  UnsavedChangesDialogResult
} from "./unsaved-changes-dialog/unsaved-changes-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<UnsavedChangesProtector> {

  constructor(private dialog: MatDialog) {
  }

  async canDeactivate(component: UnsavedChangesProtector): Promise<boolean> {
    if (component.hasUnsavedChanges()) {
      const dialogRef = this.dialog.open(UnsavedChangesDialogComponent);
      const result: UnsavedChangesDialogResult = await dialogRef.afterClosed().toPromise();
      if (result.action === 'save') {
        await component.saveChanges();
        return true;
      } else if (result.action === 'cancel') {
        return false;
      }
    }
    return true;
  }
}
