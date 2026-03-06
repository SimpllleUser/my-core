<!--
  Snippet: Banners & FAQ
  Description: Announcement banners, CTA sections, newsletter, and FAQ items
  Components: AnnouncementBanner, CtaBanner, NewsletterCard, FaqItem
  Variants: Various banner types, inline FAQ
-->
<script setup lang="ts">
import { Icons } from '../../shared/model'
import { AnnouncementBanner, CtaBanner, NewsletterCard, FaqItem } from '../../shared/ui/snippets'

const faqs = [
  { question: 'What is Vuetify?', answer: 'Vuetify is a Vue UI Library with beautifully handcrafted Material Design Components. No design skills required — everything you need to create amazing applications is at your fingertips.' },
  { question: 'Is it free to use?', answer: 'Yes! Vuetify is open source and completely free to use under the MIT license. You can use it in personal and commercial projects without any cost.' },
  { question: 'Does it support dark mode?', answer: 'Absolutely. Vuetify has built-in dark and light theme support. You can toggle between themes programmatically or let the system preference decide.' },
  { question: 'How do I get started?', answer: 'Install Vuetify via npm or yarn, add it to your Vue app, and start using components. Check the official docs at vuetifyjs.com for detailed guides.' },
]
</script>
<template>
  <VContainer>
    <!-- Announcement Banners -->
    <VRow class="mb-6">
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Announcement Banners</h3>
        <div class="d-flex flex-column gap-3">
          <AnnouncementBanner
            chip-text="New"
            text="Version 3.0 is here! Check out all the exciting new features."
            link-text="Read the changelog"
            color="primary"
            variant="tonal"
          />
          <AnnouncementBanner
            :icon="Icons.Sale"
            text="Limited offer: Get 40% off your first year. Use code LAUNCH40."
            link-text="Claim offer"
            color="success"
            variant="tonal"
            :dismissible="false"
          />
          <AnnouncementBanner
            :icon="Icons.Alert"
            text="Scheduled maintenance on Sunday 2–4 AM UTC. Services may be briefly unavailable."
            color="warning"
            variant="tonal"
          />
        </div>
      </VCol>
    </VRow>

    <!-- CTA Banners -->
    <VRow class="mb-6">
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">CTA Banners</h3>
      </VCol>
      <VCol cols="12" md="6">
        <CtaBanner
          title="Start building today"
          subtitle="Join 50,000+ developers shipping products with Vuetify."
          :ctas="[
            { text: 'Get started free', color: 'primary', variant: 'elevated' },
            { text: 'View docs', color: 'primary', variant: 'text' }
          ]"
          card-variant="outlined"
        />
      </VCol>
      <VCol cols="12" md="6">
        <CtaBanner
          title="Ready to upgrade?"
          chip="Pro"
          chip-color="warning"
          :ctas="[{ text: 'Upgrade now', color: 'warning', variant: 'elevated' }]"
          gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          card-class="text-white"
          :centered="true"
        />
      </VCol>
      <VCol cols="12">
        <CtaBanner
          title="Download our app"
          subtitle="Get the full experience on mobile. Available on iOS and Android."
          :ctas="[
            { text: 'App Store', color: 'surface', variant: 'elevated', icon: Icons.Apple, iconPosition: 'start' },
            { text: 'Google Play', color: 'surface', variant: 'elevated', icon: Icons.Google, iconPosition: 'start' }
          ]"
          :inline="true"
          :centered="false"
          card-variant="outlined"
        />
      </VCol>
    </VRow>

    <!-- Newsletter Cards -->
    <VRow class="mb-6">
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Newsletter Subscription</h3>
      </VCol>
      <VCol cols="12" md="5">
        <NewsletterCard
          title="Stay in the loop"
          subtitle="Weekly tips, updates and resources — directly to your inbox."
          privacy-text="No spam. Unsubscribe at any time."
          card-variant="outlined"
        />
      </VCol>
      <VCol cols="12" md="7">
        <NewsletterCard
          title="Get our newsletter"
          subtitle="Join 10,000+ readers."
          placeholder="your@email.com"
          button-text="Subscribe"
          :inline="false"
          :centered="false"
          card-variant="outlined"
          content-class="pa-6"
        />
      </VCol>
    </VRow>

    <!-- FAQ Items -->
    <VRow>
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">FAQ Items</h3>
        <div class="d-flex flex-column gap-2">
          <FaqItem
            v-for="(faq, i) in faqs"
            :key="i"
            :question="faq.question"
            :answer="faq.answer"
            card-variant="outlined"
            :show-divider="true"
          />
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>
