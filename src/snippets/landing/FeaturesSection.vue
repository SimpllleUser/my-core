<!--
  Snippet: Features Section
  Description: Product features showcase with icons and descriptions
  Components: SectionHeader, FeatureCard, StatCard
  Variants: Multiple layout styles included
-->
<template>
  <div>
    <!-- Features Style 1: Grid Layout -->
    <section class="py-16">
      <VContainer>
        <SectionHeader
          title="Everything You Need"
          subtitle="Powerful features to help you manage and grow your business effectively."
          chip="Features"
          title-class="text-h3"
        />

        <VRow>
          <VCol v-for="feature in gridFeatures" :key="feature.title" cols="12" sm="6" lg="4">
            <FeatureCard
              :title="feature.title"
              :description="feature.description"
              :icon="feature.icon"
              :icon-bg-color="feature.color"
            />
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
            <FeatureCard
              :title="feature.title"
              :description="feature.description"
              :badge="feature.badge"
              :badge-color="feature.color"
              :points="feature.points"
              :point-icon-color="feature.color"
              card-variant="flat"
              :hover="false"
              title-class="text-h4"
              description-class="text-body-1 text-medium-emphasis"
              content-class="pa-0"
            >
              <template #actions>
                <VBtn :color="feature.color" class="mt-4">
                  Learn More
                  <VIcon end>{{ Icons.ArrowRight }}</VIcon>
                </VBtn>
              </template>
            </FeatureCard>
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
            <SectionHeader
              title="Built for Modern Teams"
              subtitle="We've crafted every feature with your productivity in mind. Here's what makes us different."
              chip="Why Choose Us"
              chip-color="secondary"
              :centered="false"
            />
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
          <VCol v-for="stat in stats" :key="stat.label" cols="6" md="3">
            <StatCard
              :value="stat.value"
              :label="stat.label"
              value-class="text-h2 text-primary"
              label-class="text-body-1 text-grey-lighten-1"
              content-class="pa-0"
            />
          </VCol>
        </VRow>

        <VRow>
          <VCol v-for="feature in darkFeatures" :key="feature.title" cols="12" sm="6" md="3">
            <FeatureCard
              :title="feature.title"
              :description="feature.description"
              :icon="feature.icon"
              icon-color="primary"
              :icon-bg-color="undefined"
              icon-container-class="mb-4"
              :icon-container-size="48"
              card-color="rgba(255,255,255,0.05)"
              card-variant="flat"
              :hover="false"
              centered
              title-class="text-subtitle-1 text-white"
              description-class="text-body-2 text-grey-lighten-1"
            />
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'
import { SectionHeader, FeatureCard, StatCard } from '@/shared/ui/snippets'
import type { IFeature, IStat } from '@/shared/ui/snippets'

interface IGridFeature {
  title: string
  description: string
  icon: string
  color: string
}

const gridFeatures: IGridFeature[] = [
  { title: 'Lightning Fast', description: 'Optimized for speed with sub-second response times and instant updates.', icon: Icons.Bolt, color: 'warning' },
  { title: 'Secure by Default', description: 'Enterprise-grade security with end-to-end encryption and compliance.', icon: Icons.ShieldCheck, color: 'success' },
  { title: 'Easy Integration', description: 'Connect with 100+ tools and services you already use every day.', icon: Icons.Puzzle, color: 'primary' },
  { title: 'Real-time Sync', description: 'Stay in sync across all devices with instant updates and notifications.', icon: Icons.Sync, color: 'info' },
  { title: 'Smart Analytics', description: 'Get actionable insights with powerful analytics and custom reports.', icon: Icons.ChartLine, color: 'secondary' },
  { title: '24/7 Support', description: 'Our team is here to help you succeed, any time of day or night.', icon: Icons.Headphones, color: 'error' },
]

interface IAlternatingFeature extends IFeature {
  badge: string
}

const alternatingFeatures: IAlternatingFeature[] = [
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

const compactFeatures: IGridFeature[] = [
  { title: 'Cloud Storage', description: 'Unlimited storage for all your files', icon: Icons.Cloud, color: 'primary' },
  { title: 'Version Control', description: 'Track changes and restore anytime', icon: Icons.History, color: 'primary' },
  { title: 'Mobile Ready', description: 'Full functionality on any device', icon: Icons.Cellphone, color: 'primary' },
  { title: 'API Access', description: 'Build custom integrations easily', icon: Icons.Api, color: 'primary' },
]

const stats: IStat[] = [
  { value: '10K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Integrations' },
  { value: '24/7', label: 'Support' },
]

const darkFeatures: IGridFeature[] = [
  { title: 'Fast Deployment', description: 'Deploy in seconds with one click', icon: Icons.RocketLaunch, color: 'primary' },
  { title: 'Auto Scaling', description: 'Handle any traffic automatically', icon: Icons.ChartAreaspline, color: 'primary' },
  { title: 'Global CDN', description: 'Fast loading worldwide', icon: Icons.Earth, color: 'primary' },
  { title: 'Zero Downtime', description: 'Updates without interruption', icon: Icons.ClockCheck, color: 'primary' },
]
</script>
