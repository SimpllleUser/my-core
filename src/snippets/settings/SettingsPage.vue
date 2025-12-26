<!--
  Snippet: Settings Page
  Description: User settings page with tabs and form controls
  Components: VTabs, VCard, VSwitch, VSelect, VTextField, VBtn
  Variants: Tabbed layout, Account settings, Notifications, Security
-->
<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-6">Settings</h1>

    <v-row>
      <!-- Sidebar Navigation -->
      <v-col cols="12" md="3">
        <v-card>
          <v-list nav density="compact">
            <v-list-item
              v-for="section in sections"
              :key="section.value"
              :prepend-icon="section.icon"
              :title="section.title"
              :active="activeSection === section.value"
              rounded="lg"
              @click="activeSection = section.value"
            />
          </v-list>
        </v-card>
      </v-col>

      <!-- Settings Content -->
      <v-col cols="12" md="9">
        <!-- Profile Settings -->
        <v-card v-if="activeSection === 'profile'" class="mb-4">
          <v-card-title>Profile Information</v-card-title>
          <v-card-text>
            <div class="d-flex align-center mb-6">
              <v-avatar size="80" class="mr-4">
                <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
              </v-avatar>
              <div>
                <v-btn variant="outlined" size="small" class="mr-2">Change Photo</v-btn>
                <v-btn variant="text" size="small" color="error">Remove</v-btn>
                <p class="text-caption text-medium-emphasis mt-2 mb-0">
                  JPG, GIF or PNG. Max size 2MB
                </p>
              </div>
            </div>

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="profile.firstName"
                  label="First Name"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="profile.lastName"
                  label="Last Name"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="profile.email"
                  label="Email"
                  type="email"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="profile.phone"
                  label="Phone"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="profile.bio"
                  label="Bio"
                  variant="outlined"
                  rows="3"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="pa-4 pt-0">
            <v-spacer />
            <v-btn variant="text">Cancel</v-btn>
            <v-btn color="primary">Save Changes</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Account Settings -->
        <v-card v-if="activeSection === 'account'" class="mb-4">
          <v-card-title>Account Settings</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="account.username"
                  label="Username"
                  variant="outlined"
                  prepend-inner-icon="mdi-at"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="account.language"
                  :items="languages"
                  label="Language"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="account.timezone"
                  :items="timezones"
                  label="Timezone"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="account.currency"
                  :items="currencies"
                  label="Currency"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="pa-4 pt-0">
            <v-spacer />
            <v-btn variant="text">Cancel</v-btn>
            <v-btn color="primary">Save Changes</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Notifications Settings -->
        <v-card v-if="activeSection === 'notifications'" class="mb-4">
          <v-card-title>Notification Preferences</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-subheader>Email Notifications</v-list-subheader>
              <v-list-item v-for="item in emailNotifications" :key="item.title">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                <template #append>
                  <v-switch v-model="item.enabled" color="primary" hide-details />
                </template>
              </v-list-item>

              <v-divider class="my-4" />

              <v-list-subheader>Push Notifications</v-list-subheader>
              <v-list-item v-for="item in pushNotifications" :key="item.title">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                <template #append>
                  <v-switch v-model="item.enabled" color="primary" hide-details />
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Security Settings -->
        <v-card v-if="activeSection === 'security'" class="mb-4">
          <v-card-title>Security</v-card-title>
          <v-card-text>
            <h4 class="text-subtitle-1 font-weight-medium mb-4">Change Password</h4>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="security.currentPassword"
                  label="Current Password"
                  type="password"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="security.newPassword"
                  label="New Password"
                  type="password"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="security.confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <v-btn color="primary" class="mb-8">Update Password</v-btn>

            <v-divider class="mb-6" />

            <h4 class="text-subtitle-1 font-weight-medium mb-4">Two-Factor Authentication</h4>
            <v-alert type="warning" variant="tonal" class="mb-4">
              Two-factor authentication adds an extra layer of security to your account.
            </v-alert>
            <v-btn variant="outlined">Enable 2FA</v-btn>

            <v-divider class="my-6" />

            <h4 class="text-subtitle-1 font-weight-medium mb-4">Active Sessions</h4>
            <v-list density="compact">
              <v-list-item v-for="session in sessions" :key="session.id">
                <template #prepend>
                  <v-icon>{{ session.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ session.device }}</v-list-item-title>
                <v-list-item-subtitle>{{ session.location }} • {{ session.time }}</v-list-item-subtitle>
                <template #append>
                  <v-chip v-if="session.current" color="success" size="small">Current</v-chip>
                  <v-btn v-else variant="text" size="small" color="error">Revoke</v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Appearance Settings -->
        <v-card v-if="activeSection === 'appearance'">
          <v-card-title>Appearance</v-card-title>
          <v-card-text>
            <h4 class="text-subtitle-1 font-weight-medium mb-4">Theme</h4>
            <v-btn-toggle v-model="appearance.theme" mandatory class="mb-6">
              <v-btn value="light">
                <v-icon start>mdi-white-balance-sunny</v-icon>
                Light
              </v-btn>
              <v-btn value="dark">
                <v-icon start>mdi-moon-waning-crescent</v-icon>
                Dark
              </v-btn>
              <v-btn value="system">
                <v-icon start>mdi-laptop</v-icon>
                System
              </v-btn>
            </v-btn-toggle>

            <h4 class="text-subtitle-1 font-weight-medium mb-4">Accent Color</h4>
            <div class="d-flex ga-2 mb-6">
              <v-avatar
                v-for="color in accentColors"
                :key="color"
                :color="color"
                size="40"
                class="cursor-pointer"
                :class="{ 'border-2 border-black': appearance.accentColor === color }"
                @click="appearance.accentColor = color"
              >
                <v-icon v-if="appearance.accentColor === color" color="white" size="small">mdi-check</v-icon>
              </v-avatar>
            </div>

            <h4 class="text-subtitle-1 font-weight-medium mb-4">Font Size</h4>
            <v-slider
              v-model="appearance.fontSize"
              :min="12"
              :max="20"
              :step="1"
              thumb-label
              show-ticks="always"
              class="mb-6"
            />

            <v-switch
              v-model="appearance.reducedMotion"
              label="Reduce motion"
              color="primary"
            />
          </v-card-text>
        </v-card>

        <!-- Danger Zone -->
        <v-card v-if="activeSection === 'danger'" color="error" variant="outlined">
          <v-card-title class="text-error">Danger Zone</v-card-title>
          <v-card-text>
            <v-alert type="warning" variant="tonal" class="mb-4">
              These actions are irreversible. Please proceed with caution.
            </v-alert>

            <div class="d-flex justify-space-between align-center mb-4 pa-4 rounded border">
              <div>
                <p class="font-weight-medium mb-1">Delete Account</p>
                <p class="text-caption text-medium-emphasis mb-0">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <v-btn color="error" variant="outlined">Delete Account</v-btn>
            </div>

            <div class="d-flex justify-space-between align-center pa-4 rounded border">
              <div>
                <p class="font-weight-medium mb-1">Export Data</p>
                <p class="text-caption text-medium-emphasis mb-0">
                  Download all your data before deleting your account.
                </p>
              </div>
              <v-btn variant="outlined">Export Data</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeSection = ref('profile')

