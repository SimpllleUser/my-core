/**
 * Vuetify 3 UI Snippets Collection
 *
 * A comprehensive collection of ready-to-use, copy-paste UI components
 * built with Vuetify 3 and Vue 3 Composition API.
 *
 * All snippets are:
 * - Fully functional and responsive
 * - Using only Vuetify components (no external dependencies)
 * - Written in TypeScript with Icons enum
 * - Support Light/Dark themes automatically
 */

// =============================================================================
// AUTH SNIPPETS
// =============================================================================

export { default as LoginSimple } from './auth/LoginSimple.vue'
// Simple login form with email/password
// Components: VCard, VTextField, VBtn, VCheckbox

export { default as LoginWithSocial } from './auth/LoginWithSocial.vue'
// Login with social authentication (Google, GitHub, Facebook)
// Components: VCard, VTextField, VBtn, VDivider

export { default as RegisterMultiStep } from './auth/RegisterMultiStep.vue'
// Multi-step registration wizard
// Components: VCard, VStepper, VTextField, VSelect

export { default as ForgotPassword } from './auth/ForgotPassword.vue'
// Password recovery form
// Components: VCard, VTextField, VBtn, VAlert

export { default as OtpVerification } from './auth/OtpVerification.vue'
// OTP/2FA verification with 6-digit input
// Components: VCard, VTextField, VBtn

// =============================================================================
// DASHBOARD SNIPPETS
// =============================================================================

export { default as AnalyticsOverview } from './dashboard/AnalyticsOverview.vue'
// Full analytics dashboard with charts and metrics
// Components: VCard, VRow, VCol, VList, VProgressLinear

export { default as StatsCards } from './dashboard/StatsCards.vue'
// Collection of stat card styles
// Components: VCard, VProgressCircular, VSparkline

export { default as AdminPanel } from './dashboard/AdminPanel.vue'
// Admin dashboard with sidebar navigation
// Components: VNavigationDrawer, VAppBar, VDataTable

export { default as EcommerceDashboard } from './dashboard/EcommerceDashboard.vue'
// E-commerce focused dashboard
// Components: VCard, VDataTable, VProgressLinear

// =============================================================================
// LANDING PAGE SNIPPETS (Simple → Complex)
// =============================================================================

// Simple
export { default as CtaSection } from './landing/CtaSection.vue'
// Simple call-to-action sections
// Components: VContainer, VRow, VCol, VBtn, VCard

export { default as LogoCloudSection } from './landing/LogoCloudSection.vue'
// Partner and client logos showcase
// Components: VContainer, VRow, VCol, VIcon, VChip

export { default as NewsletterSection } from './landing/NewsletterSection.vue'
// Email subscription and newsletter signup
// Components: VContainer, VTextField, VBtn, VCard

// Medium
export { default as HeroSection } from './landing/HeroSection.vue'
// Multiple hero section styles (centered, split, gradient)
// Components: VContainer, VRow, VCol, VBtn, VImg

export { default as FeaturesSection } from './landing/FeaturesSection.vue'
// Feature showcases (grid, alternating, icons)
// Components: VCard, VIcon, VRow, VCol

export { default as StatsSection } from './landing/StatsSection.vue'
// Statistics and metrics display
// Components: VContainer, VRow, VCol, VCard, VIcon

export { default as FaqSection } from './landing/FaqSection.vue'
// Frequently asked questions with accordion
// Components: VContainer, VExpansionPanels, VCard

export { default as TeamSection } from './landing/TeamSection.vue'
// Team members showcase with profiles
// Components: VContainer, VCard, VAvatar, VBtn

export { default as PricingSection } from './landing/PricingSection.vue'
// Pricing tables with comparison
// Components: VCard, VSwitch, VList, VTable

export { default as TestimonialsSection } from './landing/TestimonialsSection.vue'
// Customer testimonials (grid, carousel, featured)
// Components: VCard, VAvatar, VRating, VCarousel

export { default as FooterSection } from './landing/FooterSection.vue'
// Website footer with links, social icons
// Components: VContainer, VRow, VCol, VBtn, VDivider

// Complex
export { default as FullLandingPage } from './landing/FullLandingPage.vue'
// Complete landing page with all sections combined
// Components: All major Vuetify components

// =============================================================================
// CHAT & MESSAGING SNIPPETS (Simple → Complex)
// =============================================================================

