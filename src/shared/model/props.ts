import type { Icons } from "./icons";

interface INavBarItem {
  title: string;
  route: string;
  icon?: Icons;
}

export interface INavBarProps {
  items: INavBarItem[];
}
