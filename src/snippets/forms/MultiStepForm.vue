<!--
  Snippet: Multi-Step Form
  Description: Wizard-style form with progress indicator and validation per step
  Components: VCard, VStepper, VTextField, VSelect, VFileInput, VBtn
  Variants: Light/Dark (automatic via Vuetify theme)
-->
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
                  <VForm ref="step1FormRef" v-model="step1Valid">
                    <VRow>
                      <VCol cols="12" sm="6">
                        <VTextField
                          v-model="form.firstName"
                          :rules="requiredRules"
                          label="First Name"
                          variant="outlined"
                        />
                      </VCol>
                      <VCol cols="12" sm="6">
                        <VTextField
                          v-model="form.lastName"
                          :rules="requiredRules"
                          label="Last Name"
                          variant="outlined"
                        />
                      </VCol>
                      <VCol cols="12" sm="6">
                        <VTextField
                          v-model="form.email"
                          :rules="emailRules"
                          label="Email"
                          type="email"
                          variant="outlined"
                        />
                      </VCol>
                      <VCol cols="12" sm="6">
                        <VTextField
                          v-model="form.phone"
                          :rules="phoneRules"
                          label="Phone"
                          variant="outlined"
                        />
                      </VCol>
                      <VCol cols="12" sm="6">
                        <VTextField
                          v-model="form.dateOfBirth"
                          :rules="requiredRules"
                          label="Date of Birth"
                          type="date"
                          variant="outlined"
                        />
                      </VCol>
                      <VCol cols="12" sm="6">
                        <VSelect
                          v-model="form.gender"
                          :items="genders"
                          label="Gender"
                          variant="outlined"
                        />
                      </VCol>
                    </VRow>
                  </VForm>
                </VCardText>
              </VCard>
            </template>

            <template #item.2>
              <VCard flat>
                <VCardTitle class="text-h6">Professional Experience</VCardTitle>
                <VCardText>
                  <VForm ref="step2FormRef" v-model="step2Valid">
                    <VRow>
                      <VCol cols="12" sm="6">
                        <VSelect
                          v-model="form.position"
                          :items="positions"
                          :rules="requiredRules"
                          label="Desired Position"
                          variant="outlined"
                        />
                      </VCol>
                      <VCol cols="12" sm="6">
                        <VSelect
                          v-model="form.experience"
                          :items="experienceLevels"
                          :rules="requiredRules"
                          label="Years of Experience"
                          variant="outlined"
                        />
                      </VCol>
                      <VCol cols="12">
                        <VTextField
                          v-model="form.currentCompany"
                          label="Current/Last Company"
                          variant="outlined"
                        />
                      </VCol>
                      <VCol cols="12">
                        <VSelect
                          v-model="form.skills"
                          :items="skillOptions"
                          :rules="[(v: string[]) => v.length > 0 || 'Select at least one skill']"
                          label="Key Skills"
                          variant="outlined"
                          multiple
                          chips
                          closable-chips
                        />
                      </VCol>
                      <VCol cols="12" sm="6">
                        <VTextField
                          v-model="form.expectedSalary"
                          label="Expected Salary"
                          variant="outlined"
                          prefix="$"
                          type="number"
                        />
                      </VCol>
                      <VCol cols="12" sm="6">
                        <VSelect
                          v-model="form.startDate"
                          :items="startDates"
                          :rules="requiredRules"
                          label="Available Start Date"
                          variant="outlined"
                        />
                      </VCol>
                    </VRow>
                  </VForm>
                </VCardText>
              </VCard>
            </template>

            <template #item.3>
              <VCard flat>
                <VCardTitle class="text-h6">Documents & Additional Info</VCardTitle>
                <VCardText>
                  <VForm ref="step3FormRef" v-model="step3Valid">
                    <VRow>
                      <VCol cols="12">
                        <VFileInput
                          v-model="form.resume"
                          :rules="fileRules"
                          label="Resume/CV"
                          variant="outlined"
                          accept=".pdf,.doc,.docx"
                          prepend-icon="mdi-file-document"
                          show-size
                        />
                      </VCol>
                      <VCol cols="12">
                        <VFileInput
                          v-model="form.coverLetter"
                          label="Cover Letter (Optional)"
                          variant="outlined"
                          accept=".pdf,.doc,.docx"
                          prepend-icon="mdi-file-document-outline"
                          show-size
                        />
                      </VCol>
                      <VCol cols="12">
                        <VTextField
                          v-model="form.linkedin"
                          label="LinkedIn Profile URL"
                          variant="outlined"
                          prepend-inner-icon="mdi-linkedin"
                        />
                      </VCol>
                      <VCol cols="12">
                        <VTextField
                          v-model="form.portfolio"
                          label="Portfolio/Website URL"
                          variant="outlined"
                          prepend-inner-icon="mdi-web"
                        />
                      </VCol>
                      <VCol cols="12">
                        <VTextarea
                          v-model="form.additionalInfo"
                          label="Additional Information"
                          variant="outlined"
                          rows="4"
                          placeholder="Tell us anything else you'd like us to know..."
                        />
                      </VCol>
                    </VRow>
                  </VForm>
                </VCardText>
              </VCard>
            </template>

            <template #item.4>
              <VCard flat>
                <VCardTitle class="text-h6">Review & Submit</VCardTitle>
                <VCardText>
                  <!-- Summary -->
                  <VAlert type="info" variant="tonal" class="mb-6">
                    Please review your information before submitting.
                  </VAlert>

                  <VRow>
                    <VCol cols="12" md="6">
                      <h4 class="text-subtitle-1 font-weight-bold mb-3">Personal Information</h4>
                      <VList density="compact" class="bg-transparent">
                        <VListItem>
                          <VListItemSubtitle>Full Name</VListItemSubtitle>
                          <VListItemTitle>{{ form.firstName }} {{ form.lastName }}</VListItemTitle>
                        </VListItem>
                        <VListItem>
                          <VListItemSubtitle>Email</VListItemSubtitle>
                          <VListItemTitle>{{ form.email }}</VListItemTitle>
                        </VListItem>
                        <VListItem>
                          <VListItemSubtitle>Phone</VListItemSubtitle>
                          <VListItemTitle>{{ form.phone }}</VListItemTitle>
                        </VListItem>
                      </VList>
                    </VCol>
                    <VCol cols="12" md="6">
                      <h4 class="text-subtitle-1 font-weight-bold mb-3">Professional Details</h4>
                      <VList density="compact" class="bg-transparent">
                        <VListItem>
                          <VListItemSubtitle>Position</VListItemSubtitle>
                          <VListItemTitle>{{ form.position }}</VListItemTitle>
                        </VListItem>
                        <VListItem>
                          <VListItemSubtitle>Experience</VListItemSubtitle>
                          <VListItemTitle>{{ form.experience }}</VListItemTitle>
                        </VListItem>
                        <VListItem>
                          <VListItemSubtitle>Skills</VListItemSubtitle>
                          <VListItemTitle>
                            <VChip v-for="skill in form.skills" :key="skill" size="small" class="mr-1 mb-1">
                              {{ skill }}
                            </VChip>
                          </VListItemTitle>
                        </VListItem>
                      </VList>
                    </VCol>
                  </VRow>

                  <VDivider class="my-4" />

                  <VCheckbox
                    v-model="form.agreeTerms"
                    :rules="[(v: boolean) => v || 'You must agree to continue']"
                    color="primary"
                  >
                    <template #label>
                      I agree to the <a href="#" class="text-primary">Terms of Service</a>
                      and <a href="#" class="text-primary">Privacy Policy</a>
                    </template>
                  </VCheckbox>
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
              <VIcon start>mdi-arrow-left</VIcon>
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
              <VIcon end>mdi-arrow-right</VIcon>
            </VBtn>
            <VBtn
              v-else
              color="primary"
              :loading="loading"
              :disabled="!form.agreeTerms"
              @click="submit"
            >
              Submit Application
              <VIcon end>mdi-send</VIcon>
            </VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentStep = ref(1)
