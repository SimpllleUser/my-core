<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { FieldDefinition, SelectOption, RadioOption } from '../types';
import { getRegisteredComponent } from '../registry';

const props = defineProps<{
  field: FieldDefinition;
  modelValue: unknown;
  error?: string;
  touched?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: unknown];
  blur: [name: string];
  change: [name: string];
}>();

// Password visibility toggle
const showPassword = ref(false);

// Autocomplete search state
const autocompleteItems = ref<unknown[]>([]);
const autocompleteLoading = ref(false);
const searchQuery = ref('');

// Local value for v-model binding
const localValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
    emit('change', props.field.name);
  },
});

// Handle blur
function handleBlur() {
  emit('blur', props.field.name);
}

// Common props for all field types
const commonProps = computed(() => {
  const config = props.field.config;
  return {
    label: props.field.label,
    placeholder: props.field.placeholder,
    hint: props.field.hint,
    disabled: props.field.disabled === true,
    readonly: config.readonly as boolean,
    density: config.density as 'default' | 'comfortable' | 'compact',
    variant: config.variant as string,
    color: config.color as string,
    bgColor: config.bgColor as string,
    class: config.class,
    style: config.style,
    prependIcon: config.prependIcon as string,
    appendIcon: config.appendIcon as string,
    prependInnerIcon: config.prependInnerIcon as string,
    appendInnerIcon: config.appendInnerIcon as string,
    clearable: config.clearable as boolean,
    errorMessages: props.error ? [props.error] : [],
    persistentHint: true,
  };
});

// Text field specific props
const textFieldProps = computed(() => {
  const config = props.field.config;
  return {
    ...commonProps.value,
    maxlength: config.maxlength as number,
    counter: config.counter as boolean | number,
    prefix: config.prefix as string,
    suffix: config.suffix as string,
    type: config.type as string || 'text',
  };
});

// Password field props
const passwordFieldProps = computed(() => {
  const config = props.field.config;
  const toggleVisibility = config.toggleVisibility !== false;
  return {
    ...commonProps.value,
    maxlength: config.maxlength as number,
    counter: config.counter as boolean | number,
    type: showPassword.value ? 'text' : 'password',
    appendInnerIcon: toggleVisibility
      ? (showPassword.value ? 'mdi-eye-off' : 'mdi-eye')
      : config.appendInnerIcon as string,
  };
});

// Number field props
const numberFieldProps = computed(() => {
  const config = props.field.config;
  return {
    ...commonProps.value,
    type: 'number',
    min: config.min as number,
    max: config.max as number,
    step: config.step as number,
    prefix: config.prefix as string,
    suffix: config.suffix as string,
  };
});

// Select field props
const selectFieldProps = computed(() => {
  const config = props.field.config;
  return {
    ...commonProps.value,
    items: config.items as unknown[],
    itemTitle: config.itemTitle as string || 'title',
    itemValue: config.itemValue as string || 'value',
    multiple: config.multiple as boolean,
    chips: config.chips as boolean,
    closableChips: config.closableChips as boolean,
    returnObject: config.returnObject as boolean,
  };
});

// Autocomplete specific logic
async function handleAutocompleteSearch(query: string) {
  const config = props.field.config;
  const searchFn = config.searchFn as ((q: string) => Promise<unknown[]>) | undefined;
  const minLength = (config.minSearchLength as number) || 1;

  if (!searchFn || query.length < minLength) {
    autocompleteItems.value = (config.items as unknown[]) || [];
    return;
  }

  autocompleteLoading.value = true;
  try {
    autocompleteItems.value = await searchFn(query);
  } catch (error) {
    console.error('Autocomplete search error:', error);
    autocompleteItems.value = [];
  } finally {
    autocompleteLoading.value = false;
  }
}

// Debounced autocomplete search
let searchTimeout: ReturnType<typeof setTimeout>;
watch(searchQuery, (query) => {
  clearTimeout(searchTimeout);
  const debounce = (props.field.config.debounce as number) || 300;
  searchTimeout = setTimeout(() => handleAutocompleteSearch(query), debounce);
});

// Initialize autocomplete items
if (props.field.type === 'autocomplete') {
  autocompleteItems.value = (props.field.config.items as unknown[]) || [];
}

// Autocomplete field props
const autocompleteFieldProps = computed(() => {
  const config = props.field.config;
  return {
    ...commonProps.value,
    items: autocompleteItems.value,
    itemTitle: config.itemTitle as string || 'title',
    itemValue: config.itemValue as string || 'value',
    multiple: config.multiple as boolean,
    chips: config.chips as boolean,
    closableChips: config.closableChips as boolean,
    returnObject: config.returnObject as boolean,
    loading: autocompleteLoading.value,
    noFilter: config.noFilter as boolean || !!config.searchFn,
  };
});

// Textarea props
const textareaFieldProps = computed(() => {
  const config = props.field.config;
  return {
    ...commonProps.value,
    rows: config.rows as number || 3,
    autoGrow: config.autoGrow as boolean,
    maxRows: config.maxRows as number,
    counter: config.counter as boolean | number,
    maxlength: config.maxlength as number,
    noResize: config.noResize as boolean,
  };
});

