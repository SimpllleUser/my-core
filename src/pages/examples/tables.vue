<template>
  <VContainer fluid class="pa-6">
    <!-- Header -->
    <VRow class="mb-6">
      <VCol cols="12">
        <VBtn
          to="/examples"
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Back to Examples
        </VBtn>
        <h1 class="text-h3 font-weight-bold mb-2">
          <VIcon icon="mdi-table" size="large" color="indigo" class="mr-2" />
          Tables
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Data tables with sorting, filtering, and pagination
        </p>
      </VCol>
    </VRow>

    <!-- Data Table -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-table-large" class="mr-2" />
            Data Table
            <VSpacer />
            <VChip color="indigo" size="small">VDataTable, VTextField, VSelect, VMenu</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Full-featured data table with filtering and sorting</p>
            <DataTable />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Sortable Table -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-table-edit" class="mr-2" />
            Sortable Table
            <VSpacer />
            <VChip color="indigo" size="small">VTable, VChip, VPagination</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Simple sortable table with custom styling</p>
            <SortableTable />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  DataTable,
  SortableTable
} from '@/snippets'
</script>
