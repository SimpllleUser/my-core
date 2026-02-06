<!--
  Snippet: Error 500 Page
  Description: Server error page
  Components: VContainer, VBtn, VIcon, VAlert
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer class="fill-height">
    <VRow align="center" justify="center" class="text-center">
      <VCol cols="12" md="8" lg="6">
        <VIcon size="120" color="error" class="mb-6">mdi-server-off</VIcon>

        <h1 class="text-h2 font-weight-bold mb-4">500</h1>
        <h2 class="text-h4 font-weight-bold mb-4">Internal Server Error</h2>

        <p class="text-body-1 text-medium-emphasis mb-6">
          Oops! Something went wrong on our end. Our team has been notified and is working to fix the issue.
        </p>

        <VAlert type="info" variant="tonal" class="mb-8 text-left">
          <VAlertTitle>What you can do:</VAlertTitle>
          <ul class="mt-2">
            <li>Refresh the page and try again</li>
            <li>Clear your browser cache</li>
            <li>Come back in a few minutes</li>
            <li>Contact support if the problem persists</li>
          </ul>
        </VAlert>

        <div class="d-flex justify-center ga-4 flex-wrap">
          <VBtn color="primary" size="large" prepend-icon="mdi-refresh" @click="refresh">
            Try Again
          </VBtn>
          <VBtn variant="outlined" size="large" prepend-icon="mdi-home" @click="goHome">
            Go Home
          </VBtn>
          <VBtn variant="outlined" size="large" prepend-icon="mdi-headset" @click="contactSupport">
            Contact Support
          </VBtn>
        </div>

        <VDivider class="my-12" />

        <!-- Error Details (for developers) -->
        <VExpansionPanels variant="accordion">
          <VExpansionPanel title="Technical Details (for developers)">
            <VExpansionPanelText>
              <VCard variant="tonal" color="grey">
                <VCardText class="text-left">
                  <pre class="text-caption">
Error Code: 500
Request ID: abc123def456
Timestamp: {{ new Date().toISOString() }}
Server: web-server-01
                  </pre>
                </VCardText>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VContainer>
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
