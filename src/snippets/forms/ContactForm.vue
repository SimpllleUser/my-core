<!--
  Snippet: Contact Form
  Description: Contact form with validation and success state
  Components: VCard, FormField, useForm
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<script setup lang="ts">
import { Icons } from '../../shared/model'
import { ref } from 'vue'
import {
  TextField,
  EmailField,
  SelectField,
  TextareaField,
  CheckboxField,
  useForm,
  FormField,
  minLength,
  maxLength,
} from '../../shared/form'

const loading = ref(false)
const submitted = ref(false)

const { form, isValid, validateAll, reset } = useForm({
  firstName: new TextField({
    label: 'First Name',
    required: true,
    vuetifyProps: { 'prepend-inner-icon': Icons.Account },
  }),
  lastName: new TextField({
    label: 'Last Name',
    required: true,
    vuetifyProps: { 'prepend-inner-icon': Icons.Account },
  }),
  email: new EmailField({
    label: 'Email',
    required: true,
    vuetifyProps: { 'prepend-inner-icon': Icons.Email },
  }),
  phone: new TextField({
    label: 'Phone (optional)',
    vuetifyProps: { 'prepend-inner-icon': Icons.Phone },
  }),
  subject: new SelectField({
    label: 'Subject',
    required: true,
    options: [
      { title: 'General Inquiry', value: 'General Inquiry' },
      { title: 'Technical Support', value: 'Technical Support' },
      { title: 'Sales Question', value: 'Sales Question' },
      { title: 'Partnership Opportunity', value: 'Partnership Opportunity' },
      { title: 'Feedback', value: 'Feedback' },
      { title: 'Other', value: 'Other' },
    ],
    vuetifyProps: { 'prepend-inner-icon': Icons.Tag },
  }),
  message: new TextareaField({
    label: 'Message',
    required: true,
    rows: 5,
    rules: [minLength(10), maxLength(500)],
    vuetifyProps: { 'prepend-inner-icon': Icons.MessageText, counter: 500 },
  }),
  newsletter: new CheckboxField({
    label: 'Subscribe to our newsletter for updates and tips',
  }),
})

const submit = () => {
  if (!validateAll()) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    submitted.value = true
    reset()
  }, 1500)
}
</script>
<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" md="8" lg="6">
        <VCard class="pa-6">
          <VCardTitle class="text-h5 font-weight-bold px-0">Get In Touch</VCardTitle>
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

          <VForm @submit.prevent="submit">
            <VRow>
              <VCol cols="12" sm="6"><FormField v-model="form.firstName" /></VCol>
              <VCol cols="12" sm="6"><FormField v-model="form.lastName" /></VCol>
              <VCol cols="12" sm="6"><FormField v-model="form.email" /></VCol>
              <VCol cols="12" sm="6"><FormField v-model="form.phone" /></VCol>
              <VCol cols="12"><FormField v-model="form.subject" /></VCol>
              <VCol cols="12"><FormField v-model="form.message" /></VCol>
              <VCol cols="12"><FormField v-model="form.newsletter" /></VCol>
            </VRow>

            <div class="d-flex justify-end mt-4">
              <VBtn variant="text" class="mr-2" @click="reset">Clear</VBtn>
              <VBtn color="primary" size="large" type="submit" :loading="loading" :disabled="!isValid">
                Send Message
                <VIcon end>{{ Icons.Send }}</VIcon>
              </VBtn>
            </div>
          </VForm>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
