import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkflowFormElement} from "../model/workflow-form-element.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkflowFormElementService {

  constructor(private httpClient: HttpClient) {
  }

  public getFormElements(): Observable<WorkflowFormElement[]> {
    return this.httpClient.get<WorkflowFormElement[]>('http://localhost:8080/api/workflow/form-elements');
  }

  public getFormElementById(formElementId: number): Observable<WorkflowFormElement> {
    return this.httpClient.get<WorkflowFormElement>(`http://localhost:8080/api/workflow/form-elements/${formElementId}`);
  }

  public saveFormElement(formElement: WorkflowFormElement): Observable<WorkflowFormElement> {
    if (formElement.id) {
      return this.httpClient.put<WorkflowFormElement>('http://localhost:8080/api/workflow/form-elements', formElement);
    } else {
      return this.httpClient.post<WorkflowFormElement>('http://localhost:8080/api/workflow/form-elements', formElement);
    }
  }

}
