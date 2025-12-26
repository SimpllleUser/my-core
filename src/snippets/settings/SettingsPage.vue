<!--
  Snippet: Settings Page
  Description: User settings page with tabs and form controls
  Components: VTabs, VCard, VSwitch, VSelect, VTextField, VBtn
  Variants: Tabbed layout, Account settings, Notifications, Security
-->
<template>
  <VContainer>
    <h1 class="text-h4 font-weight-bold mb-6">Settings</h1>

    <VRow>
      <!-- Sidebar Navigation -->
      <VCol cols="12" md="3">
        <VCard>
          <VList nav density="compact">
            <VListItem
              v-for="section in sections"
              :key="section.value"
              :prepend-icon="section.icon"
              :title="section.title"
              :active="activeSection === section.value"
              rounded="lg"
              @click="activeSection = section.value"
            />
          </VList>
        </VCard>
      </VCol>

      <!-- Settings Content -->
      <VCol cols="12" md="9">
        <!-- Profile Settings -->
        <VCard v-if="activeSection === 'profile'" class="mb-4">
          <VCardTitle>Profile Information</VCardTitle>
          <VCardText>
            <div class="d-flex align-center mb-6">
              <VAvatar size="80" class="mr-4">
                <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
              </VAvatar>
              <div>
                <VBtn variant="outlined" size="small" class="mr-2">Change Photo</VBtn>
                <VBtn variant="text" size="small" color="error">Remove</VBtn>
                <p class="text-caption text-medium-emphasis mt-2 mb-0">
                  JPG, GIF or PNG. Max size 2MB
                </p>
              </div>
            </div>

            <VRow>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="profile.firstName"
                  label="First Name"
                  variant="outlined"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="profile.lastName"
                  label="Last Name"
                  variant="outlined"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="profile.email"
                  label="Email"
                  type="email"
                  variant="outlined"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="profile.phone"
                  label="Phone"
                  variant="outlined"
                />
              </VCol>
              <VCol cols="12">
                <VTextarea
                  v-model="profile.bio"
                  label="Bio"
                  variant="outlined"
                  rows="3"
                />
              </VCol>
            </VRow>
          </VCardText>
          <VCardActions class="pa-4 pt-0">
            <VSpacer />
            <VBtn variant="text">Cancel</VBtn>
            <VBtn color="primary">Save Changes</VBtn>
          </VCardActions>
        </VCard>

        <!-- Account Settings -->
        <VCard v-if="activeSection === 'account'" class="mb-4">
          <VCardTitle>Account Settings</VCardTitle>
          <VCardText>
            <VRow>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="account.username"
                  label="Username"
                  variant="outlined"
                  prepend-inner-icon="mdi-at"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VSelect
                  v-model="account.language"
                  :items="languages"
                  label="Language"
                  variant="outlined"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VSelect
                  v-model="account.timezone"
                  :items="timezones"
                  label="Timezone"
                  variant="outlined"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VSelect
                  v-model="account.currency"
                  :items="currencies"
                  label="Currency"
                  variant="outlined"
                />
              </VCol>
            </VRow>
          </VCardText>
          <VCardActions class="pa-4 pt-0">
            <VSpacer />
            <VBtn variant="text">Cancel</VBtn>
            <VBtn color="primary">Save Changes</VBtn>
          </VCardActions>
        </VCard>

        <!-- Notifications Settings -->
        <VCard v-if="activeSection === 'notifications'" class="mb-4">
          <VCardTitle>Notification Preferences</VCardTitle>
          <VCardText>
            <VList>
              <VList-subheader>Email Notifications</v-list-subheader>
              <VListItem v-for="item in emailNotifications" :key="item.title">
                <VListItemTitle>{{ item.title }}</VListItemTitle>
                <VListItemSubtitle>{{ item.description }}</VListItemSubtitle>
                <template #append>
                  <VSwitch v-model="item.enabled" color="primary" hide-details />
                </template>
              </VListItem>

              <VDivider class="my-4" />

              <VList-subheader>Push Notifications</v-list-subheader>
              <VListItem v-for="item in pushNotifications" :key="item.title">
                <VListItemTitle>{{ item.title }}</VListItemTitle>
                <VListItemSubtitle>{{ item.description }}</VListItemSubtitle>
                <template #append>
                  <VSwitch v-model="item.enabled" color="primary" hide-details />
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>

        <!-- Security Settings -->
        <VCard v-if="activeSection === 'security'" class="mb-4">
          <VCardTitle>Security</VCardTitle>
          <VCardText>
            <h4 class="text-subtitle-1 font-weight-medium mb-4">Change Password</h4>
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="security.currentPassword"
                  label="Current Password"
                  type="password"
                  variant="outlined"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="security.newPassword"
                  label="New Password"
                  type="password"
                  variant="outlined"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <VTextField
                  v-model="security.confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                />
              </VCol>
            </VRow>
            <VBtn color="primary" class="mb-8">Update Password</VBtn>

            <VDivider class="mb-6" />

            <h4 class="text-subtitle-1 font-weight-medium mb-4">Two-Factor Authentication</h4>
            <v-alert type="warning" variant="tonal" class="mb-4">
              Two-factor authentication adds an extra layer of security to your account.
            </v-alert>
            <VBtn variant="outlined">Enable 2FA</VBtn>

            <VDivider class="my-6" />

            <h4 class="text-subtitle-1 font-weight-medium mb-4">Active Sessions</h4>
            <VList density="compact">
              <VListItem v-for="session in sessions" :key="session.id">
                <template #prepend>
                  <VIcon>{{ session.icon }}</VIcon>
                </template>
                <VListItemTitle>{{ session.device }}</VListItemTitle>
                <VListItemSubtitle>{{ session.location }} • {{ session.time }}</VListItemSubtitle>
                <template #append>
                  <VChip v-if="session.current" color="success" size="small">Current</VChip>
                  <VBtn v-else variant="text" size="small" color="error">Revoke</VBtn>
                </template>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>

        <!-- Appearance Settings -->
        <VCard v-if="activeSection === 'appearance'">
          <VCardTitle>Appearance</VCardTitle>
          <VCardText>
            <h4 class="text-subtitle-1 font-weight-medium mb-4">Theme</h4>
            <VBtnToggle v-model="appearance.theme" mandatory class="mb-6">
              <VBtn value="light">
                <VIcon start>mdi-white-balance-sunny</VIcon>
                Light
              </VBtn>
              <VBtn value="dark">
                <VIcon start>mdi-moon-waning-crescent</VIcon>
                Dark
              </VBtn>
              <VBtn value="system">
                <VIcon start>mdi-laptop</VIcon>
                System
              </VBtn>
            </VBtnToggle>

            <h4 class="text-subtitle-1 font-weight-medium mb-4">Accent Color</h4>
            <div class="d-flex ga-2 mb-6">
              <VAvatar
                v-for="color in accentColors"
                :key="color"
                :color="color"
                size="40"
                class="cursor-pointer"
                :class="{ 'border-2 border-black': appearance.accentColor === color }"
                @click="appearance.accentColor = color"
              >
                <VIcon v-if="appearance.accentColor === color" color="white" size="small">mdi-check</VIcon>
              </VAvatar>
            </div>

            <h4 class="text-subtitle-1 font-weight-medium mb-4">Font Size</h4>
            <VSlider
              v-model="appearance.fontSize"
              :min="12"
              :max="20"
              :step="1"
              thumb-label
              show-ticks="always"
              class="mb-6"
            />

            <VSwitch
              v-model="appearance.reducedMotion"
              label="Reduce motion"
              color="primary"
            />
          </VCardText>
        </VCard>

        <!-- Danger Zone -->
        <VCard v-if="activeSection === 'danger'" color="error" variant="outlined">
          <VCardTitle class="text-error">Danger Zone</VCardTitle>
          <VCardText>
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
              <VBtn color="error" variant="outlined">Delete Account</VBtn>
            </div>

            <div class="d-flex justify-space-between align-center pa-4 rounded border">
              <div>
                <p class="font-weight-medium mb-1">Export Data</p>
                <p class="text-caption text-medium-emphasis mb-0">
                  Download all your data before deleting your account.
                </p>
              </div>
              <VBtn variant="outlined">Export Data</VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
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
