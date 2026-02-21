export enum CardType {
  PROFILE = 'Profile',
  PRICING = 'Pricing',
  METRIC = 'Metric',
  ARTICLE = 'Article'
}

export enum CardVariant {
  ELEVATED = 'elevated',
  OUTLINED = 'outlined',
  FLAT = 'flat',
  TONAL = 'tonal'
}

export enum ActionAlignment {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  SPACE_BETWEEN = 'space-between'
}

export interface CardConfig {
  type: CardType
  variant: CardVariant

  showHeader: boolean
  title: string
  subtitle: string
  showAvatar: boolean

  showImage: boolean
  imageHeight: number

  content: string
  showDivider: boolean

  showActions: boolean
  actionAlignment: ActionAlignment
  primaryActionText: string
  secondaryActionText?: string
}
