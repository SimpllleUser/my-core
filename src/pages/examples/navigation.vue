<script setup lang="ts">
import { Icons } from '../../shared/model'
import {
  NavbarVariants,
  Sidebar,
  Breadcrumbs
} from '../../snippets'
</script>
<template>
  <VContainer fluid class="pa-6">
    <!-- Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <VBtn
          to="/examples"
          variant="text"
          :prepend-icon="Icons.ArrowLeft"
          class="mb-4"
        >
          Back to Examples
        </VBtn>
        <h1 class="text-h3 font-weight-bold mb-2">
          <VIcon :icon="Icons.Navigation" size="large" color="cyan" class="mr-2" />
          Navigation
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Navbars, sidebars, breadcrumbs, and other navigation components
        </p>
      </VCol>
    </VRow>

    <!-- Navbar Variants -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.ViewHeadline" class="mr-2" />
            Navbar Variants
            <VSpacer />
            <VChip color="cyan" size="small">VAppBar, VToolbar, VMenu</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Various navbar styles (simple, search, mega menu)</p>
            <NavbarVariants />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Sidebar -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.Menu" class="mr-2" />
            Sidebar
            <VSpacer />
            <VChip color="cyan" size="small">VNavigationDrawer, VList, VListGroup</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Collapsible sidebar with nested menu items</p>
            <Sidebar />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Breadcrumbs -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon :icon="Icons.ChevronRight" class="mr-2" />
            Breadcrumbs
            <VSpacer />
            <VChip color="cyan" size="small">VBreadcrumbs, VTabs</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Breadcrumb navigation styles and variants</p>
            <Breadcrumbs />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
