import {Component, OnInit} from '@angular/core';
import {WorkflowItemService} from "../../../workflow-item.service";
import {WorkflowItem} from "../../../model/workflow-item.interface";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'lib-workflow-item-list',
  templateUrl: './workflow-item-list.component.html',
  styleUrls: ['./workflow-item-list.component.css']
})
export class WorkflowItemListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'workflow', 'assignee', 'currentNode', 'actions'];
  dataSource: MatTableDataSource<WorkflowItem>;

  constructor(private route: ActivatedRoute, private router: Router, private workflowItemService: WorkflowItemService) {
  }

  ngOnInit(): void {
    this.workflowItemService.getWorkflowItems().subscribe((workflowItems: WorkflowItem[]) => {
      this.dataSource = new MatTableDataSource<WorkflowItem>(workflowItems);
    });
  }

  openDetailView(workflowItem: WorkflowItem): void {
    this.router.navigate([`../detail/${workflowItem.workflow.id}`], {
      relativeTo: this.route,
      queryParams: {workflowItemId: workflowItem.id}
    });
  }

  createNewWorkflowItem(): void {
    this.router.navigate([`../new`], {relativeTo: this.route});
  }

}