// Switch props
const switchFieldProps = computed(() => {
  const config = props.field.config;
  return {
    label: props.field.label,
    disabled: props.field.disabled === true,
    color: config.color as string || 'primary',
    inset: config.inset as boolean,
    trueValue: config.trueValue,
    falseValue: config.falseValue,
    hideDetails: !props.field.hint && !props.error,
    errorMessages: props.error ? [props.error] : [],
  };
});

// Checkbox props
const checkboxFieldProps = computed(() => {
  const config = props.field.config;
  return {
    label: props.field.label,
    disabled: props.field.disabled === true,
    color: config.color as string || 'primary',
    trueValue: config.trueValue,
    falseValue: config.falseValue,
    indeterminate: config.indeterminate as boolean,
    hideDetails: !props.field.hint && !props.error,
    errorMessages: props.error ? [props.error] : [],
  };
});

// Date field props
const dateFieldProps = computed(() => {
  const config = props.field.config;
  return {
    ...commonProps.value,
    min: config.min as string,
    max: config.max as string,
  };
});

// File field props
const fileFieldProps = computed(() => {
  const config = props.field.config;
  return {
    ...commonProps.value,
    accept: config.accept as string,
    multiple: config.multiple as boolean,
    showSize: config.showSize as boolean,
    chips: config.chips as boolean,
    counter: config.counter as boolean,
  };
});

// Radio field props
const radioFieldProps = computed(() => {
  const config = props.field.config;
  const options = config.options as RadioOption[] | string[];
  return {
    disabled: props.field.disabled === true,
    inline: config.inline as boolean,
    items: Array.isArray(options)
      ? options.map((opt) =>
          typeof opt === 'string'
            ? { label: opt, value: opt }
            : opt
        )
      : [],
    errorMessages: props.error ? [props.error] : [],
  };
});

// Rating props
const ratingFieldProps = computed(() => {
  const config = props.field.config;
  return {
    disabled: props.field.disabled === true,
    length: config.length as number || 5,
    size: config.size as string | number,
    emptyIcon: config.emptyIcon as string,
    fullIcon: config.fullIcon as string,
    halfIncrements: config.halfIncrements as boolean,
    hover: config.hover as boolean,
    itemAriaLabel: config.itemAriaLabel as string,
    color: config.color as string || 'primary',
  };
});

// Slider props
const sliderFieldProps = computed(() => {
  const config = props.field.config;
  return {
    ...commonProps.value,
    min: config.min as number ?? 0,
    max: config.max as number ?? 100,
    step: config.step as number ?? 1,
    thumbLabel: config.thumbLabel,
    tickLabels: config.tickLabels as string[],
    showTicks: config.showTicks,
    color: config.color as string || 'primary',
  };
});

// Color field props
const colorFieldProps = computed(() => {
  const config = props.field.config;
  return {
    disabled: props.field.disabled === true,
    mode: config.mode as string || 'hex',
    swatches: config.swatches as string[][],
    showSwatches: config.showSwatches as boolean,
    hideCanvas: config.hideCanvas as boolean,
    hideSliders: config.hideSliders as boolean,
    hideInputs: config.hideInputs as boolean,
  };
});

// Image preview URL
const imagePreviewUrl = computed(() => {
  const value = props.modelValue;
  if (!value) return null;

  if (value instanceof File) {
    return URL.createObjectURL(value);
  }

  if (typeof value === 'string') {
    return value;
  }

  return null;
});

// Toggle password visibility
function togglePassword() {
  showPassword.value = !showPassword.value;
}

// Get custom component if registered
const customComponent = computed(() => {
  if (props.field.type === 'custom') {
    return props.field.config.component;
  }
  return getRegisteredComponent(props.field.type);
});
</script>

