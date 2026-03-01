<!--
  Snippet: Multi-Step Form
  Description: Wizard-style form with progress indicator and validation per step
  Components: VCard, VStepper, FormField, FormConfig, useForm, VFileInput
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<script setup lang="ts">
import { Icons } from '../../shared/model'
import { ref, computed } from 'vue'
import {
  FormConfig,
  TextField,
  EmailField,
  SelectField,
  TextareaField,
  CheckboxField,
  useForm,
  FormField,
  required,
  pattern,
} from '../../shared/form'

const currentStep = ref(1)
const loading = ref(false)

// --- Step 1: Personal Information ---
const step1Form = new FormConfig({
  firstName: new TextField({ label: 'First Name', required: true }),
  lastName: new TextField({ label: 'Last Name', required: true }),
  email: new EmailField({ label: 'Email', required: true }),
  phone: new TextField({
    label: 'Phone',
    required: true,
    rules: [pattern(/^[\d\s\-+()]+$/, 'Please enter a valid phone number')],
  }),
  dateOfBirth: new TextField({
    label: 'Date of Birth',
    required: true,
    vuetifyProps: { type: 'date' },
  }),
  gender: new SelectField({
    label: 'Gender',
    options: [
      { title: 'Male', value: 'Male' },
      { title: 'Female', value: 'Female' },
      { title: 'Non-binary', value: 'Non-binary' },
      { title: 'Prefer not to say', value: 'Prefer not to say' },
    ],
  }),
})

const {
  form: step1,
  isValid: step1Valid,
  validateAll: step1ValidateAll,
} = useForm(step1Form.getFields())

// --- Step 2: Professional Experience ---
const step2Form = new FormConfig({
  position: new SelectField({
    label: 'Desired Position',
    required: true,
    options: [
      'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
      'DevOps Engineer', 'UI/UX Designer', 'Product Manager',
    ].map(p => ({ title: p, value: p })),
  }),
  experience: new SelectField({
    label: 'Years of Experience',
    required: true,
    options: [
      '0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years',
    ].map(e => ({ title: e, value: e })),
  }),
  currentCompany: new TextField({ label: 'Current/Last Company' }),
  skills: new SelectField({
    label: 'Key Skills',
    required: true,
    multiple: true,
    options: [
      'JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular',
      'Node.js', 'Python', 'Go', 'Docker', 'AWS', 'Git',
    ].map(s => ({ title: s, value: s })),
    vuetifyProps: { chips: true, 'closable-chips': true },
  }),
  expectedSalary: new TextField({
    label: 'Expected Salary',
    vuetifyProps: { prefix: '$', type: 'number' },
  }),
  startDate: new SelectField({
    label: 'Available Start Date',
    required: true,
    options: [
      'Immediately', 'Within 2 weeks', 'Within 1 month',
      'Within 2 months', 'More than 2 months',
    ].map(d => ({ title: d, value: d })),
  }),
})

const {
  form: step2,
  isValid: step2Valid,
  validateAll: step2ValidateAll,
} = useForm(step2Form.getFields())

// --- Step 3: Documents (file inputs stay as raw Vuetify) ---
const step3Form = new FormConfig({
  linkedin: new TextField({
    label: 'LinkedIn Profile URL',
    vuetifyProps: { 'prepend-inner-icon': Icons.LinkedIn },
  }),
  portfolio: new TextField({
    label: 'Portfolio/Website URL',
    vuetifyProps: { 'prepend-inner-icon': Icons.Web },
  }),
  additionalInfo: new TextareaField({
    label: 'Additional Information',
    placeholder: "Tell us anything else you'd like us to know...",
    rows: 4,
  }),
})

const { form: step3 } = useForm(step3Form.getFields())

const documents = ref({
  resume: null as File | null,
  coverLetter: null as File | null,
})

