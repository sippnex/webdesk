import {DashboardItem} from "./dashboard-item.interface";
import {Widget} from "../../widget/widget.interface";

export interface WidgetDashboardItem extends DashboardItem {
  widget: Widget;
}
