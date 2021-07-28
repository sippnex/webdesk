import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Workflow} from "./model/workflow.interface";
import {Observable} from "rxjs";
import {WorkflowNode} from "./model/workflow-node.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkflowNodeService {

  constructor(private httpClient: HttpClient) {
  }

  public getNodes(): Observable<WorkflowNode[]> {
    return this.httpClient.get<WorkflowNode[]>('http://localhost:8080/api/workflow/nodes');
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
