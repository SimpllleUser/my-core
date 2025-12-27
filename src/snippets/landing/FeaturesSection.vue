<!--
  Snippet: Features Section
  Description: Product features showcase with icons and descriptions
  Components: VContainer, VRow, VCol, VCard, VIcon
  Variants: Multiple layout styles included
-->
<template>
  <div>
    <!-- Features Style 1: Grid Layout -->
    <section class="py-16">
      <VContainer>
        <div class="text-center mb-12">
          <VChip color="primary" variant="tonal" class="mb-4">Features</VChip>
          <h2 class="text-h3 font-weight-bold mb-4">Everything You Need</h2>
          <p class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 600px;">
            Powerful features to help you manage and grow your business effectively.
          </p>
        </div>

        <VRow>
          <VCol v-for="feature in gridFeatures" :key="feature.title" cols="12" sm="6" lg="4">
            <VCard height="100%" class="pa-6" variant="outlined" hover>
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

    <VDivider />

    <!-- Features Style 2: Alternating Layout -->
    <section class="py-16 bg-grey-lighten-5">
      <VContainer>
        <VRow
          v-for="(feature, index) in alternatingFeatures"
          :key="feature.title"
          align="center"
          class="mb-12"
        >
          <VCol cols="12" md="6" :order-md="index % 2 ? 2 : 1">
            <VChip :color="feature.color" variant="tonal" class="mb-4">{{ feature.badge }}</VChip>
            <h3 class="text-h4 font-weight-bold mb-4">{{ feature.title }}</h3>
            <p class="text-body-1 text-medium-emphasis mb-6">{{ feature.description }}</p>
            <VList density="compact" class="bg-transparent">
              <VListItem v-for="point in feature.points" :key="point" class="px-0">
                <template #prepend>
                  <VIcon :color="feature.color" size="small" class="mr-2">{{ Icons.CheckCircle }}</VIcon>
                </template>
                <VListItemTitle class="text-body-2">{{ point }}</VListItemTitle>
              </VListItem>
            </VList>
            <VBtn :color="feature.color" class="mt-4">
              Learn More
              <VIcon end>{{ Icons.ArrowRight }}</VIcon>
            </VBtn>
          </VCol>
          <VCol cols="12" md="6" :order-md="index % 2 ? 1 : 2">
            <VCard class="pa-8 text-center" :color="feature.color" variant="tonal">
              <VIcon :color="feature.color" size="200">{{ feature.icon }}</VIcon>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Features Style 3: Icon List -->
    <section class="py-16">
      <VContainer>
        <VRow>
          <VCol cols="12" md="5">
            <VChip color="secondary" variant="tonal" class="mb-4">Why Choose Us</VChip>
            <h2 class="text-h3 font-weight-bold mb-4">Built for Modern Teams</h2>
            <p class="text-body-1 text-medium-emphasis">
              We've crafted every feature with your productivity in mind. Here's what makes us different.
            </p>
          </VCol>
          <VCol cols="12" md="7">
            <VRow>
              <VCol v-for="feature in compactFeatures" :key="feature.title" cols="12" sm="6">
                <div class="d-flex mb-6">
                  <VAvatar color="primary" size="48" rounded="lg" class="mr-4">
                    <VIcon color="white">{{ feature.icon }}</VIcon>
                  </VAvatar>
                  <div>
                    <h4 class="text-subtitle-1 font-weight-bold mb-1">{{ feature.title }}</h4>
                    <p class="text-body-2 text-medium-emphasis mb-0">{{ feature.description }}</p>
                  </div>
                </div>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Features Style 4: Stats + Features -->
    <section class="py-16" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
      <VContainer>
        <VRow class="mb-12">
          <VCol v-for="stat in stats" :key="stat.label" cols="6" md="3" class="text-center">
            <h2 class="text-h2 font-weight-bold text-primary mb-2">{{ stat.value }}</h2>
            <p class="text-body-1 text-grey-lighten-1">{{ stat.label }}</p>
          </VCol>
        </VRow>

        <VRow>
          <VCol v-for="feature in darkFeatures" :key="feature.title" cols="12" sm="6" md="3">
            <VCard color="rgba(255,255,255,0.05)" class="pa-6 text-center" height="100%">
              <VIcon color="primary" size="48" class="mb-4">{{ feature.icon }}</VIcon>
              <h4 class="text-subtitle-1 font-weight-bold text-white mb-2">{{ feature.title }}</h4>
              <p class="text-body-2 text-grey-lighten-1 mb-0">{{ feature.description }}</p>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'

const gridFeatures = [
  { title: 'Lightning Fast', description: 'Optimized for speed with sub-second response times and instant updates.', icon: Icons.Bolt, color: 'warning' },
  { title: 'Secure by Default', description: 'Enterprise-grade security with end-to-end encryption and compliance.', icon: Icons.ShieldCheck, color: 'success' },
  { title: 'Easy Integration', description: 'Connect with 100+ tools and services you already use every day.', icon: Icons.Puzzle, color: 'primary' },
  { title: 'Real-time Sync', description: 'Stay in sync across all devices with instant updates and notifications.', icon: Icons.Sync, color: 'info' },
  { title: 'Smart Analytics', description: 'Get actionable insights with powerful analytics and custom reports.', icon: Icons.ChartLine, color: 'secondary' },
  { title: '24/7 Support', description: 'Our team is here to help you succeed, any time of day or night.', icon: Icons.Headphones, color: 'error' },
]

const alternatingFeatures = [
  {
    title: 'Powerful Automation',
    description: 'Automate repetitive tasks and focus on what matters most. Set up workflows in minutes.',
    badge: 'Automation',
    icon: Icons.Robot,
    color: 'primary',
    points: ['Custom workflow builder', 'Trigger-based actions', 'Third-party integrations'],
  },
  {
    title: 'Team Collaboration',
    description: 'Work together seamlessly with real-time collaboration tools and smart notifications.',
    badge: 'Collaboration',
    icon: Icons.AccountGroup,
    color: 'success',
    points: ['Real-time editing', 'Comments and mentions', 'Role-based permissions'],
  },
]

const compactFeatures = [
  { title: 'Cloud Storage', description: 'Unlimited storage for all your files', icon: Icons.Cloud },
  { title: 'Version Control', description: 'Track changes and restore anytime', icon: Icons.History },
  { title: 'Mobile Ready', description: 'Full functionality on any device', icon: Icons.Cellphone },
  { title: 'API Access', description: 'Build custom integrations easily', icon: Icons.Api },
]

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Integrations' },
  { value: '24/7', label: 'Support' },
]

const darkFeatures = [
  { title: 'Fast Deployment', description: 'Deploy in seconds with one click', icon: Icons.RocketLaunch },
  { title: 'Auto Scaling', description: 'Handle any traffic automatically', icon: Icons.ChartAreaspline },
  { title: 'Global CDN', description: 'Fast loading worldwide', icon: Icons.Earth },
  { title: 'Zero Downtime', description: 'Updates without interruption', icon: Icons.ClockCheck },
]
</script>
