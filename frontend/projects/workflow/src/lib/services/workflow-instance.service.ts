import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkflowTransition} from "../model/workflow-transition.interface";
import {WorkflowInstance} from "../model/workflow-instance.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkflowInstanceService {

  constructor(private httpClient: HttpClient) {
  }

  public getWorkflowInstances(): Observable<WorkflowInstance[]> {
    return this.httpClient.get<WorkflowInstance[]>('http://localhost:8080/api/workflow/instances');
  }

  public getWorkflowInstanceById(workflowInstanceId: number): Observable<WorkflowInstance> {
    return this.httpClient.get<WorkflowInstance>(`http://localhost:8080/api/workflow/instances/${workflowInstanceId}`);
  }

  public saveWorkflowInstance(workflowInstance: WorkflowInstance, transition: WorkflowTransition): Observable<WorkflowInstance> {
    if (workflowInstance.id) {
      return this.httpClient.put<WorkflowInstance>('http://localhost:8080/api/workflow/instances', workflowInstance, {
        params: new HttpParams().set('transitionId', transition.id!)
      });
    } else {
      return this.httpClient.post<WorkflowInstance>('http://localhost:8080/api/workflow/instances', workflowInstance, {
        params: new HttpParams().set('transitionId', transition.id!)
      });
    }
  }

}
