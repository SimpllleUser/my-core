<!--
  Snippet: Register Multi-Step
  Description: Multi-step registration wizard with progress stepper
  Components: VCard, VStepper, VStepperHeader, VStepperItem, VStepperWindow, VTextField, VBtn, VSelect
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="8" rounded="lg">
          <v-card-title class="text-h5 font-weight-bold pa-6 pb-0">
            Create Your Account
          </v-card-title>

          <v-stepper v-model="currentStep" alt-labels flat>
            <v-stepper-header>
              <v-stepper-item
                :complete="currentStep > 1"
                :value="1"
                title="Account"
                subtitle="Basic info"
              />
              <v-divider />
              <v-stepper-item
                :complete="currentStep > 2"
                :value="2"
                title="Personal"
                subtitle="Your details"
              />
              <v-divider />
              <v-stepper-item
                :complete="currentStep > 3"
                :value="3"
                title="Preferences"
                subtitle="Customize"
              />
            </v-stepper-header>

            <v-stepper-window>
              <!-- Step 1: Account Information -->
              <v-stepper-window-item :value="1">
                <v-card flat>
                  <v-card-text>
                    <v-form ref="step1FormRef" v-model="step1Valid">
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.email"
                            :rules="emailRules"
                            label="Email Address"
                            type="email"
                            variant="outlined"
                            prepend-inner-icon="mdi-email"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="form.password"
                            :rules="passwordRules"
                            :type="showPassword ? 'text' : 'password'"
                            label="Password"
                            variant="outlined"
                            prepend-inner-icon="mdi-lock"
                            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append-inner="showPassword = !showPassword"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="form.confirmPassword"
                            :rules="confirmPasswordRules"
                            :type="showPassword ? 'text' : 'password'"
                            label="Confirm Password"
                            variant="outlined"
                            prepend-inner-icon="mdi-lock-check"
                          />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-stepper-window-item>

              <!-- Step 2: Personal Information -->
              <v-stepper-window-item :value="2">
                <v-card flat>
                  <v-card-text>
                    <v-form ref="step2FormRef" v-model="step2Valid">
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="form.firstName"
                            :rules="requiredRules"
                            label="First Name"
                            variant="outlined"
                            prepend-inner-icon="mdi-account"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="form.lastName"
                            :rules="requiredRules"
                            label="Last Name"
                            variant="outlined"
                            prepend-inner-icon="mdi-account"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="form.phone"
                            label="Phone Number"
                            variant="outlined"
                            prepend-inner-icon="mdi-phone"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            v-model="form.country"
                            :items="countries"
                            :rules="requiredRules"
                            label="Country"
                            variant="outlined"
                            prepend-inner-icon="mdi-earth"
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="form.city"
                            label="City"
                            variant="outlined"
                            prepend-inner-icon="mdi-city"
                          />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-stepper-window-item>

              <!-- Step 3: Preferences -->
              <v-stepper-window-item :value="3">
                <v-card flat>
                  <v-card-text>
                    <v-form ref="step3FormRef" v-model="step3Valid">
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            v-model="form.interests"
                            :items="interestOptions"
                            label="Interests"
                            variant="outlined"
                            multiple
                            chips
                            closable-chips
                            prepend-inner-icon="mdi-heart"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="form.notifications"
                            :items="notificationOptions"
                            label="Notification Preferences"
                            variant="outlined"
                            prepend-inner-icon="mdi-bell"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-checkbox
                            v-model="form.newsletter"
                            label="Subscribe to newsletter"
                            color="primary"
                          />
                          <v-checkbox
                            v-model="form.terms"
                            :rules="[(v: boolean) => v || 'You must agree to the terms']"
                            color="primary"
                          >
                            <template #label>
                              I agree to the
                              <a href="#" class="text-primary ms-1">Terms of Service</a>
                              and
                              <a href="#" class="text-primary ms-1">Privacy Policy</a>
                            </template>
                          </v-checkbox>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-stepper-window-item>
            </v-stepper-window>

            <v-card-actions class="pa-6 pt-0">
              <v-btn
                v-if="currentStep > 1"
                variant="text"
                @click="currentStep--"
              >
                Back
              </v-btn>
              <v-spacer />
              <v-btn
                v-if="currentStep < 3"
                color="primary"
                :disabled="!isCurrentStepValid"
                @click="nextStep"
              >
                Continue
              </v-btn>
              <v-btn
                v-else
                color="primary"
                :loading="loading"
                :disabled="!step3Valid"
                @click="submit"
              >
                Create Account
              </v-btn>
            </v-card-actions>
          </v-stepper>
        </v-card>

        <div class="text-center mt-4">
          <span class="text-medium-emphasis">Already have an account?</span>
          <v-btn variant="text" color="primary">Sign In</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentStep = ref(1)
const loading = ref(false)
const showPassword = ref(false)

const step1FormRef = ref()
const step2FormRef = ref()
const step3FormRef = ref()

const step1Valid = ref(false)
const step2Valid = ref(false)
const step3Valid = ref(false)

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  phone: '',
  country: '',
  city: '',
  interests: [],
  notifications: 'all',
  newsletter: true,
  terms: false,
})

const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan', 'Ukraine']
const interestOptions = ['Technology', 'Design', 'Business', 'Marketing', 'Science', 'Art', 'Music', 'Sports']
const notificationOptions = [
  { title: 'All notifications', value: 'all' },
  { title: 'Important only', value: 'important' },
  { title: 'None', value: 'none' },
]

const requiredRules = [(v: string) => !!v || 'This field is required']
const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid',
]
const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
]
const confirmPasswordRules = [
  (v: string) => !!v || 'Please confirm your password',
  (v: string) => v === form.value.password || 'Passwords do not match',
]

const isCurrentStepValid = computed(() => {
  if (currentStep.value === 1) return step1Valid.value
  if (currentStep.value === 2) return step2Valid.value
  return step3Valid.value
})

const nextStep = async () => {
  let formRef
  if (currentStep.value === 1) formRef = step1FormRef.value
  else if (currentStep.value === 2) formRef = step2FormRef.value

  if (formRef) {
    const { valid } = await formRef.validate()
    if (valid) currentStep.value++
  }
}

const submit = async () => {
  const { valid } = await step3FormRef.value.validate()
  if (!valid) return

  loading.value = true
  setTimeout(() => {
    loading.value = false
    console.log('Registration:', form.value)
  }, 2000)
}
</script>
