import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dashboard} from "./model/dashboard.interface";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) {
  }

  public getDashboardById(id: number): Observable<Dashboard> {
    return this.httpClient.get<Dashboard>(`http://localhost:8080/api/dashboards/${id}`);
  }

  public getDashboards(): Observable<Dashboard[]> {
    return this.httpClient.get<Dashboard[]>('http://localhost:8080/api/dashboards');
  }

  public createDashboard(name: string): Observable<Dashboard> {
    return this.httpClient.post<Dashboard>('http://localhost:8080/api/dashboards', {name} as Dashboard);
  }

  public updateDashboard(dashboard: Dashboard): Observable<Dashboard> {
    return this.httpClient.put<Dashboard>(`http://localhost:8080/api/dashboards/${dashboard.id}`, dashboard);
  }

  public deleteDashboard(dashboard: Dashboard): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/api/dashboards/${dashboard.id}`);
  }

}
