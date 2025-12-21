import type { Icons } from './icons';

export interface INavBarItem {
  title: string;
  route?: string;
  icon?: Icons;
  iconBackground?: boolean;
  children?: INavBarItem[];
}

export interface INavBarProps {
  items: INavBarItem[];
}
