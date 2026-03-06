<!--
  Snippet: Empty State Examples
  Description: Empty/no-data placeholder states with icons, illustrations, and CTAs
  Components: EmptyState, VRow, VCol
  Variants: No Results, No Data, Permission Denied, Loading Done
-->
<script setup lang="ts">
import { Icons } from '../../shared/model'
import { EmptyState } from '../../shared/ui/snippets'
</script>
<template>
  <VContainer>
    <VRow>
      <!-- No search results -->
      <VCol cols="12" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">No search results</h3>
        <VCard variant="outlined" height="320">
          <EmptyState
            :icon="Icons.Search"
            icon-bg-color="grey-lighten-3"
            icon-color="grey-darken-1"
            title="No results found"
            subtitle="Try adjusting your search or filters to find what you're looking for."
            :ctas="[{ text: 'Clear filters', color: 'primary', variant: 'tonal' }]"
            height="320"
          />
        </VCard>
      </VCol>

      <!-- Empty inbox -->
      <VCol cols="12" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Empty inbox</h3>
        <VCard variant="outlined" height="320">
          <EmptyState
            :icon="Icons.EmailOpen"
            icon-bg-color="primary-lighten-4"
            icon-color="primary"
            title="All caught up!"
            subtitle="You have no new messages. Enjoy the peace and quiet."
            height="320"
          />
        </VCard>
      </VCol>

      <!-- No notifications -->
      <VCol cols="12" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">No notifications</h3>
        <VCard variant="outlined" height="320">
          <EmptyState
            :icon="Icons.BellOff"
            icon-bg-color="orange-lighten-4"
            icon-color="orange-darken-2"
            title="No notifications"
            subtitle="When you have new activity, it will appear here."
            height="320"
          />
        </VCard>
      </VCol>

      <!-- Create first item -->
      <VCol cols="12" md="6">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Create first item</h3>
        <VCard variant="outlined" height="280">
          <EmptyState
            :icon="Icons.FolderPlus"
            icon-bg-color="success-lighten-4"
            icon-color="success"
            title="No projects yet"
            subtitle="Create your first project to get started with the platform."
            :ctas="[
              { text: 'Create project', color: 'success', variant: 'elevated', icon: Icons.Plus, iconPosition: 'start' },
              { text: 'Learn more', color: 'primary', variant: 'text' }
            ]"
            height="280"
          />
        </VCard>
      </VCol>

      <!-- Access denied -->
      <VCol cols="12" md="6">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Access denied</h3>
        <VCard variant="outlined" height="280">
          <EmptyState
            :icon="Icons.ShieldLock"
            icon-bg-color="error-lighten-4"
            icon-color="error"
            title="Access restricted"
            subtitle="You don't have permission to view this content. Contact your admin."
            :ctas="[{ text: 'Go back', color: 'error', variant: 'tonal', icon: Icons.ArrowLeft, iconPosition: 'start' }]"
            height="280"
          />
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