// Simple
export { default as ChatBubble } from './chat/ChatBubble.vue'
// Individual chat message bubbles
// Components: VCard, VAvatar, VChip

export { default as ChatInput } from './chat/ChatInput.vue'
// Message input components with features
// Components: VTextField, VBtn, VMenu, VCard

// Medium
export { default as ChatConversation } from './chat/ChatConversation.vue'
// Full chat conversation with messages and input
// Components: VCard, VAvatar, VTextField, VBtn

export { default as ChatListView } from './chat/ChatListView.vue'
// List of chat conversations with search
// Components: VCard, VList, VAvatar, VBadge

export { default as MessageTypes } from './chat/MessageTypes.vue'
// Various message types (text, images, files, voice)
// Components: VCard, VAvatar, VImg, VChip

// Complex
export { default as ChatFullApp } from './chat/ChatFullApp.vue'
// Complete chat application with sidebar and details
// Components: All major Vuetify components

// =============================================================================
// FORM SNIPPETS
// =============================================================================

export { default as ContactForm } from './forms/ContactForm.vue'
// Contact form with validation
// Components: VCard, VTextField, VTextarea, VSelect

export { default as CheckoutForm } from './forms/CheckoutForm.vue'
// E-commerce checkout form
// Components: VCard, VTextField, VRadioGroup

export { default as MultiStepForm } from './forms/MultiStepForm.vue'
// Wizard-style form with validation per step
// Components: VStepper, VTextField, VFileInput

export { default as FilterForm } from './forms/FilterForm.vue'
// Advanced filter form for data filtering
// Components: VRangeSlider, VChipGroup, VExpansionPanels

// =============================================================================
// CARD SNIPPETS
// =============================================================================

export { default as ProductCard } from './cards/ProductCard.vue'
// E-commerce product cards (grid, horizontal, featured)
// Components: VCard, VImg, VRating, VChip

export { default as UserProfileCard } from './cards/UserProfileCard.vue'
// User profile cards (simple, detailed, social)
// Components: VCard, VAvatar, VList, VChip

export { default as PricingCard } from './cards/PricingCard.vue'
// Pricing plan cards with features
// Components: VCard, VList, VBtn, VTable

export { default as StatsCard } from './cards/StatsCard.vue'
// Statistics cards (trends, progress, sparklines)
// Components: VCard, VProgressLinear, VSparkline

// =============================================================================
// TABLE SNIPPETS
// =============================================================================

export { default as DataTable } from './tables/DataTable.vue'
// Full-featured data table with filtering
// Components: VDataTable, VTextField, VSelect, VMenu

export { default as SortableTable } from './tables/SortableTable.vue'
// Simple sortable table with custom styling
// Components: VTable, VChip, VPagination

// =============================================================================
// NAVIGATION SNIPPETS
// =============================================================================

export { default as NavbarVariants } from './navigation/NavbarVariants.vue'
// Various navbar styles (simple, search, mega menu)
// Components: VAppBar, VToolbar, VMenu, VBottomNavigation

export { default as Sidebar } from './navigation/Sidebar.vue'
// Collapsible sidebar with nested menu
// Components: VNavigationDrawer, VList, VListGroup

export { default as Breadcrumbs } from './navigation/Breadcrumbs.vue'
// Breadcrumb navigation styles
// Components: VBreadcrumbs, VTabs

// =============================================================================
// MODAL & DIALOG SNIPPETS
// =============================================================================

export { default as DialogVariants } from './modals/DialogVariants.vue'
// Various dialog types (confirm, alert, form, fullscreen)
// Components: VDialog, VCard, VBtn, VForm

// =============================================================================
// LIST SNIPPETS
// =============================================================================

export { default as NotificationList } from './lists/NotificationList.vue'
// Notification/activity feed
// Components: VList, VAvatar, VChip, VTimeline

export { default as ChatList } from './lists/ChatList.vue'
// Chat/messaging interface
// Components: VList, VTextField, VAvatar

// =============================================================================
// ERROR PAGE SNIPPETS
// =============================================================================

export { default as Error404 } from './error-pages/Error404.vue'
// Page not found (multiple styles)
// Components: VContainer, VBtn, VIcon

export { default as Error500 } from './error-pages/Error500.vue'
// Server error page
// Components: VContainer, VAlert, VExpansionPanels

export { default as Maintenance } from './error-pages/Maintenance.vue'
// Under maintenance with countdown
// Components: VCard, VProgressLinear, VTextField

