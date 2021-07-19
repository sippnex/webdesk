import {Heritable} from "../../util/heritable.interface";

export interface DashboardItem extends Heritable {
  id: number;
  x: number;
  y: number,
  rows: number,
  cols: number;
}
