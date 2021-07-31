import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkflowNode} from "../model/workflow-node.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkflowNodeService {

  constructor(private httpClient: HttpClient) {
  }

  public getNodes(): Observable<WorkflowNode[]> {
    return this.httpClient.get<WorkflowNode[]>('http://localhost:8080/api/workflow/nodes');
  }

  public getNodesByWorkflowId(workflowId: number): Observable<WorkflowNode[]> {
    const params = new HttpParams().set('workflowId', workflowId)
    return this.httpClient.get<WorkflowNode[]>('http://localhost:8080/api/workflow/nodes', {params});
  }

  public getNodeById(nodeId: number): Observable<WorkflowNode> {
    return this.httpClient.get<WorkflowNode>(`http://localhost:8080/api/workflow/nodes/${nodeId}`);
  }

  public saveNode(node: WorkflowNode): Observable<WorkflowNode> {
    if (node.id) {
      return this.httpClient.put<WorkflowNode>('http://localhost:8080/api/workflow/nodes', node);
    } else {
      return this.httpClient.post<WorkflowNode>('http://localhost:8080/api/workflow/nodes', node);
    }
  }

}