// =============================================================================
// SETTINGS & PROFILE SNIPPETS
// =============================================================================

export { default as SettingsPage } from './settings/SettingsPage.vue'
// User settings with tabs
// Components: VCard, VSwitch, VSelect, VList

export { default as ProfilePage } from './settings/ProfilePage.vue'
// User profile page with activity
// Components: VCard, VTabs, VTimeline, VAvatar

// =============================================================================
// E-COMMERCE SNIPPETS
// =============================================================================

export { default as ProductGrid } from './ecommerce/ProductGrid.vue'
// Product grid with filters
// Components: VCard, VRating, VPagination

export { default as ShoppingCart } from './ecommerce/ShoppingCart.vue'
// Shopping cart with summary
// Components: VCard, VList, VTextField, VBtn

// =============================================================================
// FINTECH SNIPPETS
// =============================================================================

export { default as WalletOverview } from './fintech/WalletOverview.vue'
// Digital wallet overview with balance and quick actions
// Components: StatCard, SectionHeader, VCard

export { default as TransactionHistory } from './fintech/TransactionHistory.vue'
// Transaction list with filters and search
// Components: TransactionItem, VCard, VList

export { default as CryptoPortfolio } from './fintech/CryptoPortfolio.vue'
// Cryptocurrency portfolio with assets and market data
// Components: CryptoCard, StatCard, SectionHeader

export { default as PaymentForm } from './fintech/PaymentForm.vue'
// Payment forms with card input and checkout
// Components: VCard, VTextField, VForm

export { default as BankingDashboard } from './fintech/BankingDashboard.vue'
// Full banking dashboard with accounts and analytics
// Components: StatCard, VCard, VList

// =============================================================================
// BLOG SNIPPETS
// =============================================================================

export { default as BlogPostCards } from './blog/BlogPostCards.vue'
// Blog post cards with various layouts
// Components: BlogCard, SectionHeader

export { default as BlogList } from './blog/BlogList.vue'
// Blog post listings with filters and pagination
// Components: BlogCard, VCard, VList

export { default as ArticleView } from './blog/ArticleView.vue'
// Full blog article page with author info
// Components: SectionHeader, VCard

export { default as CommentSection } from './blog/CommentSection.vue'
// Blog comments with replies and voting
// Components: VCard, VList, VTextarea

// =============================================================================
// SOCIAL MEDIA SNIPPETS
// =============================================================================

export { default as SocialFeed } from './social/SocialFeed.vue'
// Social media feed with posts and stories
// Components: SocialPostCard, VCard

export { default as StoryCarousel } from './social/StoryCarousel.vue'
// Social media stories carousel and viewer
// Components: VCard, VAvatar, VImg

export { default as SocialProfile } from './social/SocialProfile.vue'
// Social media profile page with stats
// Components: SocialPostCard, VCard, VTabs

export { default as FollowersList } from './social/FollowersList.vue'
// List of followers/following with actions
// Components: VCard, VList, VAvatar

export { default as SocialStats } from './social/SocialStats.vue'
// Social media analytics and engagement stats
// Components: StatCard, SectionHeader, VCard

// =============================================================================
// SNIPPET CATALOG
// =============================================================================

export interface Snippet {
  name: string
  path: string
  description: string
  components: string[]
  category: string
  complexity?: 'simple' | 'medium' | 'complex'
}