<template>
  <div v-if="field.visible !== false" class="form-field">
    <!-- Text Field -->
    <VTextField
      v-if="field.type === 'text'"
      v-model="localValue"
      v-bind="textFieldProps"
      @blur="handleBlur"
    />

    <!-- Email Field -->
    <VTextField
      v-else-if="field.type === 'email'"
      v-model="localValue"
      v-bind="textFieldProps"
      type="email"
      @blur="handleBlur"
    />

    <!-- Password Field -->
    <VTextField
      v-else-if="field.type === 'password'"
      v-model="localValue"
      v-bind="passwordFieldProps"
      @blur="handleBlur"
      @click:append-inner="togglePassword"
    />

    <!-- Number Field -->
    <VTextField
      v-else-if="field.type === 'number' || field.type === 'money'"
      v-model.number="localValue"
      v-bind="numberFieldProps"
      @blur="handleBlur"
    />

    <!-- Phone Field -->
    <VTextField
      v-else-if="field.type === 'phone'"
      v-model="localValue"
      v-bind="textFieldProps"
      type="tel"
      @blur="handleBlur"
    />

    <!-- Select Field -->
    <VSelect
      v-else-if="field.type === 'select'"
      v-model="localValue"
      v-bind="selectFieldProps"
      @blur="handleBlur"
    />

    <!-- Autocomplete Field -->
    <VAutocomplete
      v-else-if="field.type === 'autocomplete'"
      v-model="localValue"
      v-model:search="searchQuery"
      v-bind="autocompleteFieldProps"
      @blur="handleBlur"
    />

    <!-- Textarea Field -->
    <VTextarea
      v-else-if="field.type === 'textarea'"
      v-model="localValue"
      v-bind="textareaFieldProps"
      @blur="handleBlur"
    />

    <!-- Switch Field -->
    <VSwitch
      v-else-if="field.type === 'switch'"
      v-model="localValue"
      v-bind="switchFieldProps"
      @blur="handleBlur"
    />

    <!-- Checkbox Field -->
    <VCheckbox
      v-else-if="field.type === 'checkbox'"
      v-model="localValue"
      v-bind="checkboxFieldProps"
      @blur="handleBlur"
    />

    <!-- Date Field -->
    <VTextField
      v-else-if="field.type === 'date'"
      v-model="localValue"
      v-bind="dateFieldProps"
      type="date"
      @blur="handleBlur"
    />

    <!-- Date Range Field -->
    <div v-else-if="field.type === 'date-range'" class="date-range-field">
      <VTextField
        :model-value="(localValue as unknown[])?.[0]"
        v-bind="dateFieldProps"
        :label="field.config.startLabel as string || 'Start Date'"
        type="date"
        @update:model-value="localValue = [$event, (localValue as unknown[])?.[1]]"
        @blur="handleBlur"
      />
      <VTextField
        :model-value="(localValue as unknown[])?.[1]"
        v-bind="dateFieldProps"
        :label="field.config.endLabel as string || 'End Date'"
        type="date"
        @update:model-value="localValue = [(localValue as unknown[])?.[0], $event]"
        @blur="handleBlur"
      />
    </div>

    <!-- File Field -->
    <VFileInput
      v-else-if="field.type === 'file'"
      v-model="localValue"
      v-bind="fileFieldProps"
      @blur="handleBlur"
    />

    <!-- Image Field -->
    <div v-else-if="field.type === 'image'" class="image-field">
      <VFileInput
        v-model="localValue"
        v-bind="fileFieldProps"
        accept="image/*"
        @blur="handleBlur"
      />
      <VImg
        v-if="imagePreviewUrl && field.config.showPreview !== false"
        :src="imagePreviewUrl"
        :width="field.config.previewWidth as number || 200"
        :height="field.config.previewHeight as number || 200"
        :cover="field.config.cover as boolean"
        class="mt-2"
      />
    </div>

    <!-- Radio Field -->
    <VRadioGroup
      v-else-if="field.type === 'radio'"
      v-model="localValue"
      :label="field.label"
      :inline="radioFieldProps.inline"
      :error-messages="radioFieldProps.errorMessages"
      @blur="handleBlur"
    >
      <VRadio
        v-for="(item, index) in radioFieldProps.items"
        :key="index"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled || field.disabled === true"
      />
    </VRadioGroup>

    <!-- Rating Field -->
    <div v-else-if="field.type === 'rating'" class="rating-field">
      <label v-if="field.label" class="v-label mb-1">{{ field.label }}</label>
      <VRating
        v-model="localValue"
        v-bind="ratingFieldProps"
      />
      <div v-if="error" class="v-messages error--text">{{ error }}</div>
    </div>

    <!-- Slider Field -->
    <VSlider
      v-else-if="field.type === 'slider' && !field.config.range"
      v-model="localValue"
      v-bind="sliderFieldProps"
    />

    <!-- Range Slider Field -->
    <VRangeSlider
      v-else-if="field.type === 'slider' && field.config.range"
      v-model="localValue"
      v-bind="sliderFieldProps"
    />

    <!-- Color Field -->
    <div v-else-if="field.type === 'color'" class="color-field">
      <label v-if="field.label" class="v-label mb-1">{{ field.label }}</label>
      <VColorPicker
        v-model="localValue"
        v-bind="colorFieldProps"
      />
      <div v-if="error" class="v-messages error--text">{{ error }}</div>
    </div>

    <!-- Custom Field -->
    <Component
      v-else-if="customComponent"
      :is="customComponent"
      v-model="localValue"
      v-bind="{
        ...commonProps,
        ...field.config.props,
        field,
      }"
      @blur="handleBlur"
    />

    <!-- Slot for custom rendering -->
    <slot v-else :field="field" :value="localValue" :error="error">
      <div class="text-error">Unknown field type: {{ field.type }}</div>
    </slot>
  </div>
</template>

<style scoped>
.form-field {
  width: 100%;
}

.date-range-field {
  display: flex;
  gap: 16px;
}

.date-range-field > * {
  flex: 1;
}

.image-field {
  display: flex;
  flex-direction: column;
}

.rating-field,
.color-field {
  display: flex;
  flex-direction: column;
}

.rating-field .v-label,
.color-field .v-label {
  font-size: 12px;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.error--text {
  color: rgb(var(--v-theme-error));
  font-size: 12px;
  margin-top: 4px;
}
</style>
