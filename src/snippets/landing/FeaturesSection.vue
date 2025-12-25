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
      <v-container>
        <div class="text-center mb-12">
          <v-chip color="primary" variant="tonal" class="mb-4">Features</v-chip>
          <h2 class="text-h3 font-weight-bold mb-4">Everything You Need</h2>
          <p class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 600px;">
            Powerful features to help you manage and grow your business effectively.
          </p>
        </div>

        <v-row>
          <v-col v-for="feature in gridFeatures" :key="feature.title" cols="12" sm="6" lg="4">
            <v-card height="100%" class="pa-6" variant="outlined" hover>
              <v-avatar :color="feature.color" size="56" rounded="lg" class="mb-4">
                <v-icon color="white" size="28">{{ feature.icon }}</v-icon>
              </v-avatar>
              <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
              <p class="text-body-2 text-medium-emphasis mb-0">{{ feature.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-divider />

    <!-- Features Style 2: Alternating Layout -->
    <section class="py-16 bg-grey-lighten-5">
      <v-container>
        <v-row
          v-for="(feature, index) in alternatingFeatures"
          :key="feature.title"
          align="center"
          class="mb-12"
        >
          <v-col cols="12" md="6" :order-md="index % 2 ? 2 : 1">
            <v-chip :color="feature.color" variant="tonal" class="mb-4">{{ feature.badge }}</v-chip>
            <h3 class="text-h4 font-weight-bold mb-4">{{ feature.title }}</h3>
            <p class="text-body-1 text-medium-emphasis mb-6">{{ feature.description }}</p>
            <v-list density="compact" class="bg-transparent">
              <v-list-item v-for="point in feature.points" :key="point" class="px-0">
                <template #prepend>
                  <v-icon :color="feature.color" size="small" class="mr-2">mdi-check-circle</v-icon>
                </template>
                <v-list-item-title class="text-body-2">{{ point }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-btn :color="feature.color" class="mt-4">
              Learn More
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6" :order-md="index % 2 ? 1 : 2">
            <v-card class="pa-8 text-center" :color="feature.color" variant="tonal">
              <v-icon :color="feature.color" size="200">{{ feature.icon }}</v-icon>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-divider />

    <!-- Features Style 3: Icon List -->
    <section class="py-16">
      <v-container>
        <v-row>
          <v-col cols="12" md="5">
            <v-chip color="secondary" variant="tonal" class="mb-4">Why Choose Us</v-chip>
            <h2 class="text-h3 font-weight-bold mb-4">Built for Modern Teams</h2>
            <p class="text-body-1 text-medium-emphasis">
              We've crafted every feature with your productivity in mind. Here's what makes us different.
            </p>
          </v-col>
          <v-col cols="12" md="7">
            <v-row>
              <v-col v-for="feature in compactFeatures" :key="feature.title" cols="12" sm="6">
                <div class="d-flex mb-6">
                  <v-avatar color="primary" size="48" rounded="lg" class="mr-4">
                    <v-icon color="white">{{ feature.icon }}</v-icon>
                  </v-avatar>
                  <div>
                    <h4 class="text-subtitle-1 font-weight-bold mb-1">{{ feature.title }}</h4>
                    <p class="text-body-2 text-medium-emphasis mb-0">{{ feature.description }}</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-divider />

    <!-- Features Style 4: Stats + Features -->
    <section class="py-16" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);">
      <v-container>
        <v-row class="mb-12">
          <v-col v-for="stat in stats" :key="stat.label" cols="6" md="3" class="text-center">
            <h2 class="text-h2 font-weight-bold text-primary mb-2">{{ stat.value }}</h2>
            <p class="text-body-1 text-grey-lighten-1">{{ stat.label }}</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="feature in darkFeatures" :key="feature.title" cols="12" sm="6" md="3">
            <v-card color="rgba(255,255,255,0.05)" class="pa-6 text-center" height="100%">
              <v-icon color="primary" size="48" class="mb-4">{{ feature.icon }}</v-icon>
              <h4 class="text-subtitle-1 font-weight-bold text-white mb-2">{{ feature.title }}</h4>
              <p class="text-body-2 text-grey-lighten-1 mb-0">{{ feature.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
const gridFeatures = [
  { title: 'Lightning Fast', description: 'Optimized for speed with sub-second response times and instant updates.', icon: 'mdi-lightning-bolt', color: 'warning' },
  { title: 'Secure by Default', description: 'Enterprise-grade security with end-to-end encryption and compliance.', icon: 'mdi-shield-check', color: 'success' },
  { title: 'Easy Integration', description: 'Connect with 100+ tools and services you already use every day.', icon: 'mdi-puzzle', color: 'primary' },
  { title: 'Real-time Sync', description: 'Stay in sync across all devices with instant updates and notifications.', icon: 'mdi-sync', color: 'info' },
  { title: 'Smart Analytics', description: 'Get actionable insights with powerful analytics and custom reports.', icon: 'mdi-chart-line', color: 'secondary' },
  { title: '24/7 Support', description: 'Our team is here to help you succeed, any time of day or night.', icon: 'mdi-headset', color: 'error' },
]

const alternatingFeatures = [
  {
    title: 'Powerful Automation',
    description: 'Automate repetitive tasks and focus on what matters most. Set up workflows in minutes.',
    badge: 'Automation',
    icon: 'mdi-robot',
    color: 'primary',
    points: ['Custom workflow builder', 'Trigger-based actions', 'Third-party integrations'],
  },
  {
    title: 'Team Collaboration',
    description: 'Work together seamlessly with real-time collaboration tools and smart notifications.',
    badge: 'Collaboration',
    icon: 'mdi-account-group',
    color: 'success',
    points: ['Real-time editing', 'Comments and mentions', 'Role-based permissions'],
  },
]

const compactFeatures = [
  { title: 'Cloud Storage', description: 'Unlimited storage for all your files', icon: 'mdi-cloud' },
  { title: 'Version Control', description: 'Track changes and restore anytime', icon: 'mdi-history' },
  { title: 'Mobile Ready', description: 'Full functionality on any device', icon: 'mdi-cellphone' },
  { title: 'API Access', description: 'Build custom integrations easily', icon: 'mdi-api' },
]

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Integrations' },
  { value: '24/7', label: 'Support' },
]

const darkFeatures = [
  { title: 'Fast Deployment', description: 'Deploy in seconds with one click', icon: 'mdi-rocket-launch' },
  { title: 'Auto Scaling', description: 'Handle any traffic automatically', icon: 'mdi-chart-areaspline' },
  { title: 'Global CDN', description: 'Fast loading worldwide', icon: 'mdi-earth' },
  { title: 'Zero Downtime', description: 'Updates without interruption', icon: 'mdi-clock-check' },
]
</script>
