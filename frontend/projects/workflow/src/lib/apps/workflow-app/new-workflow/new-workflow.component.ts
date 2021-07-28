import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WorkflowService} from "../../../workflow.service";
import {Workflow} from "../../../model/workflow.interface";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'lib-new-workflow',
  templateUrl: './new-workflow.component.html',
  styleUrls: ['./new-workflow.component.css']
})
export class NewWorkflowComponent implements OnInit {

  workflowSearchControl = new FormControl();
  workflows: Workflow[];
  filteredWorkflows: Observable<Workflow[]>;

  constructor(private route: ActivatedRoute, private router: Router, private workflowService: WorkflowService) { }

  ngOnInit(): void {
    this.workflowService.getWorkflows().subscribe((workflows: Workflow[]) => {
      this.workflows = workflows;
      this.filteredWorkflows = this.workflowSearchControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this.filter(name) : this.workflows.slice())
        );
    });
  }

  openDetailView(workflow: Workflow): void {
    this.router.navigate([`../detail/${workflow.id}`], {relativeTo: this.route});
  }

  private filter(name: string): Workflow[] {
    const filterValue = name.toLowerCase();
    return this.workflows.filter(workflow => workflow.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