const fileRules = [
  (v: File | null) => !!v || 'Resume is required',
  (v: File | null) => !v || v.size < 5000000 || 'File size should be less than 5 MB',
]

// --- Step 4: Review ---
const reviewForm = new FormConfig({
  agreeTerms: new CheckboxField({
    label: 'I agree to the Terms of Service and Privacy Policy',
    required: true,
    rules: [required('You must agree to continue')],
  }),
})

const {
  form: review,
  isValid: reviewValid,
  validateAll: reviewValidateAll,
} = useForm(reviewForm.getFields())

const stepTitles = ['Personal', 'Experience', 'Documents', 'Review']

const progressPercent = computed(() => ((currentStep.value - 1) / 3) * 100)

const isCurrentStepValid = computed(() => {
  switch (currentStep.value) {
    case 1: return step1Valid.value
    case 2: return step2Valid.value
    case 3: return !!documents.value.resume
    default: return true
  }
})

const nextStep = () => {
  let valid = false
  switch (currentStep.value) {
    case 1: valid = step1ValidateAll(); break
    case 2: valid = step2ValidateAll(); break
    case 3: valid = !!documents.value.resume; break
    default: valid = true
  }
  if (valid) currentStep.value++
}

const submit = () => {
  if (!reviewValidateAll()) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    console.log('Application submitted')
  }, 2000)
}
</script>
<template>
  <VContainer>
    <VRow justify="center">
      <VCol cols="12" md="10" lg="8">
        <VCard>
          <VCardTitle class="text-h5 font-weight-bold pa-6 pb-0">
            Job Application Form
          </VCardTitle>
          <VCardSubtitle class="pa-6 pt-2">
            Complete all steps to submit your application
          </VCardSubtitle>

          <!-- Progress Bar -->
          <VProgressLinear
            :model-value="progressPercent"
            color="primary"
            height="4"
          />

          <VStepper
            v-model="currentStep"
            :items="stepTitles"
            flat
            alt-labels
          >
            <template #item.1>
              <VCard flat>
                <VCardTitle class="text-h6">Personal Information</VCardTitle>
                <VCardText>
                  <VRow>
                    <VCol cols="12" sm="6">
                      <FormField v-model="step1.firstName" />
                    </VCol>
                    <VCol cols="12" sm="6">
                      <FormField v-model="step1.lastName" />
                    </VCol>
                    <VCol cols="12" sm="6">
                      <FormField v-model="step1.email" />
                    </VCol>
                    <VCol cols="12" sm="6">
                      <FormField v-model="step1.phone" />
                    </VCol>
                    <VCol cols="12" sm="6">
                      <FormField v-model="step1.dateOfBirth" />
                    </VCol>
                    <VCol cols="12" sm="6">
                      <FormField v-model="step1.gender" />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </template>

            <template #item.2>
              <VCard flat>
                <VCardTitle class="text-h6">Professional Experience</VCardTitle>
                <VCardText>
                  <VRow>
                    <VCol cols="12" sm="6">
                      <FormField v-model="step2.position" />
                    </VCol>
                    <VCol cols="12" sm="6">
                      <FormField v-model="step2.experience" />
                    </VCol>
                    <VCol cols="12">
                      <FormField v-model="step2.currentCompany" />
                    </VCol>
                    <VCol cols="12">
                      <FormField v-model="step2.skills" />
                    </VCol>
                    <VCol cols="12" sm="6">
                      <FormField v-model="step2.expectedSalary" />
                    </VCol>
                    <VCol cols="12" sm="6">
                      <FormField v-model="step2.startDate" />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </template>

            <template #item.3>
              <VCard flat>
                <VCardTitle class="text-h6">Documents & Additional Info</VCardTitle>
                <VCardText>
                  <VRow>
                    <VCol cols="12">
                      <VFileInput
                        v-model="documents.resume"
                        :rules="fileRules"
                        label="Resume/CV"
                        variant="outlined"
                        accept=".pdf,.doc,.docx"
                        :prepend-icon="Icons.FileDocument"
                        show-size
                      />
                    </VCol>
                    <VCol cols="12">
                      <VFileInput
                        v-model="documents.coverLetter"
                        label="Cover Letter (Optional)"
                        variant="outlined"
                        accept=".pdf,.doc,.docx"
                        :prepend-icon="Icons.FileDocumentOutline"
                        show-size
                      />
                    </VCol>
                    <VCol cols="12">
                      <FormField v-model="step3.linkedin" />
                    </VCol>
                    <VCol cols="12">
                      <FormField v-model="step3.portfolio" />
                    </VCol>
                    <VCol cols="12">
                      <FormField v-model="step3.additionalInfo" />
                    </VCol>
                  </VRow>
                </VCardText>
              </VCard>
            </template>

            <template #item.4>
              <VCard flat>
                <VCardTitle class="text-h6">Review & Submit</VCardTitle>
                <VCardText>
                  <VAlert type="info" variant="tonal" class="mb-6">
                    Please review your information before submitting.
                  </VAlert>

                  <VRow>
                    <VCol cols="12" md="6">
                      <h4 class="text-subtitle-1 font-weight-bold mb-3">Personal Information</h4>
                      <VList density="compact" class="bg-transparent">
                        <VListItem>
                          <VListItemSubtitle>Full Name</VListItemSubtitle>
                          <VListItemTitle>{{ step1.firstName.value }} {{ step1.lastName.value }}</VListItemTitle>
                        </VListItem>
                        <VListItem>
                          <VListItemSubtitle>Email</VListItemSubtitle>
                          <VListItemTitle>{{ step1.email.value }}</VListItemTitle>
                        </VListItem>
                        <VListItem>
                          <VListItemSubtitle>Phone</VListItemSubtitle>
                          <VListItemTitle>{{ step1.phone.value }}</VListItemTitle>
                        </VListItem>
                      </VList>
                    </VCol>
                    <VCol cols="12" md="6">
                      <h4 class="text-subtitle-1 font-weight-bold mb-3">Professional Details</h4>
                      <VList density="compact" class="bg-transparent">
                        <VListItem>
                          <VListItemSubtitle>Position</VListItemSubtitle>
                          <VListItemTitle>{{ step2.position.value }}</VListItemTitle>
                        </VListItem>
                        <VListItem>
                          <VListItemSubtitle>Experience</VListItemSubtitle>
                          <VListItemTitle>{{ step2.experience.value }}</VListItemTitle>
                        </VListItem>
                        <VListItem>
                          <VListItemSubtitle>Skills</VListItemSubtitle>
                          <VListItemTitle>
                            <VChip v-for="skill in (step2.skills.value as string[])" :key="skill" size="small" class="mr-1 mb-1">
                              {{ skill }}
                            </VChip>
                          </VListItemTitle>
                        </VListItem>
                      </VList>
                    </VCol>
                  </VRow>

                  <VDivider class="my-4" />

                  <FormField v-model="review.agreeTerms" />
                </VCardText>
              </VCard>
            </template>
          </VStepper>

          <VDivider />

          <!-- Navigation Buttons -->
          <VCardActions class="pa-6">
            <VBtn
              v-if="currentStep > 1"
              variant="text"
              @click="currentStep--"
            >
              <VIcon start>{{ Icons.ArrowLeft }}</VIcon>
              Previous
            </VBtn>
            <VSpacer />
            <VBtn
              v-if="currentStep < 4"
              color="primary"
              :disabled="!isCurrentStepValid"
              @click="nextStep"
            >
              Next
              <VIcon end>{{ Icons.ArrowRight }}</VIcon>
            </VBtn>
            <VBtn
              v-else
              color="primary"
              :loading="loading"
              :disabled="!reviewValid"
              @click="submit"
            >
              Submit Application
              <VIcon end>{{ Icons.Send }}</VIcon>
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
