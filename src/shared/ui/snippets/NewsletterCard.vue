<script setup lang="ts">
import { ref } from 'vue'
import { Colors, Variants, Icons } from '../../model'
import type { ColorType, VariantType, IconType } from './types'

interface Props {
  title?: string
  subtitle?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string

  // Layout
  centered?: boolean
  inline?: boolean

  // Card
  cardVariant?: VariantType
  cardColor?: ColorType | string
  elevation?: number | string
  cardClass?: string
  contentClass?: string

  // Input
  inputVariant?: VariantType
  inputColor?: ColorType | string
  inputClass?: string

  // Button
  buttonColor?: ColorType | string
  buttonVariant?: VariantType
  buttonIcon?: IconType
  buttonClass?: string
  loading?: boolean

  // Privacy note
  privacyText?: string
  privacyIcon?: IconType

  // Text
  titleClass?: string
  subtitleClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Stay in the loop',
  subtitle: 'Get the latest news and updates delivered to your inbox.',
  placeholder: 'Enter your email',
  buttonText: 'Subscribe',
  successMessage: 'Thanks for subscribing!',
  centered: true,
  inline: true,
  cardVariant: Variants.Flat,
  elevation: 0,
  contentClass: 'pa-6',
  inputVariant: Variants.Outlined,
  buttonColor: Colors.Primary,
  buttonVariant: Variants.Elevated,
  buttonIcon: Icons.Send,
  privacyIcon: Icons.Lock,
  titleClass: 'text-h5 font-weight-bold',
  subtitleClass: 'text-body-2 text-medium-emphasis',
})

const emit = defineEmits<{ submit: [email: string] }>()

const email = ref('')
const submitted = ref(false)
const valid = ref(false)

const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Enter a valid email',
]

function handleSubmit() {
  if (!valid.value) return
  emit('submit', email.value)
  submitted.value = true
  email.value = ''
}
</script>
<template>
  <VCard :variant="cardVariant" :color="cardColor" :elevation="elevation" :class="cardClass">
    <VCardText :class="[contentClass, { 'text-center': centered }]">
      <slot name="header">
        <h3 v-if="title" :class="[titleClass, 'mb-2']">{{ title }}</h3>
        <p v-if="subtitle" :class="[subtitleClass, 'mb-4']">{{ subtitle }}</p>
      </slot>

      <slot name="form" :email="email" :submitted="submitted">
        <Transition name="fade" mode="out-in">
          <div v-if="submitted" class="d-flex align-center justify-center gap-2 py-2">
            <VIcon color="success">{{ Icons.Check }}</VIcon>
            <span class="text-body-1 text-success">{{ successMessage }}</span>
          </div>

          <VForm v-else v-model="valid" @submit.prevent="handleSubmit">
            <div :class="['d-flex gap-3', inline ? 'flex-row align-start' : 'flex-column']">
              <VTextField
                v-model="email"
                :placeholder="placeholder"
                :variant="inputVariant"
                :color="inputColor"
                :class="[inputClass, 'flex-grow-1']"
                type="email"
                :rules="emailRules"
                hide-details="auto"
              />
              <VBtn
                type="submit"
                :color="buttonColor"
                :variant="buttonVariant"
                :loading="loading"
                :append-icon="buttonIcon"
                :class="buttonClass"
                :block="!inline"
              >
                {{ buttonText }}
              </VBtn>
            </div>
          </VForm>
        </Transition>
      </slot>

      <slot name="privacy">
        <p v-if="privacyText" class="text-caption text-medium-emphasis mt-3 mb-0">
          <VIcon v-if="privacyIcon" size="14" class="mr-1">{{ privacyIcon }}</VIcon>
          {{ privacyText }}
        </p>
      </slot>

      <slot />
    </VCardText>
  </VCard>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
