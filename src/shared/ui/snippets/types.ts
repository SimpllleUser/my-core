import type { Colors, Variants, Sizes } from '@/shared/model'
import type { Icons } from '@/shared/model'

// ==================== Base Types ====================

export type ColorType = `${Colors}` | Colors
export type VariantType = `${Variants}` | Variants
export type SizeType = `${Sizes}` | Sizes
export type IconType = `${Icons}` | Icons | string

// ==================== Social Link ====================

export interface ISocialLink {
  platform: string
  icon: IconType
  url?: string
}

// ==================== Team Member ====================

export interface ITeamMember {
  name: string
  role: string
  avatar: string
  department?: string
  bio?: string
  socials?: ISocialLink[]
}

// ==================== Testimonial ====================

export interface ITestimonial {
  name: string
  role: string
  company?: string
  avatar: string
  text: string
  rating?: number
}

// ==================== Feature ====================

export interface IFeature {
  title: string
  description: string
  icon: IconType
  color?: ColorType
  badge?: string
  points?: string[]
}

// ==================== Pricing ====================

export interface IPricingFeature {
  text: string
  included: boolean
}

export interface IPricingPlan {
  name: string
  key?: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  featured?: boolean
  cta: string
  features: IPricingFeature[]
}

// ==================== Product ====================

export interface IProduct {
  id: number | string
  name: string
  category: string
  price: number
  originalPrice?: number | null
  rating?: number
  reviews?: number
  image: string
  isNew?: boolean
  discount?: number | null
  description?: string
}

// ==================== Chat ====================

export type ChatMessageType = 'sent' | 'received' | 'system'

export interface IChatMessage {
  id: number | string
  type: ChatMessageType
  text: string
  time: string
  avatar?: string
  name?: string
  isRead?: boolean
  reaction?: string
}

// ==================== Stat ====================

export interface IStat {
  value: string | number
  label: string
  icon?: IconType
  color?: ColorType
  prefix?: string
  suffix?: string
}

// ==================== Section Header ====================

export interface ISectionHeaderProps {
  title: string
  subtitle?: string
  chip?: string
  chipColor?: ColorType
  chipVariant?: VariantType
  centered?: boolean
  maxWidth?: string | number
}

// ==================== Hero ====================

export interface IHeroFeature {
  text: string
  icon?: IconType
}

export interface IHeroCta {
  text: string
  color?: ColorType
  variant?: VariantType
  icon?: IconType
  iconPosition?: 'start' | 'end'
  to?: string
  href?: string
}
