import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {QuickAction} from "./quick-action.model";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {AppService, WidgetComponent} from "@webdesk/core";

@Component({
  selector: 'app-quick-actions-widget',
  templateUrl: './quick-actions-widget.component.html',
  styleUrls: ['./quick-actions-widget.component.css']
})
export class QuickActionsWidgetComponent extends WidgetComponent implements OnInit {

  quickActionsControl = new FormControl();
  quickActions: QuickAction[] = [
    {name: 'Urlaub beantragen', icon: 'beach_access'},
    {name: 'Krankmeldung einreichen', icon: 'sick'},
    {name: 'Dokument einreichen', icon: 'upload_file'}
  ];
  filteredQuickActions: Observable<QuickAction[]>;

  constructor(private appService: AppService) {
    super();
  }

  ngOnInit(): void {
    this.filteredQuickActions = this.quickActionsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.quickActions.slice())
      );
  }

  displayFn(quickAction: QuickAction): string {
    return quickAction && quickAction.name ? quickAction.name : '';
  }

  executeQuickAction(quickAction: QuickAction): void {
    this.appService.openApp('WorkflowApp', {workflowId: 1});
  }

  private filter(name: string): QuickAction[] {
    const filterValue = name.toLowerCase();
    return this.quickActions.filter(quickAction => quickAction.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
