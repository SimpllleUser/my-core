<!--
  Snippet: Message Types (Medium)
  Description: Various message types including text, images, files, voice, and reactions
  Components: VCard, VAvatar, VImg, VProgressLinear, VChip
  Complexity: Medium
-->
<template>
  <div class="pa-4">
    <!-- Text Message -->
    <div class="d-flex mb-4">
      <VAvatar size="36" class="mr-2 mt-1">
        <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
      </VAvatar>
      <div style="max-width: 70%;">
        <VCard color="grey-lighten-4" class="pa-3 rounded-xl rounded-ts-0">
          <p class="text-body-2 mb-0">Hey! Check out this photo from our trip!</p>
        </VCard>
        <span class="text-caption text-medium-emphasis">10:30 AM</span>
      </div>
    </div>

    <!-- Image Message -->
    <div class="d-flex mb-4">
      <VAvatar size="36" class="mr-2 mt-1">
        <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
      </VAvatar>
      <div style="max-width: 70%;">
        <VCard class="rounded-xl rounded-ts-0 overflow-hidden" width="280">
          <VImg
            src="https://picsum.photos/seed/chat/400/300"
            aspect-ratio="1.33"
            cover
            class="cursor-pointer"
          />
        </VCard>
        <span class="text-caption text-medium-emphasis">10:31 AM</span>
      </div>
    </div>

    <!-- Image with Caption -->
    <div class="d-flex justify-end mb-4">
      <div class="d-flex flex-column align-end" style="max-width: 70%;">
        <VCard color="primary" class="rounded-xl rounded-te-0 overflow-hidden" width="280">
          <VImg
            src="https://picsum.photos/seed/chat2/400/300"
            aspect-ratio="1.33"
            cover
          />
          <div class="pa-3">
            <p class="text-body-2 text-white mb-0">Look at this amazing view!</p>
          </div>
        </VCard>
        <span class="text-caption text-medium-emphasis">10:32 AM</span>
      </div>
    </div>

    <!-- File/Document Message -->
    <div class="d-flex mb-4">
      <VAvatar size="36" class="mr-2 mt-1">
        <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
      </VAvatar>
      <div style="max-width: 70%;">
        <VCard color="grey-lighten-4" class="pa-3 rounded-xl rounded-ts-0">
          <div class="d-flex align-center">
            <VAvatar color="error" size="40" rounded="lg" class="mr-3">
              <VIcon color="white">{{ Icons.FilePdf }}</VIcon>
            </VAvatar>
            <div class="flex-grow-1 mr-3">
              <p class="text-body-2 font-weight-medium mb-0">Project_Proposal.pdf</p>
              <p class="text-caption text-medium-emphasis mb-0">2.4 MB</p>
            </div>
            <VBtn icon size="small" variant="text">
              <VIcon>{{ Icons.Download }}</VIcon>
            </VBtn>
          </div>
        </VCard>
        <span class="text-caption text-medium-emphasis">10:35 AM</span>
      </div>
    </div>

    <!-- Voice Message -->
    <div class="d-flex justify-end mb-4">
      <div class="d-flex flex-column align-end" style="max-width: 70%;">
        <VCard color="primary" class="pa-3 rounded-xl rounded-te-0" width="240">
          <div class="d-flex align-center">
            <VBtn icon size="small" variant="text" color="white">
              <VIcon>{{ Icons.Play }}</VIcon>
            </VBtn>
            <div class="flex-grow-1 mx-2">
              <div class="d-flex align-center ga-1" style="height: 24px;">
                <div
                  v-for="i in 20"
                  :key="i"
                  class="bg-white rounded"
                  :style="{
                    width: '3px',
                    height: `${Math.random() * 16 + 8}px`,
                    opacity: 0.7
                  }"
                />
              </div>
            </div>
            <span class="text-caption text-white">0:32</span>
          </div>
        </VCard>
        <span class="text-caption text-medium-emphasis">10:40 AM</span>
      </div>
    </div>

    <!-- Link Preview -->
    <div class="d-flex mb-4">
      <VAvatar size="36" class="mr-2 mt-1">
        <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
      </VAvatar>
      <div style="max-width: 70%;">
        <VCard color="grey-lighten-4" class="rounded-xl rounded-ts-0 overflow-hidden" width="300">
          <VImg src="https://picsum.photos/seed/link/400/200" height="120" cover />
          <div class="pa-3">
            <p class="text-caption text-primary mb-1">example.com</p>
            <p class="text-body-2 font-weight-medium mb-1">Amazing Article Title</p>
            <p class="text-caption text-medium-emphasis mb-0">
              A brief description of the linked content...
            </p>
          </div>
        </VCard>
        <span class="text-caption text-medium-emphasis">10:45 AM</span>
      </div>
    </div>

    <!-- Location Message -->
    <div class="d-flex justify-end mb-4">
      <div class="d-flex flex-column align-end" style="max-width: 70%;">
        <VCard class="rounded-xl rounded-te-0 overflow-hidden" width="280">
          <div class="bg-primary-lighten-4 pa-6 text-center">
            <VIcon size="48" color="primary">{{ Icons.MapMarker }}</VIcon>
          </div>
          <div class="pa-3 bg-primary">
            <p class="text-body-2 text-white font-weight-medium mb-0">
              <VIcon size="14" class="mr-1">{{ Icons.MapMarker }}</VIcon>
              Central Park, New York
            </p>
            <p class="text-caption text-white mb-0" style="opacity: 0.8">
              Tap to open in Maps
            </p>
          </div>
        </VCard>
        <span class="text-caption text-medium-emphasis">10:50 AM</span>
      </div>
    </div>

    <!-- Message with Reactions -->
    <div class="d-flex mb-4">
      <VAvatar size="36" class="mr-2 mt-1">
        <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
      </VAvatar>
      <div style="max-width: 70%;">
        <div class="position-relative">
          <VCard color="grey-lighten-4" class="pa-3 rounded-xl rounded-ts-0">
            <p class="text-body-2 mb-0">Great news! The project was approved!</p>
          </VCard>
          <div class="position-absolute d-flex ga-1" style="bottom: -10px; left: 12px;">
            <VChip size="x-small" variant="elevated">🎉 3</VChip>
            <VChip size="x-small" variant="elevated">👍 2</VChip>
            <VChip size="x-small" variant="elevated">❤️ 1</VChip>
          </div>
        </div>
        <span class="text-caption text-medium-emphasis mt-3 d-block">11:00 AM</span>
      </div>
    </div>

    <!-- Reply Message -->
    <div class="d-flex justify-end mb-4 mt-6">
      <div class="d-flex flex-column align-end" style="max-width: 70%;">
        <VCard color="primary" class="rounded-xl rounded-te-0 overflow-hidden">
          <div class="px-3 pt-2 pb-1 bg-primary-darken-1 border-s-4" style="border-color: white !important;">
            <p class="text-caption text-white mb-0" style="opacity: 0.8;">Emily</p>
            <p class="text-body-2 text-white mb-0" style="opacity: 0.9;">Great news! The project was approved!</p>
          </div>
          <div class="pa-3">
            <p class="text-body-2 text-white mb-0">That's amazing! Congratulations to the team!</p>
          </div>
        </VCard>
        <span class="text-caption text-medium-emphasis">11:02 AM</span>
      </div>
    </div>

    <!-- Contact Card -->
    <div class="d-flex mb-4">
      <VAvatar size="36" class="mr-2 mt-1">
        <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
      </VAvatar>
      <div style="max-width: 70%;">
        <VCard color="grey-lighten-4" class="pa-3 rounded-xl rounded-ts-0" width="220">
          <div class="d-flex align-center mb-3">
            <VAvatar size="48" class="mr-3">
              <VImg src="https://randomuser.me/api/portraits/men/32.jpg" />
            </VAvatar>
            <div>
              <p class="text-body-2 font-weight-medium mb-0">Michael Brown</p>
              <p class="text-caption text-medium-emphasis mb-0">Developer</p>
            </div>
          </div>
          <VBtn color="primary" block variant="tonal" size="small">
            <VIcon start size="16">{{ Icons.AccountPlus }}</VIcon>
            Add Contact
          </VBtn>
        </VCard>
        <span class="text-caption text-medium-emphasis">11:10 AM</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'
</script>
