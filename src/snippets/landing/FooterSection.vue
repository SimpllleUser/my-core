<!--
  Snippet: Footer Section
  Description: Website footer with links, social icons, and newsletter
  Components: VContainer, VRow, VCol, VBtn, VDivider, VTextField
  Complexity: Medium
-->
<template>
  <div>
    <!-- Footer Style 1: Simple -->
    <footer class="bg-grey-darken-4 py-8">
      <VContainer>
        <VRow align="center">
          <VCol cols="12" md="6">
            <div class="d-flex align-center mb-4 mb-md-0">
              <VIcon color="primary" size="32" class="mr-2">{{ Icons.Hexagon }}</VIcon>
              <span class="text-h6 font-weight-bold text-white">AppName</span>
            </div>
          </VCol>
          <VCol cols="12" md="6">
            <div class="d-flex flex-wrap justify-md-end ga-4">
              <a
                v-for="link in simpleLinks"
                :key="link"
                href="#"
                class="text-grey-lighten-1 text-decoration-none"
              >
                {{ link }}
              </a>
            </div>
          </VCol>
        </VRow>
        <VDivider class="my-6" color="grey-darken-3" />
        <VRow align="center">
          <VCol cols="12" md="6">
            <p class="text-body-2 text-grey-lighten-1 mb-0">
              © 2024 AppName. All rights reserved.
            </p>
          </VCol>
          <VCol cols="12" md="6">
            <div class="d-flex justify-md-end ga-2">
              <VBtn
                v-for="social in socialLinks"
                :key="social.name"
                icon
                variant="text"
                color="grey-lighten-1"
                size="small"
              >
                <VIcon>{{ social.icon }}</VIcon>
              </VBtn>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </footer>

    <VDivider class="my-0" />

    <!-- Footer Style 2: Multi-column -->
    <footer class="bg-grey-darken-4 py-12">
      <VContainer>
        <VRow>
          <VCol cols="12" md="4" class="mb-8 mb-md-0">
            <div class="d-flex align-center mb-4">
              <VIcon color="primary" size="36" class="mr-2">{{ Icons.Hexagon }}</VIcon>
              <span class="text-h5 font-weight-bold text-white">AppName</span>
            </div>
            <p class="text-body-2 text-grey-lighten-1 mb-4">
              Making the world a better place through innovative technology solutions.
            </p>
            <div class="d-flex ga-2">
              <VBtn
                v-for="social in socialLinks"
                :key="social.name"
                icon
                variant="tonal"
                color="grey-lighten-1"
                size="small"
              >
                <VIcon size="18">{{ social.icon }}</VIcon>
              </VBtn>
            </div>
          </VCol>
          <VCol v-for="column in footerColumns" :key="column.title" cols="6" md="2">
            <h4 class="text-subtitle-2 font-weight-bold text-white mb-4">{{ column.title }}</h4>
            <VList density="compact" class="bg-transparent">
              <VListItem
                v-for="link in column.links"
                :key="link"
                class="px-0 text-grey-lighten-1"
                :style="{ minHeight: '32px' }"
              >
                {{ link }}
              </VListItem>
            </VList>
          </VCol>
        </VRow>

        <VDivider class="my-8" color="grey-darken-3" />

        <VRow align="center">
          <VCol cols="12" md="6">
            <p class="text-body-2 text-grey-lighten-1 mb-0">
              © 2024 AppName, Inc. All rights reserved.
            </p>
          </VCol>
          <VCol cols="12" md="6">
            <div class="d-flex flex-wrap justify-md-end ga-4">
              <a href="#" class="text-grey-lighten-1 text-decoration-none text-body-2">Privacy Policy</a>
              <a href="#" class="text-grey-lighten-1 text-decoration-none text-body-2">Terms of Service</a>
              <a href="#" class="text-grey-lighten-1 text-decoration-none text-body-2">Cookie Policy</a>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </footer>

    <VDivider class="my-0" />

    <!-- Footer Style 3: With Newsletter -->
    <footer class="bg-grey-darken-4 py-12">
      <VContainer>
        <VRow class="mb-8">
          <VCol cols="12" md="5">
            <div class="d-flex align-center mb-4">
              <VIcon color="primary" size="36" class="mr-2">{{ Icons.Hexagon }}</VIcon>
              <span class="text-h5 font-weight-bold text-white">AppName</span>
            </div>
            <p class="text-body-2 text-grey-lighten-1 mb-4">
              Subscribe to our newsletter for the latest updates and exclusive content.
            </p>
            <VRow class="ga-2">
              <VCol cols="12" sm="8">
                <VTextField
                  placeholder="Enter your email"
                  variant="solo-filled"
                  bg-color="grey-darken-3"
                  density="comfortable"
                  hide-details
                />
              </VCol>
              <VCol cols="12" sm="auto">
                <VBtn color="primary" block>
                  Subscribe
                </VBtn>
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="12" md="7">
            <VRow>
              <VCol v-for="column in footerColumns.slice(0, 3)" :key="column.title" cols="4">
                <h4 class="text-subtitle-2 font-weight-bold text-white mb-3">{{ column.title }}</h4>
                <div class="d-flex flex-column ga-2">
                  <a
                    v-for="link in column.links"
                    :key="link"
                    href="#"
                    class="text-grey-lighten-1 text-decoration-none text-body-2"
                  >
                    {{ link }}
                  </a>
                </div>
              </VCol>
            </VRow>
          </VCol>
        </VRow>

        <VDivider color="grey-darken-3" />

        <VRow align="center" class="pt-6">
          <VCol cols="12" md="6">
            <div class="d-flex flex-wrap ga-4">
              <a href="#" class="text-grey-lighten-1 text-decoration-none text-body-2">Privacy</a>
              <a href="#" class="text-grey-lighten-1 text-decoration-none text-body-2">Terms</a>
              <a href="#" class="text-grey-lighten-1 text-decoration-none text-body-2">Cookies</a>
            </div>
          </VCol>
          <VCol cols="12" md="6" class="text-md-right">
            <p class="text-body-2 text-grey-lighten-1 mb-0">
              © 2024 AppName. Made with
              <VIcon size="14" color="error">{{ Icons.Heart }}</VIcon>
              by our team.
            </p>
          </VCol>
        </VRow>
      </VContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'

const simpleLinks = ['About', 'Features', 'Pricing', 'Blog', 'Contact']

const socialLinks = [
  { name: 'Twitter', icon: Icons.Twitter },
  { name: 'Github', icon: Icons.Github },
  { name: 'LinkedIn', icon: Icons.LinkedIn },
  { name: 'Instagram', icon: Icons.Instagram },
]

const footerColumns = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Integrations', 'API', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Help Center', 'Community', 'Tutorials', 'Status'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookies', 'Licenses'],
  },
]
</script>
