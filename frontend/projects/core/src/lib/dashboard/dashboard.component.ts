import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import {GridsterComponent, GridsterConfig} from 'angular-gridster2';
import {Dashboard} from "./model/dashboard.interface";
import {DashboardItem} from "./model/dashboard-item.interface";
import {GridsterItem, GridsterItemComponentInterface} from "angular-gridster2/lib/gridsterItem.interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnChanges {

  @Input() dashboard: Dashboard;
  @Input() editable = false;
  @Input() dashboardRowHeight = 185;

  @Output() changeItem = new EventEmitter<GridsterItemComponentInterface>();
  @Output() addItem = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<DashboardItem>();
  @Output() selectItem = new EventEmitter<DashboardItem>();

  public static itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    // console.info('itemChanged', item, itemComponent);
  }

  public static itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    // console.info('itemResized', item, itemComponent);
  }

  @ViewChild('gridster', {static: false}) gridster!: GridsterComponent;

  public options: GridsterConfig;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.options = {
      itemChangeCallback: (item, itemComponent) => this.changeItem.emit(itemComponent),
      itemResizeCallback: (item, itemComponent) => this.changeItem.emit(itemComponent),
      minRows: 3,
      minCols: 3,
      maxCols: 3,
      margin: 32,
      fixedRowHeight: this.dashboardRowHeight,
      defaultItemCols: 1,
      defaultItemRows: 2,
      outerMargin: false,
      displayGrid: "none",
      gridType: 'verticalFixed',
      draggable: {
        enabled: this.editable,
        ignoreContentClass: 'not-draggable'
      },
      resizable: {
        enabled: this.editable
      }
    };
  }

}
