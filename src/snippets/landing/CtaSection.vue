<!--
  Snippet: CTA Section (Simple)
  Description: Simple call-to-action sections for landing pages
  Components: VContainer, VRow, VCol, VBtn, VCard
  Complexity: Simple
-->
<template>
  <div>
    <!-- CTA Style 1: Minimal -->
    <section class="py-12">
      <VContainer>
        <VRow justify="center" align="center">
          <VCol cols="12" md="8" class="text-center">
            <h2 class="text-h4 font-weight-bold mb-4">Ready to Get Started?</h2>
            <p class="text-body-1 text-medium-emphasis mb-6">
              Join thousands of users who are already using our platform.
            </p>
            <VBtn color="primary" size="large">
              Start Free Trial
              <VIcon end>{{ Icons.ArrowRight }}</VIcon>
            </VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- CTA Style 2: Card -->
    <section class="py-12">
      <VContainer>
        <VCard class="pa-8 text-center" color="primary">
          <h2 class="text-h4 font-weight-bold text-white mb-4">
            Start Building Today
          </h2>
          <p class="text-body-1 text-white mb-6" style="opacity: 0.9">
            No credit card required. Free 14-day trial.
          </p>
          <div class="d-flex flex-wrap justify-center ga-3">
            <VBtn color="white" size="large">Get Started</VBtn>
            <VBtn variant="outlined" color="white" size="large">Learn More</VBtn>
          </div>
        </VCard>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- CTA Style 3: Split -->
    <section class="py-12 bg-grey-lighten-5">
      <VContainer>
        <VRow align="center" justify="space-between">
          <VCol cols="12" md="7">
            <h2 class="text-h4 font-weight-bold mb-2">Ready to transform your workflow?</h2>
            <p class="text-body-1 text-medium-emphasis mb-0">
              Get started in minutes. No credit card required.
            </p>
          </VCol>
          <VCol cols="12" md="auto">
            <VBtn color="primary" size="large" class="mr-2">
              <VIcon start>{{ Icons.RocketLaunch }}</VIcon>
              Get Started
            </VBtn>
            <VBtn variant="text" color="primary" size="large">
              Contact Sales
            </VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'
</script>
