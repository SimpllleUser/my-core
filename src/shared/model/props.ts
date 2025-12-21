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

export interface IProfileHeaderStat {
  value: string | number;
  label: string;
}

export interface IProfileHeaderAction {
  icon: Icons;
  color?: string;
  bgColor?: string;
  onClick?: () => void;
}

export interface IProfileHeaderBadge {
  icon: Icons;
  color?: string;
}

export interface IProfileHeaderProps {
  avatar?: string;
  avatarSize?: number;
  title: string;
  subtitle?: string;
  badge?: IProfileHeaderBadge;
  stats?: IProfileHeaderStat[];
  actions?: IProfileHeaderAction[];
}
