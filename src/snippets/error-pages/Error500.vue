<!--
  Snippet: Error 500 Page
  Description: Server error page
  Components: VContainer, VBtn, VIcon, VAlert
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center" class="text-center">
      <v-col cols="12" md="8" lg="6">
        <v-icon size="120" color="error" class="mb-6">mdi-server-off</v-icon>

        <h1 class="text-h2 font-weight-bold mb-4">500</h1>
        <h2 class="text-h4 font-weight-bold mb-4">Internal Server Error</h2>

        <p class="text-body-1 text-medium-emphasis mb-6">
          Oops! Something went wrong on our end. Our team has been notified and is working to fix the issue.
        </p>

        <v-alert type="info" variant="tonal" class="mb-8 text-left">
          <v-alert-title>What you can do:</v-alert-title>
          <ul class="mt-2">
            <li>Refresh the page and try again</li>
            <li>Clear your browser cache</li>
            <li>Come back in a few minutes</li>
            <li>Contact support if the problem persists</li>
          </ul>
        </v-alert>

        <div class="d-flex justify-center ga-4 flex-wrap">
          <v-btn color="primary" size="large" prepend-icon="mdi-refresh" @click="refresh">
            Try Again
          </v-btn>
          <v-btn variant="outlined" size="large" prepend-icon="mdi-home" @click="goHome">
            Go Home
          </v-btn>
          <v-btn variant="outlined" size="large" prepend-icon="mdi-headset" @click="contactSupport">
            Contact Support
          </v-btn>
        </div>

        <v-divider class="my-12" />

        <!-- Error Details (for developers) -->
        <v-expansion-panels variant="accordion">
          <v-expansion-panel title="Technical Details (for developers)">
            <v-expansion-panel-text>
              <v-card variant="tonal" color="grey">
                <v-card-text class="text-left">
                  <pre class="text-caption">
Error Code: 500
Request ID: abc123def456
Timestamp: {{ new Date().toISOString() }}
Server: web-server-01
                  </pre>
                </v-card-text>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const refresh = () => {
  window.location.reload()
}

const goHome = () => {
  console.log('Navigate to home')
}

const contactSupport = () => {
  console.log('Open support')
}
</script>
