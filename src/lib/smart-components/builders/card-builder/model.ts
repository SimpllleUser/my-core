export enum CardType { PROFILE = 'Profile', PRICING = 'Pricing', METRIC = 'Metric', ARTICLE = 'Article' }
export enum CardVariant { ELEVATED = 'elevated', OUTLINED = 'outlined', FLAT = 'flat', TONAL = 'tonal' }
export enum ActionAlignment { LEFT = 'left', CENTER = 'center', RIGHT = 'right', SPACE_BETWEEN = 'space-between' }

export enum HoverEffect {
  NONE = 'none',
  LIFT = 'lift',
  GLOW = 'glow'
}

export enum ThemeColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface CardConfig {
  type: CardType
  variant: CardVariant

  // Header
  showHeader: boolean
  title: string
  subtitle: string
  showAvatar: boolean

  // NEW: Badge
  showBadge: boolean
  badgeText: string
  badgeColor: ThemeColor

  // Media & Content
  showImage: boolean
  imageHeight: number
  content: string
  showDivider: boolean

  // NEW: State & Interaction
  isLoading: boolean
  hoverEffect: HoverEffect

  // Actions
  showActions: boolean
  actionAlignment: ActionAlignment
  primaryActionText: string
  secondaryActionText?: string
}
