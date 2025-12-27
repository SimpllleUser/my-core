import type { Icons } from './icons';
import type { Colors, Variants, Sizes } from './vuetify';

/**
 * Trend direction for stats card
 */
export enum TrendDirection {
  Up = 'up',
  Down = 'down',
  Neutral = 'neutral'
}

/**
 * Trend indicator configuration
 */
export interface IStatsTrend {
  /** Trend value (e.g., '+10%', '-5%', '128') */
  value: string | number;
  /** Trend direction for styling */
  direction?: TrendDirection;
  /** Label text (e.g., 'from last month', 'vs yesterday') */
  label?: string;
  /** Custom color override (uses direction-based colors by default) */
  color?: Colors | string;
  /** Show trend icon */
  showIcon?: boolean;
  /** Custom trend icon */
  icon?: Icons | string;
}

/**
 * Icon configuration for stats card
 */
export interface IStatsCardIcon {
  /** Icon name from Icons enum or MDI string */
  icon: Icons | string;
  /** Icon color */
  color?: Colors | string;
  /** Icon background color */
  backgroundColor?: Colors | string;
  /** Show background behind icon */
  showBackground?: boolean;
  /** Icon size */
  size?: Sizes | number | string;
  /** Background border radius */
  borderRadius?: string | number;
}

/**
 * Action button configuration
 */
export interface IStatsCardAction {
  /** Button label */
  label?: string;
  /** Button icon */
  icon?: Icons | string;
  /** Button variant */
  variant?: Variants;
  /** Button color */
  color?: Colors | string;
  /** Button size */
  size?: Sizes;
  /** Click handler identifier */
  action?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
}

/**
 * Value formatting options
 */
export interface IStatsValueFormat {
  /** Prefix (e.g., '$', '€') */
  prefix?: string;
  /** Suffix (e.g., '%', 'users') */
  suffix?: string;
  /** Decimal places */
  decimals?: number;
  /** Thousand separator */
  thousandSeparator?: string;
  /** Decimal separator */
  decimalSeparator?: string;
  /** Compact notation (1K, 1M) */
  compact?: boolean;
}

/**
 * Main stats card props interface
 */
export interface IStatsCardProps {
  // === Content ===
  /** Card title */
  title?: string;
  /** Main value to display */
  value?: string | number;
  /** Value formatting options */
  valueFormat?: IStatsValueFormat;
  /** Subtitle text */
  subtitle?: string;
  /** Trend indicator configuration */
  trend?: IStatsTrend;

  // === Icon ===
  /** Icon configuration or simple icon string */
  icon?: IStatsCardIcon | Icons | string;
  /** Quick icon color (shorthand) */
  iconColor?: Colors | string;
  /** Quick icon background (shorthand) */
  iconBackground?: boolean;

  // === Styling ===
  /** Card variant */
  variant?: Variants | 'flat' | 'elevated' | 'outlined' | 'tonal';
  /** Card color */
  color?: Colors | string;
  /** Card border radius */
  rounded?: string | number | boolean;
  /** Card elevation (0-24) */
  elevation?: number | string;
  /** Card min/max width */
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  /** Card min/max height */
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;

  // === States ===
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Clickable/hoverable state */
  clickable?: boolean;
  /** Link destination */
  to?: string | object;
  /** External link */
  href?: string;

  // === Layout ===
  /** Content alignment */
  align?: 'start' | 'center' | 'end';
  /** Dense mode (less padding) */
  dense?: boolean;
  /** Horizontal layout (icon and content side by side) */
  horizontal?: boolean;
  /** Reverse content order */
  reverse?: boolean;

  // === Actions ===
  /** Action buttons configuration */
  actions?: IStatsCardAction[];
  /** Show actions on hover only */
  actionsOnHover?: boolean;
}

/**
 * Stats card emits interface
 */
export interface IStatsCardEmits {
  /** Card click event */
  (e: 'click', event: MouseEvent): void;
  /** Action button click */
  (e: 'action', action: string, event: MouseEvent): void;
}

/**
 * Stats card slots interface
 */
export interface IStatsCardSlots {
  /** Custom icon slot */
  icon?: () => any;
  /** Custom title slot */
  title?: () => any;
  /** Custom value slot */
  value?: () => any;
  /** Custom subtitle slot */
  subtitle?: () => any;
  /** Custom trend slot */
  trend?: () => any;
  /** Actions slot */
  actions?: () => any;
  /** Prepend content (before main content) */
  prepend?: () => any;
  /** Append content (after main content) */
  append?: () => any;
  /** Full content override */
  default?: () => any;
}
