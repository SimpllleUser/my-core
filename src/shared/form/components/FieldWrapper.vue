<script setup lang="ts">
import { computed } from 'vue'
import { VTooltip, VIcon } from 'vuetify/components'
import type { BaseField } from '../fields/BaseField'

interface Props {
  field: BaseField
  errors?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
})

const hasErrors = computed(() => props.errors.length > 0)
</script>

<template>
  <div :class="['field-wrapper', { 'field-wrapper--error': hasErrors, 'field-wrapper--disabled': field.isDisabled }]">
    <slot
      name="label"
      :label="field.label"
      :required="field.isRequired"
    >
      <label
        v-if="field.label"
        class="field-wrapper__label"
      >
        {{ field.label }}
        <span
          v-if="field.isRequired"
          class="field-wrapper__required"
        >*</span>
        <VTooltip
          v-if="field.info"
          :text="field.info"
          location="top"
          max-width="260"
        >
          <template #activator="{ props: tooltipProps }">
            <VIcon
              v-bind="tooltipProps"
              icon="mdi-information-outline"
              size="14"
              class="field-wrapper__info"
            />
          </template>
        </VTooltip>
      </label>
    </slot>

    <slot
      name="description"
      :description="field.description"
    >
      <p
        v-if="field.description"
        class="field-wrapper__description"
      >
        {{ field.description }}
      </p>
    </slot>

    <div class="field-wrapper__input">
      <slot
        :field="field"
        :errors="errors"
        :has-errors="hasErrors"
      />
    </div>

    <slot
      name="hint"
      :hint="field.config.hint"
    >
      <p
        v-if="field.config.hint && !hasErrors"
        class="field-wrapper__hint"
      >
        {{ field.config.hint }}
      </p>
    </slot>

    <slot
      name="errors"
      :errors="errors"
    >
      <p
        v-for="error in errors"
        :key="error"
        class="field-wrapper__error"
      >
        {{ error }}
      </p>
    </slot>
  </div>
</template>

<style scoped>
.field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-wrapper__label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.87);
}

.field-wrapper__required {
  color: rgb(var(--v-theme-error));
}

.field-wrapper__info {
  color: rgba(var(--v-theme-on-surface), 0.4);
  cursor: help;
}

.field-wrapper__description {
  font-size: 0.75rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin: 0;
}

.field-wrapper__hint {
  font-size: 0.75rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
  margin: 0;
}

.field-wrapper__error {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-error));
  margin: 0;
}

.field-wrapper--error .field-wrapper__label {
  color: rgb(var(--v-theme-error));
}

.field-wrapper--error .field-wrapper__info {
  color: rgba(var(--v-theme-error), 0.6);
}
</style>
