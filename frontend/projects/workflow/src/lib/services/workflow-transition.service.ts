import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkflowTransition} from "../model/workflow-transition.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkflowTransitionService {

  constructor(private httpClient: HttpClient) {
  }

  public getTransitions(): Observable<WorkflowTransition[]> {
    return this.httpClient.get<WorkflowTransition[]>('http://localhost:8080/api/workflow/transitions');
  }

  public getTransitionById(transitionId: number): Observable<WorkflowTransition> {
    return this.httpClient.get<WorkflowTransition>(`http://localhost:8080/api/workflow/transitions/${transitionId}`);
  }

  public saveTransition(transition: WorkflowTransition): Observable<WorkflowTransition> {
    if (transition.id) {
      return this.httpClient.put<WorkflowTransition>('http://localhost:8080/api/workflow/transitions', transition);
    } else {
      return this.httpClient.post<WorkflowTransition>('http://localhost:8080/api/workflow/transitions', transition);
    }
  }

}