const loading = ref(false)

const step1FormRef = ref()
const step2FormRef = ref()
const step3FormRef = ref()

const step1Valid = ref(false)
const step2Valid = ref(false)
const step3Valid = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  position: '',
  experience: '',
  currentCompany: '',
  skills: [] as string[],
  expectedSalary: '',
  startDate: '',
  resume: null as File | null,
  coverLetter: null as File | null,
  linkedin: '',
  portfolio: '',
  additionalInfo: '',
  agreeTerms: false,
})

const stepTitles = ['Personal', 'Experience', 'Documents', 'Review']
const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say']
const positions = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer', 'UI/UX Designer', 'Product Manager']
const experienceLevels = ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years']
const skillOptions = ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Angular', 'Node.js', 'Python', 'Go', 'Docker', 'AWS', 'Git']
const startDates = ['Immediately', 'Within 2 weeks', 'Within 1 month', 'Within 2 months', 'More than 2 months']

const requiredRules = [(v: string) => !!v || 'This field is required']
const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
]
const phoneRules = [
  (v: string) => !!v || 'Phone is required',
  (v: string) => /^[\d\s\-+()]+$/.test(v) || 'Please enter a valid phone number',
]
const fileRules = [
  (v: File | null) => !!v || 'Resume is required',
  (v: File | null) => !v || v.size < 5000000 || 'File size should be less than 5 MB',
]

const progressPercent = computed(() => ((currentStep.value - 1) / 3) * 100)

const isCurrentStepValid = computed(() => {
  switch (currentStep.value) {
    case 1: return step1Valid.value
    case 2: return step2Valid.value
    case 3: return step3Valid.value
    default: return true
  }
})

const nextStep = async () => {
  let formRef
  switch (currentStep.value) {
    case 1: formRef = step1FormRef.value; break
    case 2: formRef = step2FormRef.value; break
    case 3: formRef = step3FormRef.value; break
  }

  if (formRef) {
    const { valid } = await formRef.validate()
    if (valid) currentStep.value++
  }
}

const submit = async () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    console.log('Application submitted:', form.value)
  }, 2000)
}
</script>
