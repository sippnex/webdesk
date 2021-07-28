import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkflowItem} from "./model/workflow-item.interface";
import {WorkflowTransition} from "./model/workflow-transition.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkflowItemService {

  constructor(private httpClient: HttpClient) {
  }

  public getWorkflowItems(): Observable<WorkflowItem[]> {
    return this.httpClient.get<WorkflowItem[]>('http://localhost:8080/api/workflow-items');
  }

  public getWorkflowItemById(itemId: number): Observable<WorkflowItem> {
    return this.httpClient.get<WorkflowItem>(`http://localhost:8080/api/workflow-items/${itemId}`);
  }

  public saveWorkflowItem(workflowItem: WorkflowItem, transition: WorkflowTransition): Observable<WorkflowItem> {
    if (workflowItem.id) {
      return this.httpClient.put<WorkflowItem>('http://localhost:8080/api/workflow-items', workflowItem, {
        params: new HttpParams().set('transitionId', transition.id)
      });
    } else {
      return this.httpClient.post<WorkflowItem>('http://localhost:8080/api/workflow-items', workflowItem, {
        params: new HttpParams().set('transitionId', transition.id)
      });
    }
  }

}
