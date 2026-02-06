<!--
  Snippet: Hero Section
  Description: Eye-catching hero section with headline, CTA buttons, and image
  Components: VContainer, VRow, VCol, VBtn, VImg
  Variants: Multiple hero styles included
-->
<template>
  <div>
    <!-- Hero Style 1: Centered Text with Image Below -->
    <section class="hero-centered py-16">
      <VContainer>
        <VRow justify="center" class="text-center">
          <VCol cols="12" md="10" lg="8">
            <VChip color="primary" variant="tonal" class="mb-4">
              <VIcon start size="small">mdi-star</VIcon>
              New Release
            </VChip>
            <h1 class="text-h2 text-md-h1 font-weight-bold mb-4">
              Build Amazing Products <span class="text-primary">Faster Than Ever</span>
            </h1>
            <p class="text-h6 text-medium-emphasis mb-8 mx-auto" style="max-width: 600px;">
              The all-in-one platform that helps teams design, build, and ship products 10x faster. Start free, scale when you need.
            </p>
            <div class="d-flex flex-wrap justify-center ga-4">
              <VBtn color="primary" size="x-large" rounded="pill">
                Get Started Free
                <VIcon end>mdi-arrow-right</VIcon>
              </VBtn>
              <VBtn variant="outlined" size="x-large" rounded="pill">
                <VIcon start>mdi-play-circle</VIcon>
                Watch Demo
              </VBtn>
            </div>
            <p class="text-body-2 text-medium-emphasis mt-4">
              <VIcon size="small" color="success">mdi-check-circle</VIcon>
              No credit card required
              <span class="mx-2">•</span>
              <VIcon size="small" color="success">mdi-check-circle</VIcon>
              14-day free trial
            </p>
          </VCol>
        </VRow>
        <VRow justify="center" class="mt-8">
          <VCol cols="12" lg="10">
            <VCard class="elevation-12 rounded-xl overflow-hidden">
              <VImg
                src="https://picsum.photos/seed/hero/1200/600"
                aspect-ratio="2"
                cover
                class="bg-grey-lighten-3"
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <VProgressCircular indeterminate color="primary" />
                  </div>
                </template>
              </VImg>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-16" />

    <!-- Hero Style 2: Split Layout with Image -->
    <section class="hero-split py-16">
      <VContainer>
        <VRow align="center">
          <VCol cols="12" md="6">
            <VChip color="secondary" variant="tonal" class="mb-4">
              <VIcon start size="small">mdi-rocket-launch</VIcon>
              Launch Your Startup
            </VChip>
            <h1 class="text-h3 text-md-h2 font-weight-bold mb-4">
              Turn Your Ideas Into Reality
            </h1>
            <p class="text-body-1 text-medium-emphasis mb-6">
              From concept to launch, we provide everything you need to build and scale your business. Join 10,000+ entrepreneurs who trust our platform.
            </p>

            <VList density="compact" class="bg-transparent mb-6">
              <VListItem
                v-for="feature in heroFeatures"
                :key="feature"
                class="px-0"
              >
                <template #prepend>
                  <VIcon color="success" size="small" class="mr-2">mdi-check-circle</VIcon>
                </template>
                <VListItemTitle>{{ feature }}</VListItemTitle>
              </VListItem>
            </VList>

            <div class="d-flex flex-wrap ga-3">
              <VBtn color="primary" size="large">
                Start Building
              </VBtn>
              <VBtn variant="text" size="large" color="primary">
                Learn More
                <VIcon end>mdi-arrow-right</VIcon>
              </VBtn>
            </div>
          </VCol>
          <VCol cols="12" md="6">
            <VImg
              src="https://picsum.photos/seed/split/600/500"
              class="rounded-xl elevation-8"
              cover
            />
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-16" />

    <!-- Hero Style 3: Gradient Background -->
    <section class="hero-gradient py-16" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);">
      <VContainer>
        <VRow align="center" justify="center" class="text-center">
          <VCol cols="12" md="10" lg="8">
            <div class="d-flex justify-center mb-6">
              <VAvatarGroup>
                <VAvatar v-for="n in 5" :key="n" size="40" class="border-2 border-white">
                  <VImg :src="`https://randomuser.me/api/portraits/${n % 2 ? 'men' : 'women'}/${n}.jpg`" />
                </VAvatar>
              </VAvatarGroup>
              <VChip class="ml-3" color="success" variant="flat">
                <VIcon start size="small">mdi-star</VIcon>
                4.9/5 from 2,000+ reviews
              </VChip>
            </div>

            <h1 class="text-h2 text-md-h1 font-weight-bold mb-4">
              The Future of
              <span class="text-gradient">Collaboration</span>
            </h1>
            <p class="text-h6 text-medium-emphasis mb-8">
              Empower your team with the tools they need to communicate, collaborate, and create together.
            </p>

            <VTextField
              placeholder="Enter your email"
              variant="solo"
              rounded="pill"
              density="comfortable"
              class="mx-auto mb-4"
              style="max-width: 450px;"
              hide-details
            >
              <template #append-inner>
                <VBtn color="primary" rounded="pill" size="small">
                  Get Early Access
                </VBtn>
              </template>
            </VTextField>
            <p class="text-caption text-medium-emphasis">
              Join 5,000+ users on the waitlist. We respect your privacy.
            </p>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const heroFeatures = [
  'Unlimited projects and collaborators',
  'Real-time sync across all devices',
  'Advanced analytics and reporting',
  '24/7 priority support',
]
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #6366F1 0%, #EC4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
