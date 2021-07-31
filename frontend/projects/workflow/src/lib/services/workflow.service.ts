import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Workflow} from "../model/workflow.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private httpClient: HttpClient) {
  }

  public getWorkflows(): Observable<Workflow[]> {
    return this.httpClient.get<Workflow[]>('http://localhost:8080/api/workflow/workflows');
  }

  public getWorkflowById(workflowId: number): Observable<Workflow> {
    return this.httpClient.get<Workflow>(`http://localhost:8080/api/workflow/workflows/${workflowId}`);
  }

  public saveWorkflow(workflow: Workflow): Observable<Workflow> {
    if (workflow.id) {
      return this.httpClient.put<Workflow>('http://localhost:8080/api/workflow/workflows', workflow);
    } else {
      return this.httpClient.post<Workflow>('http://localhost:8080/api/workflow/workflows', workflow);
    }
  }

}
