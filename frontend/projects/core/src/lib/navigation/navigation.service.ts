import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NavigationNode} from "./navigation-node.interface";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private httpClient: HttpClient) {
  }

  public getNavigationTree(): Observable<NavigationNode> {
    return this.httpClient.get<NavigationNode>('http://localhost:8080/api/navigation');
  }

}
