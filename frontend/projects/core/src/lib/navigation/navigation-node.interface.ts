export interface NavigationNode {
  order: number;
  title: string;
  target: string;
  icon?: string;
  children?: NavigationNode[];
}
