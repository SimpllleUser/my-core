<!--
  Snippet: Multi-Step Form
  Description: Wizard-style form with progress indicator and validation per step
  Components: VCard, VStepper, VTextField, VSelect, VFileInput, VBtn
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold pa-6 pb-0">
            Job Application Form
          </v-card-title>
          <v-card-subtitle class="pa-6 pt-2">
            Complete all steps to submit your application
          </v-card-subtitle>

          <!-- Progress Bar -->
          <v-progress-linear
            :model-value="progressPercent"
            color="primary"
            height="4"
          />

          <v-stepper
            v-model="currentStep"
            :items="stepTitles"
            flat
            alt-labels
          >
            <template #item.1>
              <v-card flat>
                <v-card-title class="text-h6">Personal Information</v-card-title>
                <v-card-text>
                  <v-form ref="step1FormRef" v-model="step1Valid">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.firstName"
                          :rules="requiredRules"
                          label="First Name"
                          variant="outlined"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.lastName"
                          :rules="requiredRules"
                          label="Last Name"
                          variant="outlined"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.email"
                          :rules="emailRules"
                          label="Email"
                          type="email"
                          variant="outlined"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.phone"
                          :rules="phoneRules"
                          label="Phone"
                          variant="outlined"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.dateOfBirth"
                          :rules="requiredRules"
                          label="Date of Birth"
                          type="date"
                          variant="outlined"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="form.gender"
                          :items="genders"
                          label="Gender"
                          variant="outlined"
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </template>

            <template #item.2>
              <v-card flat>
                <v-card-title class="text-h6">Professional Experience</v-card-title>
                <v-card-text>
                  <v-form ref="step2FormRef" v-model="step2Valid">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="form.position"
                          :items="positions"
                          :rules="requiredRules"
                          label="Desired Position"
                          variant="outlined"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="form.experience"
                          :items="experienceLevels"
                          :rules="requiredRules"
                          label="Years of Experience"
                          variant="outlined"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="form.currentCompany"
                          label="Current/Last Company"
                          variant="outlined"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="form.skills"
                          :items="skillOptions"
                          :rules="[(v: string[]) => v.length > 0 || 'Select at least one skill']"
                          label="Key Skills"
                          variant="outlined"
                          multiple
                          chips
                          closable-chips
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="form.expectedSalary"
                          label="Expected Salary"
                          variant="outlined"
                          prefix="$"
                          type="number"
                        />
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-select
                          v-model="form.startDate"
                          :items="startDates"
                          :rules="requiredRules"
                          label="Available Start Date"
                          variant="outlined"
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </template>

            <template #item.3>
              <v-card flat>
                <v-card-title class="text-h6">Documents & Additional Info</v-card-title>
                <v-card-text>
                  <v-form ref="step3FormRef" v-model="step3Valid">
                    <v-row>
                      <v-col cols="12">
                        <v-file-input
                          v-model="form.resume"
                          :rules="fileRules"
                          label="Resume/CV"
                          variant="outlined"
                          accept=".pdf,.doc,.docx"
                          prepend-icon="mdi-file-document"
                          show-size
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-file-input
                          v-model="form.coverLetter"
                          label="Cover Letter (Optional)"
                          variant="outlined"
                          accept=".pdf,.doc,.docx"
                          prepend-icon="mdi-file-document-outline"
                          show-size
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="form.linkedin"
                          label="LinkedIn Profile URL"
                          variant="outlined"
                          prepend-inner-icon="mdi-linkedin"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="form.portfolio"
                          label="Portfolio/Website URL"
                          variant="outlined"
                          prepend-inner-icon="mdi-web"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="form.additionalInfo"
                          label="Additional Information"
                          variant="outlined"
                          rows="4"
                          placeholder="Tell us anything else you'd like us to know..."
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </template>

            <template #item.4>
              <v-card flat>
                <v-card-title class="text-h6">Review & Submit</v-card-title>
                <v-card-text>
                  <!-- Summary -->
                  <v-alert type="info" variant="tonal" class="mb-6">
                    Please review your information before submitting.
                  </v-alert>

                  <v-row>
                    <v-col cols="12" md="6">
                      <h4 class="text-subtitle-1 font-weight-bold mb-3">Personal Information</h4>
                      <v-list density="compact" class="bg-transparent">
                        <v-list-item>
                          <v-list-item-subtitle>Full Name</v-list-item-subtitle>
                          <v-list-item-title>{{ form.firstName }} {{ form.lastName }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-subtitle>Email</v-list-item-subtitle>
                          <v-list-item-title>{{ form.email }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-subtitle>Phone</v-list-item-subtitle>
                          <v-list-item-title>{{ form.phone }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col cols="12" md="6">
                      <h4 class="text-subtitle-1 font-weight-bold mb-3">Professional Details</h4>
                      <v-list density="compact" class="bg-transparent">
                        <v-list-item>
                          <v-list-item-subtitle>Position</v-list-item-subtitle>
                          <v-list-item-title>{{ form.position }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-subtitle>Experience</v-list-item-subtitle>
                          <v-list-item-title>{{ form.experience }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-subtitle>Skills</v-list-item-subtitle>
                          <v-list-item-title>
                            <v-chip v-for="skill in form.skills" :key="skill" size="small" class="mr-1 mb-1">
                              {{ skill }}
                            </v-chip>
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>

                  <v-divider class="my-4" />

                  <v-checkbox
                    v-model="form.agreeTerms"
                    :rules="[(v: boolean) => v || 'You must agree to continue']"
                    color="primary"
                  >
                    <template #label>
                      I agree to the <a href="#" class="text-primary">Terms of Service</a>
                      and <a href="#" class="text-primary">Privacy Policy</a>
                    </template>
                  </v-checkbox>
                </v-card-text>
              </v-card>
            </template>
          </v-stepper>

          <v-divider />

          <!-- Navigation Buttons -->
          <v-card-actions class="pa-6">
            <v-btn
              v-if="currentStep > 1"
              variant="text"
              @click="currentStep--"
            >
              <v-icon start>mdi-arrow-left</v-icon>
              Previous
            </v-btn>
            <v-spacer />
            <v-btn
              v-if="currentStep < 4"
              color="primary"
              :disabled="!isCurrentStepValid"
              @click="nextStep"
            >
              Next
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              v-else
              color="primary"
              :loading="loading"
              :disabled="!form.agreeTerms"
              @click="submit"
            >
              Submit Application
              <v-icon end>mdi-send</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
