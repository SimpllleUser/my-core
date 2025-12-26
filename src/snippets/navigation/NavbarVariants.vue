<!--
  Snippet: Navbar Variants
  Description: Various navigation bar styles
  Components: VAppBar, VToolbar, VBtn, VMenu, VList, VTextField
  Variants: Simple, With Search, With User Menu, Transparent
-->
<template>
  <div>
    <!-- Variant 1: Simple Navbar -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Simple Navbar</h3>
    <VAppBar color="primary" class="mb-8" flat>
      <VAppBar-nav-icon />
      <VAppBar-title>My Application</v-app-bar-title>
      <VSpacer />
      <VBtn variant="text">Features</VBtn>
      <VBtn variant="text">Pricing</VBtn>
      <VBtn variant="text">About</VBtn>
      <VBtn variant="outlined" class="ml-2">Sign In</VBtn>
    </VAppBar>

    <!-- Variant 2: Navbar with Search -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">With Search</h3>
    <VAppBar class="mb-8" flat border="b">
      <VAppBar-nav-icon />
      <VAppBar-title>
        <span class="font-weight-bold">Brand</span>
      </v-app-bar-title>

      <VTextField
        density="compact"
        variant="solo-filled"
        flat
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Search..."
        class="mx-4"
        style="max-width: 400px;"
      />

      <VSpacer />

      <VBtn icon>
        <VBadge content="3" color="error">
          <VIcon>mdi-bell</VIcon>
        </VBadge>
      </VBtn>
      <VBtn icon class="ml-2">
        <VAvatar size="32">
          <VImg src="https://randomuser.me/api/portraits/men/1.jpg" />
        </VAvatar>
      </VBtn>
    </VAppBar>

    <!-- Variant 3: Full Navbar with Mega Menu -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">With Mega Menu</h3>
    <VAppBar class="mb-8" flat border="b">
      <VContainer class="d-flex align-center">
        <VAvatar color="primary" size="36" class="mr-2">
          <VIcon>mdi-hexagon</VIcon>
        </VAvatar>
        <span class="text-h6 font-weight-bold mr-8">TechCo</span>

        <VMenu open-on-hover>
          <template #activator="{ props }">
            <VBtn variant="text" v-bind="props">
              Products
              <VIcon end>mdi-chevron-down</VIcon>
            </VBtn>
          </template>
          <VCard min-width="600">
            <VCardText>
              <VRow>
                <VCol v-for="category in megaMenuItems" :key="category.title" cols="4">
                  <h4 class="text-subtitle-2 font-weight-bold mb-2">{{ category.title }}</h4>
                  <VList density="compact" class="bg-transparent">
                    <VListItem
                      v-for="item in category.items"
                      :key="item"
                      :title="item"
                      class="px-0"
                    />
                  </VList>
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VMenu>

        <VBtn variant="text">Solutions</VBtn>
        <VBtn variant="text">Resources</VBtn>
        <VBtn variant="text">Pricing</VBtn>

        <VSpacer />

        <VBtn variant="text">Sign In</VBtn>
        <VBtn color="primary" class="ml-2">Get Started</VBtn>
      </VContainer>
    </VAppBar>

    <!-- Variant 4: User Profile Navbar -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">With User Profile</h3>
    <VAppBar class="mb-8" flat border="b" color="surface">
      <VAppBar-nav-icon />
      <VAppBar-title>Dashboard</v-app-bar-title>
      <VSpacer />

      <VBtn icon class="mr-2">
        <VIcon>mdi-magnify</VIcon>
      </VBtn>

      <VBtn icon class="mr-2">
        <VBadge content="5" color="error">
          <VIcon>mdi-bell-outline</VIcon>
        </VBadge>
      </VBtn>

      <VBtn icon class="mr-2">
        <VBadge content="2" color="primary">
          <VIcon>mdi-email-outline</VIcon>
        </VBadge>
      </VBtn>

      <VDivider vertical class="mx-2" />

      <VMenu>
        <template #activator="{ props }">
          <VBtn variant="text" v-bind="props" class="text-none">
            <VAvatar size="32" class="mr-2">
              <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
            </VAvatar>
            <div class="d-none d-sm-block text-left">
              <div class="text-body-2 font-weight-medium">Sarah Johnson</div>
              <div class="text-caption text-medium-emphasis">Admin</div>
            </div>
            <VIcon end>mdi-chevron-down</VIcon>
          </VBtn>
        </template>
        <VList min-width="200">
          <VListItem prepend-icon="mdi-account" title="My Profile" />
          <VListItem prepend-icon="mdi-cog" title="Settings" />
          <VListItem prepend-icon="mdi-help-circle" title="Help" />
          <VDivider />
          <VListItem prepend-icon="mdi-logout" title="Sign Out" />
        </VList>
      </VMenu>
    </VAppBar>

    <!-- Variant 5: Transparent/Hero Navbar -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Transparent (Hero Style)</h3>
    <div class="position-relative mb-8" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px;">
      <VAppBar color="transparent" flat>
        <VContainer class="d-flex align-center">
          <VAvatar color="white" size="36" class="mr-2">
            <VIcon color="primary">mdi-rocket</VIcon>
          </VAvatar>
          <span class="text-h6 font-weight-bold text-white">Startup</span>

          <VSpacer />

          <VBtn variant="text" class="text-white">Home</VBtn>
          <VBtn variant="text" class="text-white">Features</VBtn>
          <VBtn variant="text" class="text-white">Pricing</VBtn>
          <VBtn variant="text" class="text-white">Contact</VBtn>

          <VBtn variant="outlined" class="text-white ml-4">Login</VBtn>
          <VBtn color="white" class="ml-2">Sign Up</VBtn>
        </VContainer>
      </VAppBar>
      <div style="height: 100px;"></div>
    </div>

    <!-- Variant 6: Bottom Navigation -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Bottom Navigation (Mobile)</h3>
    <VCard class="mx-auto" max-width="400">
      <div style="height: 200px;" class="d-flex align-center justify-center bg-grey-lighten-4">
        <span class="text-medium-emphasis">Content Area</span>
      </div>
      <VBottomNavigation v-model="bottomNav" grow>
        <VBtn value="home">
          <VIcon>mdi-home</VIcon>
          <span>Home</span>
        </VBtn>
        <VBtn value="search">
          <VIcon>mdi-magnify</VIcon>
          <span>Search</span>
        </VBtn>
        <VBtn value="favorites">
          <VBadge content="3" color="error">
            <VIcon>mdi-heart</VIcon>
          </VBadge>
          <span>Favorites</span>
        </VBtn>
        <VBtn value="profile">
          <VIcon>mdi-account</VIcon>
          <span>Profile</span>
        </VBtn>
      </VBottomNavigation>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const bottomNav = ref('home')

const megaMenuItems = [
  { title: 'Platform', items: ['Overview', 'Features', 'Integrations', 'API'] },
  { title: 'Solutions', items: ['Enterprise', 'Small Business', 'Startups', 'Developers'] },
  { title: 'Resources', items: ['Documentation', 'Blog', 'Community', 'Support'] },
]
</script>
