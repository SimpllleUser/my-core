<!--
  Snippet: Contact Form
  Description: Contact form with validation and success state
  Components: VCard, VTextField, VTextarea, VSelect, VBtn, VAlert
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6">
          <v-card-title class="text-h5 font-weight-bold px-0">
            Get In Touch
          </v-card-title>
          <v-card-subtitle class="px-0 mb-6">
            Fill out the form below and we'll get back to you within 24 hours.
          </v-card-subtitle>

          <v-alert
            v-if="submitted"
            type="success"
            variant="tonal"
            class="mb-6"
            closable
            @click:close="submitted = false"
          >
            <v-alert-title>Message Sent!</v-alert-title>
            Thank you for reaching out. We'll respond to your inquiry soon.
          </v-alert>

          <v-form ref="formRef" v-model="valid" @submit.prevent="submit">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.firstName"
                  :rules="requiredRules"
                  label="First Name"
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.lastName"
                  :rules="requiredRules"
                  label="Last Name"
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.email"
                  :rules="emailRules"
                  label="Email"
                  type="email"
                  variant="outlined"
                  prepend-inner-icon="mdi-email"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.phone"
                  label="Phone (optional)"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="form.subject"
                  :items="subjects"
                  :rules="requiredRules"
                  label="Subject"
                  variant="outlined"
                  prepend-inner-icon="mdi-tag"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.message"
                  :rules="messageRules"
                  label="Message"
                  variant="outlined"
                  rows="5"
                  counter="500"
                  prepend-inner-icon="mdi-message-text"
                />
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="form.newsletter"
                  label="Subscribe to our newsletter for updates and tips"
                  color="primary"
                  hide-details
                />
              </v-col>
            </v-row>

            <div class="d-flex justify-end mt-4">
              <v-btn
                variant="text"
                class="mr-2"
                @click="resetForm"
              >
                Clear
              </v-btn>
              <v-btn
                color="primary"
                size="large"
                type="submit"
                :loading="loading"
                :disabled="!valid"
              >
                Send Message
                <v-icon end>mdi-send</v-icon>
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formRef = ref()
const valid = ref(false)
const loading = ref(false)
const submitted = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  newsletter: false,
})

const subjects = [
  'General Inquiry',
  'Technical Support',
  'Sales Question',
  'Partnership Opportunity',
  'Feedback',
  'Other',
]

const requiredRules = [(v: string) => !!v || 'This field is required']
const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
]
const messageRules = [
  (v: string) => !!v || 'Message is required',
  (v: string) => v.length >= 10 || 'Message must be at least 10 characters',
  (v: string) => v.length <= 500 || 'Message must be less than 500 characters',
]

const submit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  loading.value = true
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    submitted.value = true
    console.log('Form submitted:', form.value)
    resetForm()
  }, 1500)
}

const resetForm = () => {
  formRef.value?.reset()
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false,
  }
}
</script>
