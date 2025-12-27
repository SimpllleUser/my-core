<!--
  Snippet: Newsletter Section
  Description: Email subscription and newsletter signup forms
  Components: VContainer, VRow, VCol, VTextField, VBtn, VCard
  Complexity: Simple-Medium
-->
<template>
  <div>
    <!-- Newsletter Style 1: Simple Inline -->
    <section class="py-12 bg-grey-lighten-5">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" md="8" lg="6" class="text-center">
            <VIcon color="primary" size="48" class="mb-4">{{ Icons.Email }}</VIcon>
            <h2 class="text-h5 font-weight-bold mb-2">Subscribe to our newsletter</h2>
            <p class="text-body-2 text-medium-emphasis mb-4">
              Get the latest updates and news delivered to your inbox.
            </p>
            <VRow justify="center" class="ga-2">
              <VCol cols="12" sm="8">
                <VTextField
                  v-model="email"
                  placeholder="Enter your email"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  :prepend-inner-icon="Icons.At"
                />
              </VCol>
              <VCol cols="12" sm="auto">
                <VBtn color="primary" size="large" block>Subscribe</VBtn>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Newsletter Style 2: Card with Benefits -->
    <section class="py-12">
      <VContainer>
        <VCard class="pa-8" variant="outlined">
          <VRow align="center">
            <VCol cols="12" md="6">
              <h2 class="text-h5 font-weight-bold mb-3">
                <VIcon color="primary" class="mr-2">{{ Icons.Bell }}</VIcon>
                Stay in the Loop
              </h2>
              <VList density="compact" class="bg-transparent">
                <VListItem v-for="benefit in benefits" :key="benefit" class="px-0">
                  <template #prepend>
                    <VIcon color="success" size="small" class="mr-2">{{ Icons.Check }}</VIcon>
                  </template>
                  <VListItemTitle class="text-body-2">{{ benefit }}</VListItemTitle>
                </VListItem>
              </VList>
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="email"
                label="Email address"
                variant="outlined"
                :prepend-inner-icon="Icons.Email"
                class="mb-3"
                hide-details
              />
              <VBtn color="primary" block size="large">
                Subscribe Now
                <VIcon end>{{ Icons.Send }}</VIcon>
              </VBtn>
              <p class="text-caption text-medium-emphasis text-center mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </VCol>
          </VRow>
        </VCard>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Newsletter Style 3: Gradient Background -->
    <section class="py-16" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" md="8" class="text-center">
            <h2 class="text-h4 font-weight-bold text-white mb-3">
              Join 10,000+ subscribers
            </h2>
            <p class="text-body-1 text-white mb-6" style="opacity: 0.9">
              Get weekly insights, tips, and exclusive content straight to your inbox.
            </p>
            <VCard class="pa-2" rounded="pill">
              <VRow align="center" no-gutters>
                <VCol>
                  <VTextField
                    v-model="email"
                    placeholder="your@email.com"
                    variant="plain"
                    density="comfortable"
                    hide-details
                    class="px-4"
                  />
                </VCol>
                <VCol cols="auto">
                  <VBtn color="primary" rounded="pill" size="large">
                    Subscribe
                  </VBtn>
                </VCol>
              </VRow>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '@/shared/model'

const email = ref('')

const benefits = [
  'Weekly product updates',
  'Exclusive tips and tutorials',
  'Early access to new features',
  'No spam, ever',
]
</script>
