import {Heritable} from "../../shared/heritable.interface";

export interface DashboardItem extends Heritable {
  id: number;
  x: number;
  y: number,
  rows: number,
  cols: number;
}
