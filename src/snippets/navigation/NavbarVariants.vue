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
    <v-app-bar color="primary" class="mb-8" flat>
      <v-app-bar-nav-icon />
      <v-app-bar-title>My Application</v-app-bar-title>
      <v-spacer />
      <v-btn variant="text">Features</v-btn>
      <v-btn variant="text">Pricing</v-btn>
      <v-btn variant="text">About</v-btn>
      <v-btn variant="outlined" class="ml-2">Sign In</v-btn>
    </v-app-bar>

    <!-- Variant 2: Navbar with Search -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">With Search</h3>
    <v-app-bar class="mb-8" flat border="b">
      <v-app-bar-nav-icon />
      <v-app-bar-title>
        <span class="font-weight-bold">Brand</span>
      </v-app-bar-title>

      <v-text-field
        density="compact"
        variant="solo-filled"
        flat
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Search..."
        class="mx-4"
        style="max-width: 400px;"
      />

      <v-spacer />

      <v-btn icon>
        <v-badge content="3" color="error">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon class="ml-2">
        <v-avatar size="32">
          <v-img src="https://randomuser.me/api/portraits/men/1.jpg" />
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <!-- Variant 3: Full Navbar with Mega Menu -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">With Mega Menu</h3>
    <v-app-bar class="mb-8" flat border="b">
      <v-container class="d-flex align-center">
        <v-avatar color="primary" size="36" class="mr-2">
          <v-icon>mdi-hexagon</v-icon>
        </v-avatar>
        <span class="text-h6 font-weight-bold mr-8">TechCo</span>

        <v-menu open-on-hover>
          <template #activator="{ props }">
            <v-btn variant="text" v-bind="props">
              Products
              <v-icon end>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-card min-width="600">
            <v-card-text>
              <v-row>
                <v-col v-for="category in megaMenuItems" :key="category.title" cols="4">
                  <h4 class="text-subtitle-2 font-weight-bold mb-2">{{ category.title }}</h4>
                  <v-list density="compact" class="bg-transparent">
                    <v-list-item
                      v-for="item in category.items"
                      :key="item"
                      :title="item"
                      class="px-0"
                    />
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-menu>

        <v-btn variant="text">Solutions</v-btn>
        <v-btn variant="text">Resources</v-btn>
        <v-btn variant="text">Pricing</v-btn>

        <v-spacer />

        <v-btn variant="text">Sign In</v-btn>
        <v-btn color="primary" class="ml-2">Get Started</v-btn>
      </v-container>
    </v-app-bar>

    <!-- Variant 4: User Profile Navbar -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">With User Profile</h3>
    <v-app-bar class="mb-8" flat border="b" color="surface">
      <v-app-bar-nav-icon />
      <v-app-bar-title>Dashboard</v-app-bar-title>
      <v-spacer />

      <v-btn icon class="mr-2">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon class="mr-2">
        <v-badge content="5" color="error">
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>

      <v-btn icon class="mr-2">
        <v-badge content="2" color="primary">
          <v-icon>mdi-email-outline</v-icon>
        </v-badge>
      </v-btn>

      <v-divider vertical class="mx-2" />

      <v-menu>
        <template #activator="{ props }">
          <v-btn variant="text" v-bind="props" class="text-none">
            <v-avatar size="32" class="mr-2">
              <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
            </v-avatar>
            <div class="d-none d-sm-block text-left">
              <div class="text-body-2 font-weight-medium">Sarah Johnson</div>
              <div class="text-caption text-medium-emphasis">Admin</div>
            </div>
            <v-icon end>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list min-width="200">
          <v-list-item prepend-icon="mdi-account" title="My Profile" />
          <v-list-item prepend-icon="mdi-cog" title="Settings" />
          <v-list-item prepend-icon="mdi-help-circle" title="Help" />
          <v-divider />
          <v-list-item prepend-icon="mdi-logout" title="Sign Out" />
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Variant 5: Transparent/Hero Navbar -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Transparent (Hero Style)</h3>
    <div class="position-relative mb-8" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px;">
      <v-app-bar color="transparent" flat>
        <v-container class="d-flex align-center">
          <v-avatar color="white" size="36" class="mr-2">
            <v-icon color="primary">mdi-rocket</v-icon>
          </v-avatar>
          <span class="text-h6 font-weight-bold text-white">Startup</span>

          <v-spacer />

          <v-btn variant="text" class="text-white">Home</v-btn>
          <v-btn variant="text" class="text-white">Features</v-btn>
          <v-btn variant="text" class="text-white">Pricing</v-btn>
          <v-btn variant="text" class="text-white">Contact</v-btn>

          <v-btn variant="outlined" class="text-white ml-4">Login</v-btn>
          <v-btn color="white" class="ml-2">Sign Up</v-btn>
        </v-container>
      </v-app-bar>
      <div style="height: 100px;"></div>
    </div>

    <!-- Variant 6: Bottom Navigation -->
    <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Bottom Navigation (Mobile)</h3>
    <v-card class="mx-auto" max-width="400">
      <div style="height: 200px;" class="d-flex align-center justify-center bg-grey-lighten-4">
        <span class="text-medium-emphasis">Content Area</span>
      </div>
      <v-bottom-navigation v-model="bottomNav" grow>
        <v-btn value="home">
          <v-icon>mdi-home</v-icon>
          <span>Home</span>
        </v-btn>
        <v-btn value="search">
          <v-icon>mdi-magnify</v-icon>
          <span>Search</span>
        </v-btn>
        <v-btn value="favorites">
          <v-badge content="3" color="error">
            <v-icon>mdi-heart</v-icon>
          </v-badge>
          <span>Favorites</span>
        </v-btn>
        <v-btn value="profile">
          <v-icon>mdi-account</v-icon>
          <span>Profile</span>
        </v-btn>
      </v-bottom-navigation>
    </v-card>
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
