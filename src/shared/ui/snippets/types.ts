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

// ==================== FinTech ====================

export type TransactionType = 'income' | 'expense' | 'transfer'
export type TransactionStatus = 'completed' | 'pending' | 'failed'

export interface ITransaction {
  id: number | string
  type: TransactionType
  status: TransactionStatus
  title: string
  description?: string
  amount: number
  currency?: string
  date: string
  icon?: IconType
  category?: string
}

export interface ICryptoAsset {
  id: number | string
  name: string
  symbol: string
  icon?: string
  price: number
  change24h: number
  balance: number
  value: number
  color?: ColorType
}

export interface IBankAccount {
  id: number | string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'investment'
  balance: number
  currency?: string
  lastFour?: string
  icon?: IconType
  color?: ColorType
}

export interface IPaymentCard {
  id: number | string
  type: 'visa' | 'mastercard' | 'amex' | 'other'
  lastFour: string
  expiryDate: string
  holderName: string
  isDefault?: boolean
}

// ==================== Blog ====================

export interface IBlogPost {
  id: number | string
  title: string
  excerpt: string
  content?: string
  author: IBlogAuthor
  publishedAt: string
  readTime?: number
  image?: string
  category: string
  tags?: string[]
  likes?: number
  comments?: number
  views?: number
}

export interface IBlogAuthor {
  id: number | string
  name: string
  avatar: string
  bio?: string
  role?: string
  socials?: ISocialLink[]
}

export interface IBlogComment {
  id: number | string
  author: {
    name: string
    avatar: string
  }
  content: string
  createdAt: string
  likes?: number
  replies?: IBlogComment[]
}

export interface IBlogCategory {
  id: number | string
  name: string
  slug: string
  count?: number
  icon?: IconType
  color?: ColorType
}

// ==================== Social Media ====================

export interface ISocialPost {
  id: number | string
  author: ISocialUser
  content: string
  images?: string[]
  video?: string
  createdAt: string
  likes: number
  comments: number
  shares: number
  isLiked?: boolean
  isBookmarked?: boolean
}

export interface ISocialUser {
  id: number | string
  name: string
  username: string
  avatar: string
  bio?: string
  verified?: boolean
  followers?: number
  following?: number
  posts?: number
  isFollowing?: boolean
}

export interface ISocialStory {
  id: number | string
  user: {
    name: string
    avatar: string
  }
  image: string
  viewed?: boolean
  createdAt?: string
}

export interface ISocialNotification {
  id: number | string
  type: 'like' | 'comment' | 'follow' | 'mention' | 'share'
  user: {
    name: string
    avatar: string
  }
  content: string
  createdAt: string
  read?: boolean
}
