import {Injectable} from '@angular/core';
import {Params, Route, Router} from "@angular/router";
import {App} from "./app.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apps: Map<string, Route> = new Map<string, Route>();

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  public registerApp(appName: string, route: Route) {
    this.apps.set(appName, route);
    const routerConfig = this.router.config;
    // TODO: fix this hard coded indices
    routerConfig[0].children![2].children![0].children!.push(route);
    this.router.resetConfig(routerConfig);
  }

  public openApp(appName: string, params?: Params): void {
    const appRoute: Route | undefined = this.apps.get(appName);
    if (appRoute) {
      if (params) {
        this.router.navigate([`/apps/${appRoute.path}`], {queryParams: params});
      } else {
        this.router.navigate([`/apps/${appRoute.path}`]);
      }
    } else {
      console.error(`App '${appName}' unknown. Please make sure to import the module and register the App to the AppService.`);
    }
  }

  public getAllApps(): Observable<App[]> {
    return this.httpClient.get<App[]>('http://localhost:8080/api/apps');
  }
}