const sections = [
  { title: 'Profile', value: 'profile', icon: 'mdi-account' },
  { title: 'Account', value: 'account', icon: 'mdi-cog' },
  { title: 'Notifications', value: 'notifications', icon: 'mdi-bell' },
  { title: 'Security', value: 'security', icon: 'mdi-shield-lock' },
  { title: 'Appearance', value: 'appearance', icon: 'mdi-palette' },
  { title: 'Danger Zone', value: 'danger', icon: 'mdi-alert' },
]

const profile = ref({
  firstName: 'Sarah',
  lastName: 'Johnson',
  email: 'sarah@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Product designer with 5+ years of experience.',
})

const account = ref({
  username: 'sarahjohnson',
  language: 'English',
  timezone: 'UTC-5 (Eastern Time)',
  currency: 'USD ($)',
})

const languages = ['English', 'Spanish', 'French', 'German', 'Japanese']
const timezones = ['UTC-8 (Pacific)', 'UTC-5 (Eastern)', 'UTC+0 (London)', 'UTC+1 (Paris)', 'UTC+9 (Tokyo)']
const currencies = ['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)']

const emailNotifications = ref([
  { title: 'Marketing emails', description: 'Receive emails about new products and features', enabled: true },
  { title: 'Security alerts', description: 'Get notified about suspicious activity', enabled: true },
  { title: 'Weekly digest', description: 'Summary of your account activity', enabled: false },
])

const pushNotifications = ref([
  { title: 'New messages', description: 'Notify when you receive new messages', enabled: true },
  { title: 'Mentions', description: 'Notify when someone mentions you', enabled: true },
  { title: 'Reminders', description: 'Task and event reminders', enabled: true },
])

const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const sessions = [
  { id: 1, device: 'Chrome on MacOS', location: 'San Francisco, CA', time: 'Now', icon: 'mdi-laptop', current: true },
  { id: 2, device: 'Safari on iPhone', location: 'San Francisco, CA', time: '2 hours ago', icon: 'mdi-cellphone', current: false },
  { id: 3, device: 'Firefox on Windows', location: 'New York, NY', time: '2 days ago', icon: 'mdi-laptop', current: false },
]

const appearance = ref({
  theme: 'system',
  accentColor: '#6366F1',
  fontSize: 14,
  reducedMotion: false,
})

const accentColors = ['#6366F1', '#EC4899', '#22C55E', '#F59E0B', '#EF4444', '#3B82F6']
</script>
