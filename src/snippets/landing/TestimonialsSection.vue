<!--
  Snippet: Testimonials Section
  Description: Customer testimonials and reviews showcase
  Components: SectionHeader, TestimonialCard, StatCard, AvatarWithInfo
  Variants: Grid layout, Carousel, Featured testimonial
-->
<template>
  <div>
    <!-- Testimonials Style 1: Grid Layout -->
    <section class="py-16 bg-grey-lighten-5">
      <VContainer>
        <SectionHeader
          title="Loved by Thousands"
          subtitle="Don't just take our word for it. Here's what our customers have to say."
          chip="Testimonials"
          title-class="text-h3"
        />

        <VRow>
          <VCol v-for="testimonial in testimonials" :key="testimonial.name" cols="12" md="6" lg="4">
            <TestimonialCard
              :name="testimonial.name"
              :role="testimonial.role"
              :company="testimonial.company"
              :avatar="testimonial.avatar"
              :text="testimonial.text"
              :rating="testimonial.rating"
            />
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Testimonials Style 2: Featured Quote -->
    <section class="py-16">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" md="10" lg="8">
            <TestimonialCard
              name="Sarah Johnson"
              role="CEO"
              company="TechStartup Inc."
              avatar="https://randomuser.me/api/portraits/women/44.jpg"
              text="This platform has completely transformed how our team works. We've increased productivity by 40% and reduced our meeting time by half. It's an absolute game-changer."
              :rating="5"
              centered
              card-variant="tonal"
              card-color="primary"
              content-class="pa-8 pa-md-12"
              text-class="text-h5 text-md-h4 font-weight-medium"
              :show-quote-icon="true"
              rating-position="bottom"
              rating-density="comfortable"
              :avatar-size="64"
              avatar-class="mb-4"
            />
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Testimonials Style 3: Carousel -->
    <section class="py-16 bg-grey-darken-4">
      <VContainer>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold text-white mb-4">What Our Users Say</h2>
          <p class="text-body-1 text-grey-lighten-1">Trusted by teams at leading companies</p>
        </div>

        <VCarousel
          hide-delimiters
          show-arrows="hover"
          height="auto"
          class="rounded-lg"
        >
          <VCarouselItem v-for="(group, index) in carouselGroups" :key="index">
            <VRow class="pa-4">
              <VCol v-for="item in group" :key="item.name" cols="12" md="4">
                <VCard height="100%" class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <AvatarWithInfo
                      :name="item.name"
                      :avatar="item.avatar"
                      :subtitle="item.role"
                    />
                    <VSpacer />
                    <VIcon color="primary" size="32">{{ Icons.Twitter }}</VIcon>
                  </div>
                  <p class="text-body-2 mb-0">{{ item.text }}</p>
                </VCard>
              </VCol>
            </VRow>
          </VCarouselItem>
        </VCarousel>

        <!-- Company Logos -->
        <div class="text-center mt-12">
          <p class="text-grey-lighten-1 mb-6">Trusted by teams at</p>
          <VRow justify="center" align="center" class="ga-8">
            <VCol v-for="company in companies" :key="company" cols="auto">
              <VChip variant="text" size="large" class="text-grey-lighten-1">
                <VIcon start>{{ Icons.Domain }}</VIcon>
                {{ company }}
              </VChip>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </section>

    <VDivider />

    <!-- Testimonials Style 4: Stats + Reviews -->
    <section class="py-16">
      <VContainer>
        <VRow align="center">
          <VCol cols="12" md="4">
            <div class="text-center text-md-left mb-8 mb-md-0">
              <h2 class="text-h3 font-weight-bold mb-4">Trusted Worldwide</h2>
              <p class="text-body-1 text-medium-emphasis mb-6">
                Join thousands of satisfied customers who've transformed their workflow.
              </p>
              <VRow>
                <VCol cols="6">
                  <StatCard
                    value="4.9"
                    :centered="false"
                    value-class="text-h3 text-primary"
                    content-class="pa-0"
                  >
                    <template #label>
                      <VRating :model-value="4.9" color="warning" readonly half-increments density="compact" />
                      <p class="text-caption text-medium-emphasis mt-1 mb-0">2,847 reviews</p>
                    </template>
                  </StatCard>
                </VCol>
                <VCol cols="6">
                  <StatCard
                    value="98%"
                    label="Customer satisfaction"
                    :centered="false"
                    value-class="text-h3 text-primary"
                    label-class="text-body-2"
                    content-class="pa-0"
                  >
                    <p class="text-caption text-medium-emphasis mb-0">Based on surveys</p>
                  </StatCard>
                </VCol>
              </VRow>
            </div>
          </VCol>
          <VCol cols="12" md="8">
            <VRow>
              <VCol v-for="review in shortReviews" :key="review.name" cols="12" sm="6">
                <TestimonialCard
                  :name="review.name"
                  :avatar="review.avatar"
                  :text="review.text"
                  :rating="review.rating"
                  role=""
                  card-variant="outlined"
                  content-class="pa-4"
                  :avatar-size="40"
                  name-class="text-body-2 font-weight-medium"
                  text-class="text-body-2 text-medium-emphasis"
                  rating-size="small"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icons } from '@/shared/model'
