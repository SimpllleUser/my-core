<script setup lang="ts">
import { ref, computed } from 'vue';
import FormField from './FormField.vue';
import type { FieldDefinition, FormValues } from '../types';

const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    fields: FieldDefinition[];
    values: FormValues;
    errors?: Partial<Record<string, string>>;
    touched?: Partial<Record<string, boolean>>;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    cols?: number;
  }>(),
  {
    title: undefined,
    subtitle: undefined,
    errors: () => ({}),
    touched: () => ({}),
    collapsible: false,
    defaultCollapsed: false,
    cols: 12,
  }
);

const emit = defineEmits<{
  'update:values': [values: FormValues];
  blur: [name: string];
  change: [name: string];
}>();

const isCollapsed = ref(props.defaultCollapsed);

const visibleFields = computed(() => {
  return props.fields.filter((field) => {
    if (typeof field.visible === 'function') {
      return field.visible(props.values);
    }
    return field.visible !== false;
  });
});

function getFieldValue(name: string): unknown {
  return getNestedValue(props.values, name);
}

function setFieldValue(name: string, value: unknown): void {
  const newValues = setNestedValue({ ...props.values }, name, value);
  emit('update:values', newValues);
}

function handleBlur(name: string): void {
  emit('blur', name);
}

function handleChange(name: string): void {
  emit('change', name);
}

function toggleCollapse(): void {
  isCollapsed.value = !isCollapsed.value;
}

function getFieldCols(field: FieldDefinition): number | Record<string, number> {
  if (field.cols) {
    return field.cols as number | Record<string, number>;
  }
  return props.cols;
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current, key) => {
    if (current === null || current === undefined) return undefined;
    return (current as Record<string, unknown>)[key];
  }, obj as unknown);
}

function setNestedValue(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): Record<string, unknown> {
  const keys = path.split('.');
  const result = { ...obj };

  let current: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) };
    }
    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]] = value;
  return result;
}
</script>

<template>
  <div class="form-section">
    <div
      v-if="title || collapsible"
      class="form-section-header"
      :class="{ collapsible }"
      @click="collapsible ? toggleCollapse() : undefined"
    >
      <div class="form-section-title-wrapper">
        <h3 v-if="title" class="form-section-title">{{ title }}</h3>
        <p v-if="subtitle" class="form-section-subtitle">{{ subtitle }}</p>
      </div>
      <VIcon v-if="collapsible" :icon="isCollapsed ? 'mdi-chevron-down' : 'mdi-chevron-up'" />
    </div>

    <VExpandTransition>
      <div v-show="!isCollapsed" class="form-section-content">
        <VRow>
          <VCol
            v-for="field in visibleFields"
            :key="field.name"
            v-bind="typeof getFieldCols(field) === 'object'
              ? getFieldCols(field)
              : { cols: 12, md: getFieldCols(field) }"
          >
            <slot
              :name="`field-${field.name}`"
              :field="field"
              :value="getFieldValue(field.name)"
              :error="errors?.[field.name]"
              :touched="touched?.[field.name]"
              :set-value="(v: unknown) => setFieldValue(field.name, v)"
            >
              <FormField
                :field="field"
                :model-value="getFieldValue(field.name)"
                :error="errors?.[field.name]"
                :touched="touched?.[field.name]"
                @update:model-value="setFieldValue(field.name, $event)"
                @blur="handleBlur"
                @change="handleChange"
              />
            </slot>
          </VCol>
        </VRow>
      </div>
    </VExpandTransition>
  </div>
</template>

<style scoped>
.form-section {
  margin-bottom: 24px;
}

.form-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.form-section-header.collapsible {
  cursor: pointer;
  user-select: none;
}

.form-section-header.collapsible:hover {
  opacity: 0.8;
}

.form-section-title-wrapper {
  flex: 1;
}

.form-section-title {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
}

.form-section-subtitle {
  font-size: 14px;
  margin: 4px 0 0;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.form-section-content {
  padding-top: 8px;
}
</style>
