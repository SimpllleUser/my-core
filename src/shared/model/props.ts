import type { Icons } from './icons';
import type { Colors, Sizes } from './vuetify';

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

export interface IExpandableHeaderProps {
  /** Cover/background image URL */
  coverImage?: string;
  /** Cover height in pixels or CSS value */
  coverHeight?: number | string;
  /** Cover gradient overlay */
  coverGradient?: boolean;
  /** Avatar image URL */
  avatarImage?: string;
  /** Avatar size */
  avatarSize?: number | Sizes;
  /** Avatar border color */
  avatarBorderColor?: string;
  /** Title/name text */
  title?: string;
  /** Subtitle/description text */
  subtitle?: string;
  /** Whether header is flat (no elevation) */
  flat?: boolean;
  /** Card border radius */
  rounded?: string | number | boolean;
  /** Card elevation */
  elevation?: number | string;
  /** Header color/theme */
  color?: Colors | string;
  /** Dense mode (smaller padding) */
  dense?: boolean;
  /** Center content horizontally */
  centered?: boolean;
  /** Show loading state */
  loading?: boolean;
}