import { SectionHeader, TestimonialCard, StatCard, AvatarWithInfo } from '@/shared/ui/snippets'
import type { ITestimonial } from '@/shared/ui/snippets'

const testimonials: ITestimonial[] = [
  {
    name: 'John Smith',
    role: 'Product Manager',
    company: 'Acme Inc',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: "This tool has revolutionized our workflow. We've cut our project delivery time in half and our team loves using it every day.",
  },
  {
    name: 'Emily Chen',
    role: 'Tech Lead',
    company: 'StartupXYZ',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'The best investment we made this year. The integrations are seamless and the support team is incredibly responsive.',
  },
  {
    name: 'Michael Brown',
    role: 'Founder',
    company: 'DesignCo',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
    text: "Finally, a tool that just works. No complex setup, no learning curve. My team was productive from day one.",
  },
  {
    name: 'Lisa Anderson',
    role: 'Marketing Director',
    company: 'GrowthHub',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    rating: 4,
    text: "We've tried many tools, but this one stands out. The analytics alone have helped us make better decisions.",
  },
  {
    name: 'David Wilson',
    role: 'CTO',
    company: 'TechVentures',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 5,
    text: 'Security and reliability are top priorities for us. This platform exceeds our expectations on both fronts.',
  },
  {
    name: 'Anna Martinez',
    role: 'Operations Manager',
    company: 'GlobalCorp',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
    text: 'The automation features have saved us countless hours. Our team can now focus on what really matters.',
  },
]

interface ICarouselTestimonial {
  name: string
  role: string
  avatar: string
  text: string
}

const carouselTestimonials: ICarouselTestimonial[] = [
  { name: 'Alex Turner', role: '@alexturner', avatar: 'https://randomuser.me/api/portraits/men/51.jpg', text: 'Just switched to this platform and wow, what a difference! The UI is so intuitive.' },
  { name: 'Sophie Williams', role: '@sophiew', avatar: 'https://randomuser.me/api/portraits/women/52.jpg', text: 'Our team productivity has gone through the roof since we started using this. Highly recommend!' },
  { name: 'James Lee', role: '@jameslee', avatar: 'https://randomuser.me/api/portraits/men/53.jpg', text: 'The customer support is amazing. Got a response within minutes.' },
  { name: 'Emma Davis', role: '@emmad', avatar: 'https://randomuser.me/api/portraits/women/54.jpg', text: "Best tool I've used in years. Simple, powerful, and affordable. What more could you ask for?" },
  { name: 'Chris Martin', role: '@chrism', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', text: 'Finally found a solution that scales with our needs. Enterprise features without the enterprise price.' },
  { name: 'Olivia Brown', role: '@oliviab', avatar: 'https://randomuser.me/api/portraits/women/56.jpg', text: "The integrations are seamless. Connected all our tools in under an hour. That's impressive!" },
]

const carouselGroups = computed(() => {
  const groups: ICarouselTestimonial[][] = []
  for (let i = 0; i < carouselTestimonials.length; i += 3) {
    groups.push(carouselTestimonials.slice(i, i + 3))
  }
  return groups
})

const companies = ['Google', 'Microsoft', 'Airbnb', 'Spotify', 'Slack']

interface IShortReview {
  name: string
  avatar: string
  rating: number
  text: string
}

const shortReviews: IShortReview[] = [
  { name: 'Robert Kim', avatar: 'https://randomuser.me/api/portraits/men/61.jpg', rating: 5, text: 'Absolutely love it! Game changer for our team.' },
  { name: 'Jennifer Lopez', avatar: 'https://randomuser.me/api/portraits/women/62.jpg', rating: 5, text: 'Simple, powerful, and reliable. Perfect combo.' },
  { name: 'Tom Harris', avatar: 'https://randomuser.me/api/portraits/men/63.jpg', rating: 5, text: 'Best investment for our startup. Period.' },
  { name: 'Rachel Green', avatar: 'https://randomuser.me/api/portraits/women/64.jpg', rating: 4, text: 'Great features and amazing customer support.' },
]
</script>
