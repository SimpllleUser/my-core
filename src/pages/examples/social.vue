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
          <VIcon icon="mdi-share-variant" size="large" color="pink" class="mr-2" />
          Social Media
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Social feeds, stories, profiles, followers, and engagement analytics
        </p>
      </VCol>
    </VRow>

    <!-- Social Feed -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-newspaper-variant" class="mr-2" />
            Social Feed
            <VSpacer />
            <VChip color="pink" size="small">SocialPostCard, VCard, VList</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Social media feed with posts and stories</p>
            <SocialFeed />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Story Carousel -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-play-circle" class="mr-2" />
            Story Carousel
            <VSpacer />
            <VChip color="pink" size="small">VCard, VAvatar, VImg</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Social media stories carousel and viewer</p>
            <StoryCarousel />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Social Profile -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-account-circle" class="mr-2" />
            Social Profile
            <VSpacer />
            <VChip color="pink" size="small">SocialPostCard, VCard, VTabs</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Social media profile page with stats and posts</p>
            <SocialProfile />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Followers List -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-account-group" class="mr-2" />
            Followers List
            <VSpacer />
            <VChip color="pink" size="small">VCard, VList, VAvatar</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">List of followers/following with actions</p>
            <FollowersList />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- Social Stats -->
    <VRow class="mb-8">
      <VCol cols="12">
        <VCard>
          <VCardTitle class="d-flex align-center">
            <VIcon icon="mdi-chart-bar" class="mr-2" />
            Social Stats
            <VSpacer />
            <VChip color="pink" size="small">StatCard, SectionHeader, VCard</VChip>
          </VCardTitle>
          <VCardText>
            <p class="text-body-1 mb-4">Social media analytics and engagement stats</p>
            <SocialStats />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import {
  SocialFeed,
  StoryCarousel,
  SocialProfile,
  FollowersList,
  SocialStats
} from '@/snippets'
</script>
