<script setup lang="ts">
import { Icons } from '../../shared/model'
import { TimelineExamples, StepsProcess } from '../../snippets'
</script>
<template>
  <VContainer fluid class="pa-6">
    <!-- Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <VBtn to="/examples" variant="text" :prepend-icon="Icons.ArrowLeft" class="mb-4">
          Back to Examples
        </VBtn>
        <h1 class="text-h3 font-weight-bold mb-2">
          <VIcon :icon="Icons.Chart" size="large" color="deep-orange" class="mr-2" />
          Timeline & Steps
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Project history, activity feeds, and step-by-step process indicators
        </p>
      </VCol>
    </VRow>

    <!-- Timeline -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.History" class="mr-2" />
            Timeline
            <VSpacer />
            <VChip color="deep-orange" size="small">TimelineItem, VTimeline</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">
              Project history and activity feeds with alternating, compact, and simple dot variants.
            </p>
            <TimelineExamples />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Steps & Process -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.FormatListNumbered" class="mr-2" />
            Steps & Process
            <VSpacer />
            <VChip color="deep-orange" size="small">StepItem, VAvatar</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">
              Vertical onboarding steps, compact checkout progress, and horizontal grid layout.
            </p>
            <StepsProcess />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
