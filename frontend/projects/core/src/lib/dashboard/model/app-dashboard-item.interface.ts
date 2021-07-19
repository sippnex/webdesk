import {DashboardItem} from "./dashboard-item.interface";
import {App} from "../../app/app.interface";

export interface AppDashboardItem extends DashboardItem {
  app: App;
}
