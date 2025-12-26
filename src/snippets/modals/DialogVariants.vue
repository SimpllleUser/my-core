<!--
  Snippet: Dialog Variants
  Description: Various dialog and modal styles
  Components: VDialog, VCard, VBtn, VTextField, VForm
  Variants: Confirm, Alert, Form Modal, Fullscreen
-->
<template>
  <VContainer>
    <h2 class="text-h5 font-weight-bold mb-6">Dialog Variants</h2>

    <VRow>
      <!-- Confirm Dialog -->
      <VCol cols="12" sm="6" md="3">
        <VCard class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Confirm Dialog</h4>
          <VBtn color="error" @click="confirmDialog = true">Delete Item</VBtn>
        </VCard>
      </VCol>

      <!-- Alert Dialog -->
      <VCol cols="12" sm="6" md="3">
        <VCard class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Alert Dialog</h4>
          <VBtn color="warning" @click="alertDialog = true">Show Alert</VBtn>
        </VCard>
      </VCol>

      <!-- Form Dialog -->
      <VCol cols="12" sm="6" md="3">
        <VCard class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Form Dialog</h4>
          <VBtn color="primary" @click="formDialog = true">Add User</VBtn>
        </VCard>
      </VCol>

      <!-- Info Dialog -->
      <VCol cols="12" sm="6" md="3">
        <VCard class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Info Dialog</h4>
          <VBtn color="info" @click="infoDialog = true">View Details</VBtn>
        </VCard>
      </VCol>

      <!-- Success Dialog -->
      <VCol cols="12" sm="6" md="3">
        <VCard class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Success Dialog</h4>
          <VBtn color="success" @click="successDialog = true">Complete</VBtn>
        </VCard>
      </VCol>

      <!-- Loading Dialog -->
      <VCol cols="12" sm="6" md="3">
        <VCard class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Loading Dialog</h4>
          <VBtn @click="showLoading">Process</VBtn>
        </VCard>
      </VCol>

      <!-- Fullscreen Dialog -->
      <VCol cols="12" sm="6" md="3">
        <VCard class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Fullscreen Dialog</h4>
          <VBtn color="secondary" @click="fullscreenDialog = true">Open Full</VBtn>
        </VCard>
      </VCol>

      <!-- Scrollable Dialog -->
      <VCol cols="12" sm="6" md="3">
        <VCard class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Scrollable Dialog</h4>
          <VBtn @click="scrollableDialog = true">Long Content</VBtn>
        </VCard>
      </VCol>
    </VRow>

    <!-- Confirm Dialog -->
    <VDialog v-model="confirmDialog" max-width="400">
      <VCard>
        <VCardTitle class="text-h6">Delete Item?</VCardTitle>
        <VCardText>
          Are you sure you want to delete this item? This action cannot be undone.
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn variant="text" @click="confirmDialog = false">Cancel</VBtn>
          <VBtn color="error" @click="confirmDialog = false">Delete</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Alert Dialog -->
    <VDialog v-model="alertDialog" max-width="400">
      <VCard>
        <VCardText class="text-center pa-6">
          <VAvatar color="warning" size="64" class="mb-4">
            <VIcon size="32" color="white">mdi-alert</VIcon>
          </VAvatar>
          <h3 class="text-h6 mb-2">Warning!</h3>
          <p class="text-body-2 text-medium-emphasis mb-0">
            Your session will expire in 5 minutes. Please save your work.
          </p>
        </VCardText>
        <VCardActions class="justify-center pb-4">
          <VBtn color="warning" @click="alertDialog = false">Got it</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Form Dialog -->
    <VDialog v-model="formDialog" max-width="500">
      <VCard>
        <VCardTitle class="d-flex justify-space-between align-center">
          <span>Add New User</span>
          <VBtn icon="mdi-close" variant="text" @click="formDialog = false" />
        </VCardTitle>
        <VDivider />
        <VCardText>
          <VForm ref="formRef" v-model="formValid">
            <VTextField
              v-model="newUser.name"
              :rules="[(v: string) => !!v || 'Name is required']"
              label="Full Name"
              variant="outlined"
              class="mb-3"
            />
            <VTextField
              v-model="newUser.email"
              :rules="[(v: string) => !!v || 'Email is required', (v: string) => /.+@.+/.test(v) || 'Invalid email']"
              label="Email"
              type="email"
              variant="outlined"
              class="mb-3"
            />
            <VSelect
              v-model="newUser.role"
              :items="['Admin', 'Editor', 'Viewer']"
              label="Role"
              variant="outlined"
            />
          </VForm>
        </VCardText>
        <VDivider />
        <VCardActions>
          <VSpacer />
          <VBtn variant="text" @click="formDialog = false">Cancel</VBtn>
          <VBtn color="primary" :disabled="!formValid" @click="saveUser">Save</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Info Dialog -->
    <VDialog v-model="infoDialog" max-width="500">
      <VCard>
        <VImg src="https://picsum.photos/seed/info/500/200" height="200" cover />
        <VCardTitle>Product Details</VCardTitle>
        <VCardText>
          <VList density="compact" class="bg-transparent">
            <VListItem title="SKU" subtitle="PRD-12345" />
            <VListItem title="Category" subtitle="Electronics" />
            <VListItem title="Stock" subtitle="124 units" />
            <VListItem title="Price" subtitle="$299.99" />
          </VList>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn variant="text" @click="infoDialog = false">Close</VBtn>
          <VBtn color="primary">Edit Product</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Success Dialog -->
    <VDialog v-model="successDialog" max-width="400">
      <VCard>
        <VCardText class="text-center pa-8">
          <VAvatar color="success" size="80" class="mb-4">
            <VIcon size="48" color="white">mdi-check</VIcon>
          </VAvatar>
          <h3 class="text-h5 font-weight-bold mb-2">Success!</h3>
          <p class="text-body-1 text-medium-emphasis mb-0">
            Your changes have been saved successfully.
          </p>
        </VCardText>
        <VCardActions class="justify-center pb-6">
          <VBtn color="success" size="large" @click="successDialog = false">Continue</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- Loading Dialog -->
    <VDialog v-model="loadingDialog" max-width="300" persistent>
      <VCard class="pa-6 text-center">
        <VProgressCircular indeterminate color="primary" size="64" class="mb-4" />
        <p class="text-body-1 mb-0">Processing...</p>
      </VCard>
    </VDialog>

    <!-- Fullscreen Dialog -->
    <VDialog v-model="fullscreenDialog" fullscreen transition="dialog-bottom-transition">
      <VCard>
        <VToolbar color="primary">
          <VBtn icon @click="fullscreenDialog = false">
            <VIcon>mdi-close</VIcon>
          </VBtn>
          <VToolbarTitle>Create New Post</VToolbarTitle>
          <VSpacer />
          <VBtn variant="text" @click="fullscreenDialog = false">Save Draft</VBtn>
          <VBtn color="white" class="ml-2">Publish</VBtn>
        </VToolbar>
        <VContainer>
          <VTextField
            label="Post Title"
            variant="outlined"
            class="mb-4"
          />
          <VTextarea
            label="Content"
            variant="outlined"
            rows="15"
          />
        </VContainer>
      </VCard>
    </VDialog>

    <!-- Scrollable Dialog -->
    <VDialog v-model="scrollableDialog" max-width="500" scrollable>
      <VCard>
        <VCardTitle>Terms of Service</VCardTitle>
        <VDivider />
        <VCardText style="height: 300px;">
          <p v-for="n in 10" :key="n" class="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </VCardText>
        <VDivider />
        <VCardActions>
          <VSpacer />
          <VBtn variant="text" @click="scrollableDialog = false">Decline</VBtn>
          <VBtn color="primary" @click="scrollableDialog = false">Accept</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const confirmDialog = ref(false)
const alertDialog = ref(false)
const formDialog = ref(false)
const infoDialog = ref(false)
const successDialog = ref(false)
const loadingDialog = ref(false)
const fullscreenDialog = ref(false)
const scrollableDialog = ref(false)

const formRef = ref()
const formValid = ref(false)
const newUser = ref({ name: '', email: '', role: '' })

const showLoading = () => {
  loadingDialog.value = true
  setTimeout(() => {
    loadingDialog.value = false
  }, 3000)
}

const saveUser = () => {
  console.log('Saving user:', newUser.value)
  formDialog.value = false
  newUser.value = { name: '', email: '', role: '' }
}
</script>
