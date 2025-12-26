<!--
  Snippet: User Profile Card
  Description: User profile cards with avatar, info, and actions
  Components: VCard, VAvatar, VBtn, VChip, VDivider, VList
  Variants: Simple, Detailed, Horizontal, Social
-->
<template>
  <VContainer fluid>
    <h2 class="text-h5 font-weight-bold mb-6">User Profile Card Variants</h2>

    <VRow>
      <!-- Simple Profile Card -->
      <VCol cols="12" sm="6" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Simple</h3>
        <VCard class="text-center pa-6">
          <VAvatar size="100" class="mb-4">
            <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
          </VAvatar>
          <h3 class="text-h6 font-weight-bold mb-1">Sarah Johnson</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">Product Designer</p>
          <div class="d-flex justify-center ga-2">
            <VBtn color="primary" size="small">Follow</VBtn>
            <VBtn variant="outlined" size="small">Message</VBtn>
          </div>
        </VCard>
      </VCol>

      <!-- Detailed Profile Card -->
      <VCol cols="12" sm="6" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Detailed</h3>
        <VCard>
          <VImg
            src="https://picsum.photos/seed/cover/400/150"
            height="120"
            cover
          />
          <VCardText class="text-center" style="margin-top: -50px;">
            <VAvatar size="100" class="border-4 border-white">
              <VImg src="https://randomuser.me/api/portraits/men/32.jpg" />
            </VAvatar>
            <h3 class="text-h6 font-weight-bold mt-3 mb-1">Michael Chen</h3>
            <p class="text-body-2 text-medium-emphasis mb-2">Full Stack Developer</p>
            <div class="d-flex justify-center ga-1 mb-4">
              <VChip size="small" color="primary" variant="tonal">Vue.js</VChip>
              <VChip size="small" color="success" variant="tonal">Node.js</VChip>
              <VChip size="small" color="warning" variant="tonal">Python</VChip>
            </div>

            <VRow class="text-center mb-4">
              <VCol>
                <div class="text-h6 font-weight-bold">1.2K</div>
                <div class="text-caption text-medium-emphasis">Followers</div>
              </VCol>
              <VCol>
                <div class="text-h6 font-weight-bold">847</div>
                <div class="text-caption text-medium-emphasis">Following</div>
              </VCol>
              <VCol>
                <div class="text-h6 font-weight-bold">56</div>
                <div class="text-caption text-medium-emphasis">Projects</div>
              </VCol>
            </VRow>

            <VBtn color="primary" block>View Profile</VBtn>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Card with Stats -->
      <VCol cols="12" sm="6" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">With Stats</h3>
        <VCard>
          <VCardText class="text-center pt-6">
            <VBadge
              color="success"
              dot
              location="bottom right"
              offset-x="3"
              offset-y="3"
            >
              <VAvatar size="80">
                <VImg src="https://randomuser.me/api/portraits/women/65.jpg" />
              </VAvatar>
            </VBadge>
            <h3 class="text-h6 font-weight-bold mt-4 mb-1">Emma Wilson</h3>
            <p class="text-body-2 text-medium-emphasis">Marketing Manager</p>
            <p class="text-caption text-medium-emphasis mb-4">
              <VIcon size="small">mdi-map-marker</VIcon>
              San Francisco, CA
            </p>
          </VCardText>

          <VDivider />

          <VCardText>
            <VList density="compact" class="bg-transparent">
              <VListItem>
                <template #prepend>
                  <VIcon color="primary">mdi-email</VIcon>
                </template>
                <VListItemTitle>emma@company.com</VListItemTitle>
              </VListItem>
              <VListItem>
                <template #prepend>
                  <VIcon color="primary">mdi-phone</VIcon>
                </template>
                <VListItemTitle>+1 (555) 123-4567</VListItemTitle>
              </VListItem>
              <VListItem>
                <template #prepend>
                  <VIcon color="primary">mdi-calendar</VIcon>
                </template>
                <VListItemTitle>Joined March 2022</VListItemTitle>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Horizontal Profile Card -->
      <VCol cols="12" md="6">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Horizontal</h3>
        <VCard>
          <VRow no-gutters>
            <VCol cols="auto" class="d-flex align-center pa-4">
              <VAvatar size="100">
                <VImg src="https://randomuser.me/api/portraits/men/45.jpg" />
              </VAvatar>
            </VCol>
            <VCol>
              <VCardText>
                <div class="d-flex justify-space-between align-start">
                  <div>
                    <h3 class="text-h6 font-weight-bold">David Rodriguez</h3>
                    <p class="text-body-2 text-medium-emphasis mb-2">Senior Software Engineer at TechCorp</p>
                    <div class="d-flex align-center ga-2 text-caption text-medium-emphasis mb-3">
                      <span><VIcon size="small">mdi-map-marker</VIcon> New York</span>
                      <span><VIcon size="small">mdi-link</VIcon> davidr.dev</span>
                    </div>
                  </div>
                  <VBtn icon="mdi-dots-vertical" variant="text" size="small" />
                </div>
                <p class="text-body-2 mb-4">
                  Passionate about building scalable applications and mentoring junior developers.
                  Open source contributor and tech speaker.
                </p>
                <div class="d-flex ga-2">
                  <VBtn color="primary" size="small">Connect</VBtn>
                  <VBtn variant="outlined" size="small">Message</VBtn>
                </div>
              </VCardText>
            </VCol>
          </VRow>
        </VCard>
      </VCol>

      <!-- Social Profile Card -->
      <VCol cols="12" md="6">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Social</h3>
        <VCard>
          <VImg
            src="https://picsum.photos/seed/social/600/200"
            height="150"
            cover
            class="d-flex align-end"
          >
            <div class="pa-4 w-100" style="background: linear-gradient(transparent, rgba(0,0,0,0.7));">
              <div class="d-flex align-center">
                <VAvatar size="80" class="border-3 border-white">
                  <VImg src="https://randomuser.me/api/portraits/women/28.jpg" />
                </VAvatar>
                <div class="ml-4">
                  <h3 class="text-h6 font-weight-bold text-white">Lisa Anderson</h3>
                  <p class="text-body-2 text-white-darken-1">@lisaanderson</p>
                </div>
              </div>
            </div>
          </VImg>

          <VCardText>
            <p class="text-body-2 mb-4">
              Travel enthusiast | Coffee lover ☕ | Photographer 📸
              Sharing my adventures around the world one photo at a time.
            </p>

            <VRow class="text-center mb-4">
              <VCol>
                <div class="text-h6 font-weight-bold">12.5K</div>
                <div class="text-caption text-medium-emphasis">Posts</div>
              </VCol>
              <VCol>
                <div class="text-h6 font-weight-bold">458K</div>
                <div class="text-caption text-medium-emphasis">Followers</div>
              </VCol>
              <VCol>
                <div class="text-h6 font-weight-bold">892</div>
                <div class="text-caption text-medium-emphasis">Following</div>
              </VCol>
            </VRow>

            <div class="d-flex justify-center ga-2">
              <VBtn icon color="primary" variant="tonal">
                <VIcon>mdi-twitter</VIcon>
              </VBtn>
              <VBtn icon color="pink" variant="tonal">
                <VIcon>mdi-instagram</VIcon>
              </VBtn>
              <VBtn icon color="blue" variant="tonal">
                <VIcon>mdi-facebook</VIcon>
              </VBtn>
              <VBtn icon color="red" variant="tonal">
                <VIcon>mdi-youtube</VIcon>
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Team Member Cards -->
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Team Members</h3>
        <VRow>
          <VCol v-for="member in teamMembers" :key="member.name" cols="12" sm="6" md="3">
            <VCard hover>
              <VCardText class="text-center pa-6">
                <VAvatar size="80" class="mb-4">
                  <VImg :src="member.avatar" />
                </VAvatar>
                <h4 class="text-subtitle-1 font-weight-bold">{{ member.name }}</h4>
                <p class="text-caption text-medium-emphasis mb-3">{{ member.role }}</p>
                <div class="d-flex justify-center ga-1">
                  <VBtn icon size="x-small" variant="text">
                    <VIcon size="18">mdi-twitter</VIcon>
                  </VBtn>
                  <VBtn icon size="x-small" variant="text">
                    <VIcon size="18">mdi-linkedin</VIcon>
                  </VBtn>
                  <VBtn icon size="x-small" variant="text">
                    <VIcon size="18">mdi-github</VIcon>
                  </VBtn>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
const teamMembers = [
  { name: 'John Doe', role: 'CEO & Founder', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Jane Smith', role: 'CTO', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Mike Johnson', role: 'Lead Designer', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { name: 'Emily Davis', role: 'Marketing Head', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
]
</script>
