import {User} from "../../security/model/user.model";
import {DashboardItem} from "./dashboard-item.interface";

export interface Dashboard {
  id: number;
  name: string;
  user: User;
  items: DashboardItem[];
}
