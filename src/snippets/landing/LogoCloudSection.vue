<!--
  Snippet: Logo Cloud Section
  Description: Partner and client logos showcase
  Components: VContainer, VRow, VCol, VIcon, VChip
  Complexity: Simple
-->
<template>
  <div>
    <!-- Logo Cloud Style 1: Simple Row -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <p class="text-center text-body-2 text-medium-emphasis mb-6">
          Trusted by leading companies worldwide
        </p>
        <VRow justify="center" align="center" class="ga-8">
          <VCol v-for="company in companies" :key="company.name" cols="auto">
            <div class="d-flex align-center text-grey-darken-1">
              <VIcon size="28" class="mr-2">{{ company.icon }}</VIcon>
              <span class="text-h6 font-weight-medium">{{ company.name }}</span>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Logo Cloud Style 2: With Stats -->
    <section class="py-12">
      <VContainer>
        <VRow justify="center" class="mb-8">
          <VCol cols="12" md="8" class="text-center">
            <h2 class="text-h5 font-weight-bold mb-2">Join 10,000+ companies</h2>
            <p class="text-body-2 text-medium-emphasis">
              From startups to Fortune 500, teams everywhere trust our platform
            </p>
          </VCol>
        </VRow>

        <VRow justify="center" class="mb-8">
          <VCol v-for="stat in stats" :key="stat.label" cols="6" md="3" class="text-center">
            <h3 class="text-h4 font-weight-bold text-primary">{{ stat.value }}</h3>
            <p class="text-body-2 text-medium-emphasis">{{ stat.label }}</p>
          </VCol>
        </VRow>

        <VDivider class="mb-8" />

        <VRow justify="center" align="center" class="ga-6">
          <VCol v-for="company in companies" :key="company.name" cols="6" sm="4" md="2" class="text-center">
            <VIcon size="32" color="grey-darken-1">{{ company.icon }}</VIcon>
            <p class="text-body-2 text-medium-emphasis mt-1 mb-0">{{ company.name }}</p>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Logo Cloud Style 3: Dark Background -->
    <section class="py-12 bg-grey-darken-4">
      <VContainer>
        <VRow>
          <VCol cols="12" md="4" class="mb-6 mb-md-0">
            <h3 class="text-h5 font-weight-bold text-white mb-2">
              Powering the best teams
            </h3>
            <p class="text-body-2 text-grey-lighten-1">
              Join thousands of leading companies that rely on our platform.
            </p>
          </VCol>
          <VCol cols="12" md="8">
            <VRow align="center" class="ga-4">
              <VCol v-for="company in companies" :key="company.name" cols="auto">
                <VChip variant="tonal" color="grey-lighten-2" size="large">
                  <VIcon start>{{ company.icon }}</VIcon>
                  {{ company.name }}
                </VChip>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'

const companies = [
  { name: 'Google', icon: Icons.Google },
  { name: 'Microsoft', icon: Icons.Microsoft },
  { name: 'Apple', icon: Icons.Apple },
  { name: 'Slack', icon: Icons.Slack },
  { name: 'Spotify', icon: Icons.Spotify },
  { name: 'Github', icon: Icons.Github },
]

const stats = [
  { value: '10K+', label: 'Companies' },
  { value: '1M+', label: 'Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
]
</script>