export const snippetCatalog: Snippet[] = [
  // Auth
  { name: 'LoginSimple', path: 'auth/LoginSimple.vue', description: 'Simple login form with email/password', components: ['VCard', 'VTextField', 'VBtn', 'VCheckbox'], category: 'Authentication' },
  { name: 'LoginWithSocial', path: 'auth/LoginWithSocial.vue', description: 'Login with social authentication', components: ['VCard', 'VTextField', 'VBtn', 'VDivider'], category: 'Authentication' },
  { name: 'RegisterMultiStep', path: 'auth/RegisterMultiStep.vue', description: 'Multi-step registration wizard', components: ['VCard', 'VStepper', 'VTextField', 'VSelect'], category: 'Authentication' },
  { name: 'ForgotPassword', path: 'auth/ForgotPassword.vue', description: 'Password recovery form', components: ['VCard', 'VTextField', 'VBtn', 'VAlert'], category: 'Authentication' },
  { name: 'OtpVerification', path: 'auth/OtpVerification.vue', description: 'OTP verification with 6-digit input', components: ['VCard', 'VTextField', 'VBtn'], category: 'Authentication' },

  // Dashboard
  { name: 'AnalyticsOverview', path: 'dashboard/AnalyticsOverview.vue', description: 'Analytics dashboard with charts', components: ['VCard', 'VRow', 'VCol', 'VList'], category: 'Dashboards' },
  { name: 'StatsCards', path: 'dashboard/StatsCards.vue', description: 'Collection of stat card styles', components: ['VCard', 'VProgressCircular', 'VSparkline'], category: 'Dashboards' },
  { name: 'AdminPanel', path: 'dashboard/AdminPanel.vue', description: 'Admin dashboard with sidebar', components: ['VNavigationDrawer', 'VAppBar', 'VDataTable'], category: 'Dashboards' },
  { name: 'EcommerceDashboard', path: 'dashboard/EcommerceDashboard.vue', description: 'E-commerce focused dashboard', components: ['VCard', 'VDataTable', 'VProgressLinear'], category: 'Dashboards' },

  // Landing Pages (ordered by complexity)
  { name: 'CtaSection', path: 'landing/CtaSection.vue', description: 'Simple call-to-action sections', components: ['VContainer', 'VBtn', 'VCard'], category: 'Landing Pages', complexity: 'simple' },
  { name: 'LogoCloudSection', path: 'landing/LogoCloudSection.vue', description: 'Partner logos showcase', components: ['VContainer', 'VIcon', 'VChip'], category: 'Landing Pages', complexity: 'simple' },
  { name: 'NewsletterSection', path: 'landing/NewsletterSection.vue', description: 'Newsletter signup forms', components: ['VContainer', 'VTextField', 'VBtn'], category: 'Landing Pages', complexity: 'simple' },
  { name: 'HeroSection', path: 'landing/HeroSection.vue', description: 'Multiple hero section styles', components: ['VContainer', 'VRow', 'VCol', 'VBtn'], category: 'Landing Pages', complexity: 'medium' },
  { name: 'FeaturesSection', path: 'landing/FeaturesSection.vue', description: 'Feature showcases', components: ['VCard', 'VIcon', 'VRow', 'VCol'], category: 'Landing Pages', complexity: 'medium' },
  { name: 'StatsSection', path: 'landing/StatsSection.vue', description: 'Statistics and metrics', components: ['VContainer', 'VCard', 'VIcon'], category: 'Landing Pages', complexity: 'medium' },
  { name: 'FaqSection', path: 'landing/FaqSection.vue', description: 'FAQ with accordion', components: ['VExpansionPanels', 'VCard', 'VList'], category: 'Landing Pages', complexity: 'medium' },
  { name: 'TeamSection', path: 'landing/TeamSection.vue', description: 'Team members showcase', components: ['VCard', 'VAvatar', 'VBtn'], category: 'Landing Pages', complexity: 'medium' },
  { name: 'PricingSection', path: 'landing/PricingSection.vue', description: 'Pricing tables with comparison', components: ['VCard', 'VSwitch', 'VList', 'VTable'], category: 'Landing Pages', complexity: 'medium' },
  { name: 'TestimonialsSection', path: 'landing/TestimonialsSection.vue', description: 'Customer testimonials', components: ['VCard', 'VAvatar', 'VRating'], category: 'Landing Pages', complexity: 'medium' },
  { name: 'FooterSection', path: 'landing/FooterSection.vue', description: 'Website footer sections', components: ['VContainer', 'VRow', 'VDivider'], category: 'Landing Pages', complexity: 'medium' },
  { name: 'FullLandingPage', path: 'landing/FullLandingPage.vue', description: 'Complete landing page', components: ['All major components'], category: 'Landing Pages', complexity: 'complex' },

  // Chat & Messaging (ordered by complexity)
  { name: 'ChatBubble', path: 'chat/ChatBubble.vue', description: 'Chat message bubbles', components: ['VCard', 'VAvatar', 'VChip'], category: 'Chat & Messaging', complexity: 'simple' },
  { name: 'ChatInput', path: 'chat/ChatInput.vue', description: 'Message input components', components: ['VTextField', 'VBtn', 'VMenu'], category: 'Chat & Messaging', complexity: 'simple' },
  { name: 'ChatConversation', path: 'chat/ChatConversation.vue', description: 'Full chat conversation', components: ['VCard', 'VAvatar', 'VTextField'], category: 'Chat & Messaging', complexity: 'medium' },
  { name: 'ChatListView', path: 'chat/ChatListView.vue', description: 'Chat list with search', components: ['VCard', 'VList', 'VBadge'], category: 'Chat & Messaging', complexity: 'medium' },
  { name: 'MessageTypes', path: 'chat/MessageTypes.vue', description: 'Various message types', components: ['VCard', 'VAvatar', 'VImg'], category: 'Chat & Messaging', complexity: 'medium' },
  { name: 'ChatFullApp', path: 'chat/ChatFullApp.vue', description: 'Complete chat application', components: ['All major components'], category: 'Chat & Messaging', complexity: 'complex' },

  // Forms
  { name: 'ContactForm', path: 'forms/ContactForm.vue', description: 'Contact form with validation', components: ['VCard', 'VTextField', 'VTextarea', 'VSelect'], category: 'Forms' },
  { name: 'CheckoutForm', path: 'forms/CheckoutForm.vue', description: 'E-commerce checkout form', components: ['VCard', 'VTextField', 'VRadioGroup'], category: 'Forms' },
  { name: 'MultiStepForm', path: 'forms/MultiStepForm.vue', description: 'Wizard-style form', components: ['VStepper', 'VTextField', 'VFileInput'], category: 'Forms' },
  { name: 'FilterForm', path: 'forms/FilterForm.vue', description: 'Advanced filter form', components: ['VRangeSlider', 'VChipGroup', 'VExpansionPanels'], category: 'Forms' },

  // Cards
  { name: 'ProductCard', path: 'cards/ProductCard.vue', description: 'E-commerce product cards', components: ['VCard', 'VImg', 'VRating', 'VChip'], category: 'Cards' },
  { name: 'UserProfileCard', path: 'cards/UserProfileCard.vue', description: 'User profile cards', components: ['VCard', 'VAvatar', 'VList', 'VChip'], category: 'Cards' },
  { name: 'PricingCard', path: 'cards/PricingCard.vue', description: 'Pricing plan cards', components: ['VCard', 'VList', 'VBtn', 'VTable'], category: 'Cards' },
  { name: 'StatsCard', path: 'cards/StatsCard.vue', description: 'Statistics cards', components: ['VCard', 'VProgressLinear', 'VSparkline'], category: 'Cards' },

  // Tables
  { name: 'DataTable', path: 'tables/DataTable.vue', description: 'Full-featured data table', components: ['VDataTable', 'VTextField', 'VSelect', 'VMenu'], category: 'Tables' },
  { name: 'SortableTable', path: 'tables/SortableTable.vue', description: 'Simple sortable table', components: ['VTable', 'VChip', 'VPagination'], category: 'Tables' },

  // Navigation
  { name: 'NavbarVariants', path: 'navigation/NavbarVariants.vue', description: 'Various navbar styles', components: ['VAppBar', 'VToolbar', 'VMenu'], category: 'Navigation' },
  { name: 'Sidebar', path: 'navigation/Sidebar.vue', description: 'Collapsible sidebar', components: ['VNavigationDrawer', 'VList', 'VListGroup'], category: 'Navigation' },
  { name: 'Breadcrumbs', path: 'navigation/Breadcrumbs.vue', description: 'Breadcrumb navigation', components: ['VBreadcrumbs', 'VTabs'], category: 'Navigation' },

  // Modals
  { name: 'DialogVariants', path: 'modals/DialogVariants.vue', description: 'Various dialog types', components: ['VDialog', 'VCard', 'VBtn', 'VForm'], category: 'Modals & Dialogs' },

  // Lists
  { name: 'NotificationList', path: 'lists/NotificationList.vue', description: 'Notification/activity feed', components: ['VList', 'VAvatar', 'VChip', 'VTimeline'], category: 'Lists' },
  { name: 'ChatList', path: 'lists/ChatList.vue', description: 'Chat/messaging interface', components: ['VList', 'VTextField', 'VAvatar'], category: 'Lists' },

  // Error Pages
  { name: 'Error404', path: 'error-pages/Error404.vue', description: 'Page not found', components: ['VContainer', 'VBtn', 'VIcon'], category: 'Error Pages' },
  { name: 'Error500', path: 'error-pages/Error500.vue', description: 'Server error page', components: ['VContainer', 'VAlert', 'VExpansionPanels'], category: 'Error Pages' },
  { name: 'Maintenance', path: 'error-pages/Maintenance.vue', description: 'Maintenance page with countdown', components: ['VCard', 'VProgressLinear', 'VTextField'], category: 'Error Pages' },

  // Settings
  { name: 'SettingsPage', path: 'settings/SettingsPage.vue', description: 'User settings with tabs', components: ['VCard', 'VSwitch', 'VSelect', 'VList'], category: 'Settings & Profile' },
  { name: 'ProfilePage', path: 'settings/ProfilePage.vue', description: 'User profile page', components: ['VCard', 'VTabs', 'VTimeline', 'VAvatar'], category: 'Settings & Profile' },

  // E-commerce
  { name: 'ProductGrid', path: 'ecommerce/ProductGrid.vue', description: 'Product grid with filters', components: ['VCard', 'VRating', 'VPagination'], category: 'E-commerce' },
  { name: 'ShoppingCart', path: 'ecommerce/ShoppingCart.vue', description: 'Shopping cart with summary', components: ['VCard', 'VList', 'VTextField', 'VBtn'], category: 'E-commerce' },

  // FinTech
  { name: 'WalletOverview', path: 'fintech/WalletOverview.vue', description: 'Digital wallet with balance and actions', components: ['StatCard', 'SectionHeader', 'VCard'], category: 'FinTech', complexity: 'medium' },
  { name: 'TransactionHistory', path: 'fintech/TransactionHistory.vue', description: 'Transaction list with filters', components: ['TransactionItem', 'VCard', 'VList'], category: 'FinTech', complexity: 'medium' },
  { name: 'CryptoPortfolio', path: 'fintech/CryptoPortfolio.vue', description: 'Cryptocurrency portfolio', components: ['CryptoCard', 'StatCard', 'VTable'], category: 'FinTech', complexity: 'complex' },
  { name: 'PaymentForm', path: 'fintech/PaymentForm.vue', description: 'Payment forms with card input', components: ['VCard', 'VTextField', 'VForm'], category: 'FinTech', complexity: 'medium' },
  { name: 'BankingDashboard', path: 'fintech/BankingDashboard.vue', description: 'Full banking dashboard', components: ['StatCard', 'VCard', 'VList', 'VTable'], category: 'FinTech', complexity: 'complex' },

  // Blog
  { name: 'BlogPostCards', path: 'blog/BlogPostCards.vue', description: 'Blog post cards with layouts', components: ['BlogCard', 'SectionHeader', 'VCard'], category: 'Blog', complexity: 'medium' },
  { name: 'BlogList', path: 'blog/BlogList.vue', description: 'Blog listings with pagination', components: ['BlogCard', 'VCard', 'VPagination'], category: 'Blog', complexity: 'medium' },
  { name: 'ArticleView', path: 'blog/ArticleView.vue', description: 'Full article page', components: ['SectionHeader', 'VCard', 'VImg'], category: 'Blog', complexity: 'complex' },
  { name: 'CommentSection', path: 'blog/CommentSection.vue', description: 'Comments with replies', components: ['VCard', 'VList', 'VTextarea'], category: 'Blog', complexity: 'medium' },

  // Social Media
  { name: 'SocialFeed', path: 'social/SocialFeed.vue', description: 'Social media feed with stories', components: ['SocialPostCard', 'VCard', 'VList'], category: 'Social Media', complexity: 'complex' },
  { name: 'StoryCarousel', path: 'social/StoryCarousel.vue', description: 'Stories carousel and viewer', components: ['VCard', 'VAvatar', 'VImg'], category: 'Social Media', complexity: 'medium' },
  { name: 'SocialProfile', path: 'social/SocialProfile.vue', description: 'Social media profile page', components: ['SocialPostCard', 'VCard', 'VTabs'], category: 'Social Media', complexity: 'complex' },
  { name: 'FollowersList', path: 'social/FollowersList.vue', description: 'Followers/following list', components: ['VCard', 'VList', 'VAvatar'], category: 'Social Media', complexity: 'medium' },
  { name: 'SocialStats', path: 'social/SocialStats.vue', description: 'Social analytics stats', components: ['StatCard', 'SectionHeader', 'VCard'], category: 'Social Media', complexity: 'medium' },
]

export const categories = [
  'Authentication',
  'Dashboards',
  'Landing Pages',
  'Chat & Messaging',
  'Forms',
  'Cards',
  'Tables',
  'Navigation',
  'Modals & Dialogs',
  'Lists',
  'Error Pages',
  'Settings & Profile',
  'E-commerce',
  'FinTech',
  'Blog',
  'Social Media',
]
