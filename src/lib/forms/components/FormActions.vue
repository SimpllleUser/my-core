<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    disabled?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
    resetLabel?: string;
    showCancel?: boolean;
    showReset?: boolean;
    submitColor?: string;
    cancelColor?: string;
    resetColor?: string;
  }>(),
  {
    loading: false,
    disabled: false,
    submitLabel: 'Submit',
    cancelLabel: 'Cancel',
    resetLabel: 'Reset',
    showCancel: false,
    showReset: false,
    submitColor: 'primary',
    cancelColor: undefined,
    resetColor: undefined,
  }
);

const emit = defineEmits<{
  submit: [];
  cancel: [];
  reset: [];
}>();

const isDisabled = computed(() => props.disabled || props.loading);

function handleSubmit() {
  if (!isDisabled.value) {
    emit('submit');
  }
}

function handleCancel() {
  emit('cancel');
}

function handleReset() {
  emit('reset');
}
</script>

<template>
  <div class="form-actions">
    <slot name="prepend" />

    <slot name="reset" :reset="handleReset" :disabled="loading">
      <VBtn
        v-if="showReset"
        :color="resetColor"
        :disabled="loading"
        variant="text"
        @click="handleReset"
      >
        {{ resetLabel }}
      </VBtn>
    </slot>

    <VSpacer />

    <slot name="cancel" :cancel="handleCancel" :disabled="loading">
      <VBtn
        v-if="showCancel"
        :color="cancelColor"
        :disabled="loading"
        variant="text"
        @click="handleCancel"
      >
        {{ cancelLabel }}
      </VBtn>
    </slot>

    <slot name="submit" :submit="handleSubmit" :loading="loading" :disabled="isDisabled">
      <VBtn
        :color="submitColor"
        :loading="loading"
        :disabled="isDisabled"
        type="submit"
        @click="handleSubmit"
      >
        {{ submitLabel }}
      </VBtn>
    </slot>

    <slot name="append" />
  </div>
</template>

<style scoped>
.form-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 16px;
}
</style>
