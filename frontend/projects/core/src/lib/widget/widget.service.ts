import {Injectable, Type} from '@angular/core';
import {Widget} from "./widget.interface";
import {HttpClient} from "@angular/common/http";
import {Dashboard} from "../dashboard/model/dashboard.interface";
import {Observable} from "rxjs";
import {WidgetComponent} from "./widget.component";

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private widgets: Map<string, Type<WidgetComponent>> = new Map<string, Type<WidgetComponent>>();

  constructor(private httpClient: HttpClient) {
  }

  public registerWidget(widgetName: string, component: Type<WidgetComponent>) {
    this.widgets.set(widgetName, component);
  }

  public getWidget(widgetName: string): Type<WidgetComponent> | undefined {
    return this.widgets.get(widgetName);
  }

  public getAllWidgets(): Observable<Widget[]> {
    return this.httpClient.get<Widget[]>('http://localhost:8080/api/widgets');
  }
}
