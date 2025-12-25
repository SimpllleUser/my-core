<!--
  Snippet: Testimonials Section
  Description: Customer testimonials and reviews showcase
  Components: VContainer, VRow, VCol, VCard, VAvatar, VRating, VCarousel
  Variants: Grid layout, Carousel, Featured testimonial
-->
<template>
  <div>
    <!-- Testimonials Style 1: Grid Layout -->
    <section class="py-16 bg-grey-lighten-5">
      <v-container>
        <div class="text-center mb-12">
          <v-chip color="primary" variant="tonal" class="mb-4">Testimonials</v-chip>
          <h2 class="text-h3 font-weight-bold mb-4">Loved by Thousands</h2>
          <p class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 600px;">
            Don't just take our word for it. Here's what our customers have to say.
          </p>
        </div>

        <v-row>
          <v-col v-for="testimonial in testimonials" :key="testimonial.name" cols="12" md="6" lg="4">
            <v-card height="100%" class="pa-6">
              <v-rating
                :model-value="testimonial.rating"
                color="warning"
                readonly
                density="compact"
                class="mb-4"
              />
              <p class="text-body-1 mb-6">"{{ testimonial.text }}"</p>
              <div class="d-flex align-center">
                <v-avatar size="48" class="mr-3">
                  <v-img :src="testimonial.avatar" />
                </v-avatar>
                <div>
                  <p class="font-weight-medium mb-0">{{ testimonial.name }}</p>
                  <p class="text-caption text-medium-emphasis mb-0">
                    {{ testimonial.role }} at {{ testimonial.company }}
                  </p>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-divider />

    <!-- Testimonials Style 2: Featured Quote -->
    <section class="py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-card class="pa-8 pa-md-12 text-center" variant="tonal" color="primary">
              <v-icon size="64" color="primary" class="mb-6">mdi-format-quote-open</v-icon>
              <p class="text-h5 text-md-h4 font-weight-medium mb-8">
                "This platform has completely transformed how our team works. We've increased productivity by 40% and reduced our meeting time by half. It's an absolute game-changer."
              </p>
              <v-avatar size="64" class="mb-4">
                <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
              </v-avatar>
              <p class="text-h6 font-weight-bold mb-1">Sarah Johnson</p>
              <p class="text-body-2 text-medium-emphasis mb-4">CEO, TechStartup Inc.</p>
              <v-rating
                :model-value="5"
                color="warning"
                readonly
                density="comfortable"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-divider />

    <!-- Testimonials Style 3: Carousel -->
    <section class="py-16 bg-grey-darken-4">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold text-white mb-4">What Our Users Say</h2>
          <p class="text-body-1 text-grey-lighten-1">Trusted by teams at leading companies</p>
        </div>

        <v-carousel
          hide-delimiters
          show-arrows="hover"
          height="auto"
          class="rounded-lg"
        >
          <v-carousel-item v-for="(group, index) in carouselGroups" :key="index">
            <v-row class="pa-4">
              <v-col v-for="item in group" :key="item.name" cols="12" md="4">
                <v-card height="100%" class="pa-6">
                  <div class="d-flex align-center mb-4">
                    <v-avatar size="48" class="mr-3">
                      <v-img :src="item.avatar" />
                    </v-avatar>
                    <div>
                      <p class="font-weight-medium mb-0">{{ item.name }}</p>
                      <p class="text-caption text-medium-emphasis mb-0">{{ item.role }}</p>
                    </div>
                    <v-spacer />
                    <v-icon color="primary" size="32">mdi-twitter</v-icon>
                  </div>
                  <p class="text-body-2 mb-0">{{ item.text }}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>

        <!-- Company Logos -->
        <div class="text-center mt-12">
          <p class="text-grey-lighten-1 mb-6">Trusted by teams at</p>
          <v-row justify="center" align="center" class="ga-8">
            <v-col v-for="company in companies" :key="company" cols="auto">
              <v-chip variant="text" size="large" class="text-grey-lighten-1">
                <v-icon start>mdi-domain</v-icon>
                {{ company }}
              </v-chip>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>

    <v-divider />

    <!-- Testimonials Style 4: Stats + Reviews -->
    <section class="py-16">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="4">
            <div class="text-center text-md-left mb-8 mb-md-0">
              <h2 class="text-h3 font-weight-bold mb-4">Trusted Worldwide</h2>
              <p class="text-body-1 text-medium-emphasis mb-6">
                Join thousands of satisfied customers who've transformed their workflow.
              </p>
              <v-row>
                <v-col cols="6">
                  <h3 class="text-h3 font-weight-bold text-primary">4.9</h3>
                  <v-rating :model-value="4.9" color="warning" readonly half-increments density="compact" />
                  <p class="text-caption text-medium-emphasis mt-1">2,847 reviews</p>
                </v-col>
                <v-col cols="6">
                  <h3 class="text-h3 font-weight-bold text-primary">98%</h3>
                  <p class="text-body-2">Customer satisfaction</p>
                  <p class="text-caption text-medium-emphasis">Based on surveys</p>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <v-row>
              <v-col v-for="review in shortReviews" :key="review.name" cols="12" sm="6">
                <v-card variant="outlined" class="pa-4">
                  <div class="d-flex align-center mb-3">
                    <v-avatar size="40" class="mr-3">
                      <v-img :src="review.avatar" />
                    </v-avatar>
                    <div>
                      <p class="text-body-2 font-weight-medium mb-0">{{ review.name }}</p>
                      <v-rating :model-value="review.rating" color="warning" readonly density="compact" size="small" />
                    </div>
                  </div>
                  <p class="text-body-2 text-medium-emphasis mb-0">"{{ review.text }}"</p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const testimonials = [
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

const carouselTestimonials = [
  { name: 'Alex Turner', role: '@alexturner', avatar: 'https://randomuser.me/api/portraits/men/51.jpg', text: 'Just switched to this platform and wow, what a difference! The UI is so intuitive. 🚀' },
  { name: 'Sophie Williams', role: '@sophiew', avatar: 'https://randomuser.me/api/portraits/women/52.jpg', text: 'Our team productivity has gone through the roof since we started using this. Highly recommend!' },
  { name: 'James Lee', role: '@jameslee', avatar: 'https://randomuser.me/api/portraits/men/53.jpg', text: 'The customer support is amazing. Got a response within minutes. 👏' },
  { name: 'Emma Davis', role: '@emmad', avatar: 'https://randomuser.me/api/portraits/women/54.jpg', text: "Best tool I've used in years. Simple, powerful, and affordable. What more could you ask for?" },
  { name: 'Chris Martin', role: '@chrism', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', text: 'Finally found a solution that scales with our needs. Enterprise features without the enterprise price.' },
  { name: 'Olivia Brown', role: '@oliviab', avatar: 'https://randomuser.me/api/portraits/women/56.jpg', text: "The integrations are seamless. Connected all our tools in under an hour. That's impressive!" },
]

const carouselGroups = computed(() => {
  const groups = []
  for (let i = 0; i < carouselTestimonials.length; i += 3) {
    groups.push(carouselTestimonials.slice(i, i + 3))
  }
  return groups
})

const companies = ['Google', 'Microsoft', 'Airbnb', 'Spotify', 'Slack']

const shortReviews = [
  { name: 'Robert Kim', avatar: 'https://randomuser.me/api/portraits/men/61.jpg', rating: 5, text: 'Absolutely love it! Game changer for our team.' },
  { name: 'Jennifer Lopez', avatar: 'https://randomuser.me/api/portraits/women/62.jpg', rating: 5, text: 'Simple, powerful, and reliable. Perfect combo.' },
  { name: 'Tom Harris', avatar: 'https://randomuser.me/api/portraits/men/63.jpg', rating: 5, text: 'Best investment for our startup. Period.' },
  { name: 'Rachel Green', avatar: 'https://randomuser.me/api/portraits/women/64.jpg', rating: 4, text: 'Great features and amazing customer support.' },
]
</script>
