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
          <VIcon icon="mdi-post" size="large" color="indigo" class="mr-2" />
          Blog
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Blog post cards, article views, listings, and comment sections
        </p>
      </VCol>
    </VRow>

    <!-- Blog Post Cards -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-card-text" class="mr-2" />
            Blog Post Cards
            <VSpacer />
            <VChip color="indigo" size="small">BlogCard, SectionHeader, VCard</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Blog post cards with various layouts and styles</p>
            <BlogPostCards />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Blog List -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-format-list-bulleted" class="mr-2" />
            Blog List
            <VSpacer />
            <VChip color="indigo" size="small">BlogCard, VCard, VPagination</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Blog post listings with filters and pagination</p>
            <BlogList />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Article View -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-file-document" class="mr-2" />
            Article View
            <VSpacer />
            <VChip color="indigo" size="small">SectionHeader, VCard, VImg</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Full blog article page with author info and related posts</p>
            <ArticleView />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Comment Section -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-comment-multiple" class="mr-2" />
            Comment Section
            <VSpacer />
            <VChip color="indigo" size="small">VCard, VList, VTextarea</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Blog comments with replies and voting functionality</p>
            <CommentSection />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  BlogPostCards,
  BlogList,
  ArticleView,
  CommentSection
} from '@/snippets'
</script>
