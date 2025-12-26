<template>
  <VContainer fluid class="pa-6">
    <!-- Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <VBtn
          to="/examples"
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Back to Examples
        </VBtn>
        <h1 class="text-h3 font-weight-bold mb-2">
          <VIcon icon="mdi-form-select" size="large" color="orange" class="mr-2" />
          Forms
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Contact, checkout, multi-step, and filter forms with validation
        </p>
      </VCol>
    </VRow>

    <!-- Contact Form -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-email" class="mr-2" />
            Contact Form
            <VSpacer />
            <VChip color="orange" size="small">VCard, VTextField, VTextarea, VSelect</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Contact form with validation</p>
            <ContactForm />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Checkout Form -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-credit-card" class="mr-2" />
            Checkout Form
            <VSpacer />
            <VChip color="orange" size="small">VCard, VTextField, VRadioGroup</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">E-commerce checkout form with payment details</p>
            <CheckoutForm />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Multi-Step Form -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-arrow-decision" class="mr-2" />
            Multi-Step Form
            <VSpacer />
            <VChip color="orange" size="small">VStepper, VTextField, VFileInput</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Wizard-style form with validation per step</p>
            <MultiStepForm />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Filter Form -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-filter" class="mr-2" />
            Filter Form
            <VSpacer />
            <VChip color="orange" size="small">VRangeSlider, VChipGroup, VExpansionPanels</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Advanced filter form for data filtering</p>
            <FilterForm />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  ContactForm,
  CheckoutForm,
  MultiStepForm,
  FilterForm
} from '@/snippets'
</script>
