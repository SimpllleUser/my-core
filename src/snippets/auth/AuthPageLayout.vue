<!--
  Snippet: Auth Page Layout
  Description: Highly customizable layout for authentication pages with flexible positioning, backgrounds, and slots
  Components: VContainer, VRow, VCol, VSheet
  Variants: Light/Dark (automatic via Vuetify theme)

  Props:
    - formPosition: 'left' | 'center' | 'right' (default: 'center')
    - backgroundType: 'color' | 'image' | 'gradient' | 'split' (default: 'color')
    - backgroundColor: string (CSS color)
    - backgroundImage: string (URL)
    - backgroundGradient: string (CSS gradient)
    - overlayColor: string (overlay color for images)
    - overlayOpacity: number (0-1)
    - formWidth: string | number (form container width)
    - minHeight: string (minimum height)
    - contentMaxWidth: string | number (max width for split layout content)

  Slots:
    - default: Main form content
    - background: Custom background content
    - side-content: Content for split layout (left or right side)
    - header: Header above the form
    - footer: Footer below the form
    - logo: Logo placement
-->
<template>
  <VSheet
    :class="containerClasses"
    :style="containerStyles"
    class="auth-page-layout"
  >
    <!-- Background Layer -->
    <div
      v-if="backgroundType !== 'split'"
      class="auth-page-layout__background"
      :style="backgroundStyles"
    >
      <slot name="background">
        <VImg
          v-if="backgroundType === 'image' && backgroundImage"
          :src="backgroundImage"
          cover
          class="auth-page-layout__background-image"
        />
      </slot>

      <!-- Overlay -->
      <div
        v-if="showOverlay"
        class="auth-page-layout__overlay"
        :style="overlayStyles"
      />
    </div>

    <!-- Split Layout -->
    <template v-if="backgroundType === 'split'">
      <VRow no-gutters class="fill-height">
        <!-- Side Content (Left or Right based on formPosition) -->
        <VCol
          v-if="formPosition === 'right'"
          cols="12"
          :md="splitRatio"
          class="d-none d-md-flex"
        >
          <VSheet
            class="auth-page-layout__side-content fill-height w-100"
            :style="sideContentStyles"
          >
            <slot name="side-content">
              <div class="d-flex flex-column align-center justify-center fill-height pa-8">
                <slot name="side-logo">
                  <VIcon size="80" color="white" class="mb-4">mdi-shield-lock</VIcon>
                </slot>
                <slot name="side-title">
                  <h1 class="text-h3 font-weight-bold text-white text-center mb-4">
                    Welcome Back
                  </h1>
                </slot>
                <slot name="side-subtitle">
                  <p class="text-body-1 text-white text-center" style="max-width: 400px;">
                    Sign in to continue to your account and access all features.
                  </p>
                </slot>
              </div>
            </slot>
          </VSheet>
        </VCol>

        <!-- Form Content -->
        <VCol
          cols="12"
          :md="12 - splitRatio"
          class="d-flex align-center justify-center"
        >
          <div
            class="auth-page-layout__form-wrapper pa-4 pa-md-8"
            :style="formWrapperStyles"
          >
            <slot name="logo" />
            <slot name="header" />
            <slot />
            <slot name="footer" />
          </div>
        </VCol>

        <!-- Side Content (Right when formPosition is left) -->
        <VCol
          v-if="formPosition === 'left'"
          cols="12"
          :md="splitRatio"
          class="d-none d-md-flex"
        >
          <VSheet
            class="auth-page-layout__side-content fill-height w-100"
            :style="sideContentStyles"
          >
            <slot name="side-content">
              <div class="d-flex flex-column align-center justify-center fill-height pa-8">
                <slot name="side-logo">
                  <VIcon size="80" color="white" class="mb-4">mdi-shield-lock</VIcon>
                </slot>
                <slot name="side-title">
                  <h1 class="text-h3 font-weight-bold text-white text-center mb-4">
                    Welcome Back
                  </h1>
                </slot>
                <slot name="side-subtitle">
                  <p class="text-body-1 text-white text-center" style="max-width: 400px;">
                    Sign in to continue to your account and access all features.
                  </p>
                </slot>
              </div>
            </slot>
          </VSheet>
        </VCol>
      </VRow>
    </template>

    <!-- Non-Split Layout -->
    <VContainer
      v-else
      fluid
      class="auth-page-layout__container fill-height"
    >
      <VRow
        align="center"
        :justify="rowJustify"
        class="fill-height"
      >
        <VCol
          cols="12"
          :sm="colSizes.sm"
          :md="colSizes.md"
          :lg="colSizes.lg"
          :offset-md="colOffsets.md"
          :offset-lg="colOffsets.lg"
        >
          <div
            class="auth-page-layout__form-wrapper"
            :style="formWrapperStyles"
          >
            <slot name="logo" />
            <slot name="header" />
            <slot />
            <slot name="footer" />
          </div>
        </VCol>
      </VRow>
    </VContainer>
  </VSheet>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AuthPageLayoutProps {
  /** Form position: 'left', 'center', or 'right' */
  formPosition?: 'left' | 'center' | 'right'
  /** Background type */
  backgroundType?: 'color' | 'image' | 'gradient' | 'split'
  /** Background color (CSS color value) */
  backgroundColor?: string
  /** Background image URL */
  backgroundImage?: string
  /** Background gradient (CSS gradient) */
  backgroundGradient?: string
  /** Overlay color for image backgrounds */
  overlayColor?: string
  /** Overlay opacity (0-1) */
  overlayOpacity?: number
  /** Form container width */
  formWidth?: string | number
  /** Minimum height of the layout */
  minHeight?: string
  /** Split ratio for split layout (columns out of 12) */
  splitRatio?: number
  /** Side content background color/gradient for split layout */
  sideContentBackground?: string
  /** Side content background image for split layout */
  sideContentImage?: string
  /** Whether to show pattern on background */
  showPattern?: boolean
  /** Pattern opacity */
  patternOpacity?: number
}

