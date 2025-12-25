<!--
  Snippet: Maintenance Page
  Description: Under maintenance page with countdown
  Components: VContainer, VBtn, VIcon, VProgressLinear, VTextField
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" class="text-center">
      <v-col cols="12" md="8" lg="6">
        <v-icon size="120" color="warning" class="mb-6">mdi-wrench</v-icon>

        <h1 class="text-h3 font-weight-bold mb-4">We're Under Maintenance</h1>

        <p class="text-body-1 text-medium-emphasis mb-8">
          We're currently making some improvements to give you a better experience.
          We'll be back shortly!
        </p>

        <!-- Countdown Timer -->
        <v-card variant="tonal" color="primary" class="mb-8 pa-6">
          <p class="text-body-2 text-medium-emphasis mb-4">Estimated time remaining:</p>
          <v-row>
            <v-col v-for="unit in timeUnits" :key="unit.label" cols="3">
              <div class="text-h3 font-weight-bold">{{ unit.value }}</div>
              <div class="text-caption text-medium-emphasis">{{ unit.label }}</div>
            </v-col>
          </v-row>
        </v-card>

        <!-- Progress -->
        <div class="mb-8">
          <div class="d-flex justify-space-between mb-2">
            <span class="text-body-2">Maintenance Progress</span>
            <span class="text-body-2 font-weight-medium">{{ progress }}%</span>
          </div>
          <v-progress-linear
            :model-value="progress"
            color="primary"
            rounded
            height="8"
          />
        </div>

        <!-- Subscribe for updates -->
        <v-card class="pa-6 mb-8">
          <h3 class="text-h6 mb-2">Get Notified</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">
            Subscribe to get notified when we're back online.
          </p>
          <v-text-field
            v-model="email"
            variant="outlined"
            placeholder="Enter your email"
            prepend-inner-icon="mdi-email"
            hide-details
            class="mb-4"
          >
            <template #append-inner>
              <v-btn color="primary" variant="flat" size="small" @click="subscribe">
                Notify Me
              </v-btn>
            </template>
          </v-text-field>
        </v-card>

        <!-- Social Links -->
        <p class="text-body-2 text-medium-emphasis mb-4">
          Follow us for updates:
        </p>
        <div class="d-flex justify-center ga-2">
          <v-btn icon color="primary" variant="tonal">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon color="primary" variant="tonal">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon color="primary" variant="tonal">
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
          <v-btn icon color="primary" variant="tonal">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const email = ref('')
const progress = ref(68)

const timeUnits = ref([
  { label: 'Hours', value: '02' },
  { label: 'Minutes', value: '34' },
  { label: 'Seconds', value: '56' },
  { label: '', value: '' },
])

let countdownInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  let totalSeconds = 2 * 3600 + 34 * 60 + 56

  countdownInterval = setInterval(() => {
    totalSeconds--

    if (totalSeconds <= 0) {
      clearInterval(countdownInterval!)
      return
    }

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    timeUnits.value = [
      { label: 'Hours', value: hours.toString().padStart(2, '0') },
      { label: 'Minutes', value: minutes.toString().padStart(2, '0') },
      { label: 'Seconds', value: seconds.toString().padStart(2, '0') },
      { label: '', value: '' },
    ]
  }, 1000)
})

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
})

const subscribe = () => {
  console.log('Subscribe:', email.value)
  email.value = ''
}
</script>
