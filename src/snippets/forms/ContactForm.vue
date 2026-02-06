<!--
  Snippet: Contact Form
  Description: Contact form with validation and success state
  Components: VCard, VTextField, VTextarea, VSelect, VBtn, VAlert
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" md="8" lg="6">
        <VCard class="pa-6">
          <VCardTitle class="text-h5 font-weight-bold px-0">
            Get In Touch
          </VCardTitle>
          <VCardSubtitle class="px-0 mb-6">
            Fill out the form below and we'll get back to you within 24 hours.
          </VCardSubtitle>

          <VAlert
            v-if="submitted"
            type="success"
            variant="tonal"
            class="mb-6"
            closable
            @click:close="submitted = false"
          >
            <VAlertTitle>Message Sent!</VAlertTitle>
            Thank you for reaching out. We'll respond to your inquiry soon.
          </VAlert>

          <VForm ref="formRef" v-model="valid" @submit.prevent="submit">
            <VRow>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="form.firstName"
                  :rules="requiredRules"
                  label="First Name"
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="form.lastName"
                  :rules="requiredRules"
                  label="Last Name"
                  variant="outlined"
                  prepend-inner-icon="mdi-account"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="form.email"
                  :rules="emailRules"
                  label="Email"
                  type="email"
                  variant="outlined"
                  prepend-inner-icon="mdi-email"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="form.phone"
                  label="Phone (optional)"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                />
              </VCol>
              <VCol cols="12">
                <VSelect
                  v-model="form.subject"
                  :items="subjects"
                  :rules="requiredRules"
                  label="Subject"
                  variant="outlined"
                  prepend-inner-icon="mdi-tag"
                />
              </VCol>
              <VCol cols="12">
                <VTextarea
                  v-model="form.message"
                  :rules="messageRules"
                  label="Message"
                  variant="outlined"
                  rows="5"
                  counter="500"
                  prepend-inner-icon="mdi-message-text"
                />
              </VCol>
              <VCol cols="12">
                <VCheckbox
                  v-model="form.newsletter"
                  label="Subscribe to our newsletter for updates and tips"
                  color="primary"
                  hide-details
                />
              </VCol>
            </VRow>

            <div class="d-flex justify-end mt-4">
              <VBtn
                variant="text"
                class="mr-2"
                @click="resetForm"
              >
                Clear
              </VBtn>
              <VBtn
                color="primary"
                size="large"
                type="submit"
                :loading="loading"
                :disabled="!valid"
              >
                Send Message
                <VIcon end>mdi-send</VIcon>
              </VBtn>
            </div>
          </VForm>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
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