const props = withDefaults(defineProps<AuthPageLayoutProps>(), {
  formPosition: 'center',
  backgroundType: 'color',
  backgroundColor: undefined,
  backgroundImage: undefined,
  backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  overlayOpacity: 0.5,
  formWidth: '100%',
  minHeight: '100vh',
  splitRatio: 6,
  sideContentBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  sideContentImage: undefined,
  showPattern: false,
  patternOpacity: 0.1,
})

const containerClasses = computed(() => ({
  'auth-page-layout--split': props.backgroundType === 'split',
  'auth-page-layout--with-pattern': props.showPattern,
}))

const containerStyles = computed(() => ({
  minHeight: props.minHeight,
  position: 'relative' as const,
  overflow: 'hidden' as const,
}))

const backgroundStyles = computed(() => {
  const styles: Record<string, string> = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '0',
  }

  if (props.backgroundType === 'color' && props.backgroundColor) {
    styles.backgroundColor = props.backgroundColor
  } else if (props.backgroundType === 'gradient') {
    styles.background = props.backgroundGradient
  }

  return styles
})

const overlayStyles = computed(() => ({
  position: 'absolute' as const,
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: props.overlayColor,
  opacity: props.overlayOpacity,
}))

const showOverlay = computed(() => {
  return props.backgroundType === 'image' && props.overlayOpacity > 0
})

const sideContentStyles = computed(() => {
  const styles: Record<string, string> = {}

  if (props.sideContentImage) {
    styles.backgroundImage = `url(${props.sideContentImage})`
    styles.backgroundSize = 'cover'
    styles.backgroundPosition = 'center'
  } else if (props.sideContentBackground) {
    styles.background = props.sideContentBackground
  }

  return styles
})

const formWrapperStyles = computed(() => {
  const width = typeof props.formWidth === 'number'
    ? `${props.formWidth}px`
    : props.formWidth

  return {
    width,
    maxWidth: '100%',
    position: 'relative' as const,
    zIndex: '1',
  }
})

const rowJustify = computed(() => {
  switch (props.formPosition) {
    case 'left':
      return 'start'
    case 'right':
      return 'end'
    default:
      return 'center'
  }
})

const colSizes = computed(() => {
  if (props.formPosition === 'center') {
    return { sm: 10, md: 6, lg: 4 }
  }
  return { sm: 10, md: 6, lg: 5 }
})

const colOffsets = computed(() => {
  if (props.formPosition === 'left') {
    return { md: 1, lg: 1 }
  }
  if (props.formPosition === 'right') {
    return { md: 0, lg: 0 }
  }
  return { md: 0, lg: 0 }
})
</script>

<style scoped>
.auth-page-layout {
  position: relative;
  width: 100%;
}

.auth-page-layout__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.auth-page-layout__background-image {
  width: 100%;
  height: 100%;
}

.auth-page-layout__overlay {
  pointer-events: none;
}

.auth-page-layout__container {
  position: relative;
  z-index: 1;
}

.auth-page-layout__form-wrapper {
  width: 100%;
}

.auth-page-layout__side-content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.auth-page-layout--with-pattern .auth-page-layout__side-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: v-bind('props.patternOpacity');
  pointer-events: none;
}
</style>
