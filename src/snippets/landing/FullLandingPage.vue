<!--
  Snippet: Full Landing Page (Complex)
  Description: Complete landing page with all sections combined
  Components: All major Vuetify components
  Complexity: Complex - Full page example
-->
<template>
  <div>
    <!-- Navigation -->
    <VAppBar flat color="transparent" class="px-4">
      <VAppBarTitle>
        <div class="d-flex align-center">
          <VIcon color="primary" size="32" class="mr-2">{{ Icons.Hexagon }}</VIcon>
          <span class="font-weight-bold">ProductName</span>
        </div>
      </VAppBarTitle>

      <template #append>
        <div class="d-none d-md-flex align-center ga-2">
          <VBtn v-for="link in navLinks" :key="link" variant="text">{{ link }}</VBtn>
          <VBtn variant="outlined" class="ml-2">Login</VBtn>
          <VBtn color="primary">Get Started</VBtn>
        </div>
        <VBtn icon class="d-md-none" @click="drawer = !drawer">
          <VIcon>{{ Icons.Menu }}</VIcon>
        </VBtn>
      </template>
    </VAppBar>

    <!-- Mobile Drawer -->
    <VNavigationDrawer v-model="drawer" temporary location="right">
      <VList>
        <VListItem v-for="link in navLinks" :key="link" :title="link" />
        <VDivider class="my-2" />
        <VListItem title="Login" />
        <VListItem title="Get Started" class="text-primary" />
      </VList>
    </VNavigationDrawer>

    <!-- Hero Section -->
    <section class="py-16">
      <VContainer>
        <VRow align="center">
          <VCol cols="12" md="6">
            <VChip color="primary" variant="tonal" class="mb-4">
              <VIcon start size="small">{{ Icons.Star }}</VIcon>
              #1 Rated Platform
            </VChip>
            <h1 class="text-h2 font-weight-bold mb-4">
              Build Better Products
              <span class="text-primary">10x Faster</span>
            </h1>
            <p class="text-body-1 text-medium-emphasis mb-6">
              The all-in-one platform that empowers teams to design, build, and ship amazing products. Join 10,000+ companies already using our platform.
            </p>
            <div class="d-flex flex-wrap ga-3 mb-6">
              <VBtn color="primary" size="large">
                Start Free Trial
                <VIcon end>{{ Icons.ArrowRight }}</VIcon>
              </VBtn>
              <VBtn variant="outlined" size="large">
                <VIcon start>{{ Icons.PlayCircle }}</VIcon>
                Watch Demo
              </VBtn>
            </div>
            <div class="d-flex align-center ga-4">
              <div class="d-flex">
                <VAvatar v-for="n in 4" :key="n" size="32" class="border-2 border-white" style="margin-left: -8px;">
                  <VImg :src="`https://randomuser.me/api/portraits/${n % 2 ? 'men' : 'women'}/${n + 10}.jpg`" />
                </VAvatar>
              </div>
              <div>
                <VRating :model-value="5" color="warning" readonly density="compact" size="small" />
                <p class="text-caption text-medium-emphasis mb-0">from 2,000+ reviews</p>
              </div>
            </div>
          </VCol>
          <VCol cols="12" md="6">
            <VCard class="elevation-12 rounded-xl overflow-hidden">
              <VImg src="https://picsum.photos/seed/landing/600/400" />
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- Logo Cloud -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <p class="text-center text-body-2 text-medium-emphasis mb-4">Trusted by leading companies</p>
        <VRow justify="center" align="center" class="ga-8">
          <VCol v-for="company in companies" :key="company.name" cols="auto">
            <div class="d-flex align-center text-grey-darken-1">
              <VIcon size="24" class="mr-2">{{ company.icon }}</VIcon>
              <span class="font-weight-medium">{{ company.name }}</span>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- Features -->
    <section class="py-16">
      <VContainer>
        <div class="text-center mb-12">
          <VChip color="primary" variant="tonal" class="mb-4">Features</VChip>
          <h2 class="text-h3 font-weight-bold mb-4">Everything You Need</h2>
          <p class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 600px;">
            Powerful features to help you build, manage, and scale your product.
          </p>
        </div>

        <VRow>
          <VCol v-for="feature in features" :key="feature.title" cols="12" sm="6" lg="4">
            <VCard class="pa-6" height="100%" variant="outlined" hover>
              <VAvatar :color="feature.color" size="56" rounded="lg" class="mb-4">
                <VIcon color="white" size="28">{{ feature.icon }}</VIcon>
              </VAvatar>
              <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">{{ feature.description }}</p>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- Stats -->
    <section class="py-12" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <VContainer>
        <VRow>
          <VCol v-for="stat in stats" :key="stat.label" cols="6" md="3" class="text-center">
            <h2 class="text-h3 font-weight-bold text-white mb-2">{{ stat.value }}</h2>
            <p class="text-body-1 text-white mb-0" style="opacity: 0.9">{{ stat.label }}</p>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- Testimonials -->
    <section class="py-16">
      <VContainer>
        <div class="text-center mb-12">
          <VChip color="primary" variant="tonal" class="mb-4">Testimonials</VChip>
          <h2 class="text-h3 font-weight-bold mb-4">Loved by Thousands</h2>
        </div>

        <VRow>
          <VCol v-for="testimonial in testimonials" :key="testimonial.name" cols="12" md="4">
            <VCard class="pa-6" height="100%">
              <VRating :model-value="5" color="warning" readonly density="compact" class="mb-4" />
              <p class="text-body-1 mb-6">"{{ testimonial.text }}"</p>
              <div class="d-flex align-center">
                <VAvatar size="48" class="mr-3">
                  <VImg :src="testimonial.avatar" />
                </VAvatar>
                <div>
                  <p class="font-weight-medium mb-0">{{ testimonial.name }}</p>
                  <p class="text-caption text-medium-emphasis mb-0">{{ testimonial.role }}</p>
                </div>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- Pricing -->
    <section class="py-16 bg-grey-lighten-5">
      <VContainer>
        <div class="text-center mb-12">
          <VChip color="primary" variant="tonal" class="mb-4">Pricing</VChip>
          <h2 class="text-h3 font-weight-bold mb-4">Simple Pricing</h2>
          <p class="text-body-1 text-medium-emphasis">No hidden fees. Cancel anytime.</p>
        </div>

        <VRow justify="center">
          <VCol v-for="plan in plans" :key="plan.name" cols="12" sm="6" lg="4">
            <VCard
              :class="{ 'border-primary border-2': plan.featured }"
              :elevation="plan.featured ? 12 : 2"
              height="100%"
              class="d-flex flex-column"
            >
              <VCardText class="flex-grow-1 pa-6">
                <VChip
                  v-if="plan.featured"
                  color="primary"
                  size="small"
                  class="mb-4"
                >
                  Most Popular
                </VChip>
                <h3 class="text-h5 font-weight-bold mb-2">{{ plan.name }}</h3>
                <p class="text-body-2 text-medium-emphasis mb-4">{{ plan.description }}</p>
                <div class="d-flex align-baseline mb-6">
                  <span class="text-h3 font-weight-bold">${{ plan.price }}</span>
                  <span class="text-medium-emphasis">/month</span>
                </div>
                <VList density="compact" class="bg-transparent">
                  <VListItem v-for="feature in plan.features" :key="feature" class="px-0">
                    <template #prepend>
                      <VIcon color="success" size="small" class="mr-2">{{ Icons.Check }}</VIcon>
                    </template>
                    <VListItemTitle class="text-body-2">{{ feature }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VCardText>
              <VCardActions class="pa-6 pt-0">
                <VBtn
                  :color="plan.featured ? 'primary' : undefined"
                  :variant="plan.featured ? 'flat' : 'outlined'"
                  block
                  size="large"
                >
                  Get Started
                </VBtn>
              </VCardActions>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <!-- CTA -->
    <section class="py-16">
      <VContainer>
        <VCard class="pa-12 text-center" color="primary">
          <h2 class="text-h3 font-weight-bold text-white mb-4">Ready to Get Started?</h2>
          <p class="text-body-1 text-white mb-6" style="opacity: 0.9">
            Join thousands of teams already using our platform. Start your free trial today.
          </p>
          <VBtn color="white" size="x-large">
            Start Free Trial
            <VIcon end>{{ Icons.ArrowRight }}</VIcon>
          </VBtn>
        </VCard>
      </VContainer>
    </section>

    <!-- Footer -->
    <footer class="bg-grey-darken-4 py-12">
      <VContainer>
        <VRow>
          <VCol cols="12" md="4">
            <div class="d-flex align-center mb-4">
              <VIcon color="primary" size="32" class="mr-2">{{ Icons.Hexagon }}</VIcon>
              <span class="text-h6 font-weight-bold text-white">ProductName</span>
            </div>
            <p class="text-body-2 text-grey-lighten-1 mb-4">
              Building the future of product development, one team at a time.
            </p>
            <div class="d-flex ga-2">
              <VBtn icon variant="tonal" color="grey-lighten-1" size="small">
                <VIcon size="18">{{ Icons.Twitter }}</VIcon>
              </VBtn>
              <VBtn icon variant="tonal" color="grey-lighten-1" size="small">
                <VIcon size="18">{{ Icons.Github }}</VIcon>
              </VBtn>
              <VBtn icon variant="tonal" color="grey-lighten-1" size="small">
                <VIcon size="18">{{ Icons.LinkedIn }}</VIcon>
              </VBtn>
            </div>
          </VCol>
          <VCol v-for="column in footerColumns" :key="column.title" cols="6" md="2">
            <h4 class="text-subtitle-2 font-weight-bold text-white mb-4">{{ column.title }}</h4>
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
        <VDivider class="my-8" color="grey-darken-3" />
        <p class="text-center text-body-2 text-grey-lighten-1 mb-0">
          © 2024 ProductName. All rights reserved.
        </p>
      </VContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '@/shared/model'

const drawer = ref(false)
const navLinks = ['Features', 'Pricing', 'About', 'Blog']

const companies = [
  { name: 'Google', icon: Icons.Google },
  { name: 'Microsoft', icon: Icons.Microsoft },
  { name: 'Apple', icon: Icons.Apple },
  { name: 'Slack', icon: Icons.Slack },
  { name: 'Spotify', icon: Icons.Spotify },
]

const features = [
  { title: 'Lightning Fast', description: 'Optimized for speed with instant updates.', icon: Icons.Bolt, color: 'warning' },
  { title: 'Secure', description: 'Enterprise-grade security built-in.', icon: Icons.ShieldCheck, color: 'success' },
  { title: 'Integrations', description: 'Connect with 100+ tools.', icon: Icons.Puzzle, color: 'primary' },
  { title: 'Analytics', description: 'Powerful insights and reports.', icon: Icons.ChartLine, color: 'secondary' },
  { title: 'Collaboration', description: 'Work together in real-time.', icon: Icons.AccountGroup, color: 'info' },
  { title: 'Support', description: '24/7 dedicated support team.', icon: Icons.Headphones, color: 'error' },
]

const stats = [
  { value: '10K+', label: 'Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
  { value: '24/7', label: 'Support' },
]

const testimonials = [
  { name: 'John Smith', role: 'CEO, Acme Inc', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', text: 'This tool transformed our workflow completely.' },
  { name: 'Emily Chen', role: 'CTO, StartupXYZ', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', text: 'Best investment we made this year.' },
  { name: 'Michael Brown', role: 'Founder, DesignCo', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', text: 'A tool that just works. Highly recommended!' },
]

const plans = [
  { name: 'Starter', description: 'For individuals', price: 9, featured: false, features: ['3 projects', '1 GB storage', 'Basic analytics'] },
  { name: 'Pro', description: 'For growing teams', price: 29, featured: true, features: ['Unlimited projects', '50 GB storage', 'Advanced analytics', 'Priority support'] },
  { name: 'Enterprise', description: 'For large orgs', price: 99, featured: false, features: ['Everything in Pro', 'Unlimited storage', 'Custom integrations', 'Dedicated manager'] },
]

const footerColumns = [
  { title: 'Product', links: ['Features', 'Pricing', 'API'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers'] },
  { title: 'Resources', links: ['Docs', 'Help', 'Community'] },
  { title: 'Legal', links: ['Privacy', 'Terms'] },
]
</script>
