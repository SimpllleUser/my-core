<!--
  Snippet: Dialog Variants
  Description: Various dialog and modal styles
  Components: VDialog, VCard, VBtn, VTextField, VForm
  Variants: Confirm, Alert, Form Modal, Fullscreen
-->
<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-6">Dialog Variants</h2>

    <v-row>
      <!-- Confirm Dialog -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Confirm Dialog</h4>
          <v-btn color="error" @click="confirmDialog = true">Delete Item</v-btn>
        </v-card>
      </v-col>

      <!-- Alert Dialog -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Alert Dialog</h4>
          <v-btn color="warning" @click="alertDialog = true">Show Alert</v-btn>
        </v-card>
      </v-col>

      <!-- Form Dialog -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Form Dialog</h4>
          <v-btn color="primary" @click="formDialog = true">Add User</v-btn>
        </v-card>
      </v-col>

      <!-- Info Dialog -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Info Dialog</h4>
          <v-btn color="info" @click="infoDialog = true">View Details</v-btn>
        </v-card>
      </v-col>

      <!-- Success Dialog -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Success Dialog</h4>
          <v-btn color="success" @click="successDialog = true">Complete</v-btn>
        </v-card>
      </v-col>

      <!-- Loading Dialog -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Loading Dialog</h4>
          <v-btn @click="showLoading">Process</v-btn>
        </v-card>
      </v-col>

      <!-- Fullscreen Dialog -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Fullscreen Dialog</h4>
          <v-btn color="secondary" @click="fullscreenDialog = true">Open Full</v-btn>
        </v-card>
      </v-col>

      <!-- Scrollable Dialog -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4 text-center">
          <h4 class="text-subtitle-1 mb-4">Scrollable Dialog</h4>
          <v-btn @click="scrollableDialog = true">Long Content</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Confirm Dialog -->
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Delete Item?</v-card-title>
        <v-card-text>
          Are you sure you want to delete this item? This action cannot be undone.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="confirmDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="confirmDialog = false">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Alert Dialog -->
    <v-dialog v-model="alertDialog" max-width="400">
      <v-card>
        <v-card-text class="text-center pa-6">
          <v-avatar color="warning" size="64" class="mb-4">
            <v-icon size="32" color="white">mdi-alert</v-icon>
          </v-avatar>
          <h3 class="text-h6 mb-2">Warning!</h3>
          <p class="text-body-2 text-medium-emphasis mb-0">
            Your session will expire in 5 minutes. Please save your work.
          </p>
        </v-card-text>
        <v-card-actions class="justify-center pb-4">
          <v-btn color="warning" @click="alertDialog = false">Got it</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Form Dialog -->
    <v-dialog v-model="formDialog" max-width="500">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Add New User</span>
          <v-btn icon="mdi-close" variant="text" @click="formDialog = false" />
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="formRef" v-model="formValid">
            <v-text-field
              v-model="newUser.name"
              :rules="[(v: string) => !!v || 'Name is required']"
              label="Full Name"
              variant="outlined"
              class="mb-3"
            />
            <v-text-field
              v-model="newUser.email"
              :rules="[(v: string) => !!v || 'Email is required', (v: string) => /.+@.+/.test(v) || 'Invalid email']"
              label="Email"
              type="email"
              variant="outlined"
              class="mb-3"
            />
            <v-select
              v-model="newUser.role"
              :items="['Admin', 'Editor', 'Viewer']"
              label="Role"
              variant="outlined"
            />
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="formDialog = false">Cancel</v-btn>
          <v-btn color="primary" :disabled="!formValid" @click="saveUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Info Dialog -->
    <v-dialog v-model="infoDialog" max-width="500">
      <v-card>
        <v-img src="https://picsum.photos/seed/info/500/200" height="200" cover />
        <v-card-title>Product Details</v-card-title>
        <v-card-text>
          <v-list density="compact" class="bg-transparent">
            <v-list-item title="SKU" subtitle="PRD-12345" />
            <v-list-item title="Category" subtitle="Electronics" />
            <v-list-item title="Stock" subtitle="124 units" />
            <v-list-item title="Price" subtitle="$299.99" />
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="infoDialog = false">Close</v-btn>
          <v-btn color="primary">Edit Product</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="400">
      <v-card>
        <v-card-text class="text-center pa-8">
          <v-avatar color="success" size="80" class="mb-4">
            <v-icon size="48" color="white">mdi-check</v-icon>
          </v-avatar>
          <h3 class="text-h5 font-weight-bold mb-2">Success!</h3>
          <p class="text-body-1 text-medium-emphasis mb-0">
            Your changes have been saved successfully.
          </p>
        </v-card-text>
        <v-card-actions class="justify-center pb-6">
          <v-btn color="success" size="large" @click="successDialog = false">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Loading Dialog -->
    <v-dialog v-model="loadingDialog" max-width="300" persistent>
      <v-card class="pa-6 text-center">
        <v-progress-circular indeterminate color="primary" size="64" class="mb-4" />
        <p class="text-body-1 mb-0">Processing...</p>
      </v-card>
    </v-dialog>

    <!-- Fullscreen Dialog -->
    <v-dialog v-model="fullscreenDialog" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="primary">
          <v-btn icon @click="fullscreenDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create New Post</v-toolbar-title>
          <v-spacer />
          <v-btn variant="text" @click="fullscreenDialog = false">Save Draft</v-btn>
          <v-btn color="white" class="ml-2">Publish</v-btn>
        </v-toolbar>
        <v-container>
          <v-text-field
            label="Post Title"
            variant="outlined"
            class="mb-4"
          />
          <v-textarea
            label="Content"
            variant="outlined"
            rows="15"
          />
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Scrollable Dialog -->
    <v-dialog v-model="scrollableDialog" max-width="500" scrollable>
      <v-card>
        <v-card-title>Terms of Service</v-card-title>
        <v-divider />
        <v-card-text style="height: 300px;">
          <p v-for="n in 10" :key="n" class="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="scrollableDialog = false">Decline</v-btn>
          <v-btn color="primary" @click="scrollableDialog = false">Accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
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
