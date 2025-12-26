<!--
  Snippet: Profile Page
  Description: User profile page with overview and activity
  Components: VCard, VAvatar, VTabs, VList, VChip, VBtn
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <VContainer>
    <!-- Profile Header -->
    <VCard class="mb-6">
      <VImg
        src="https://picsum.photos/seed/cover/1200/300"
        height="200"
        cover
        class="d-flex align-end"
      >
        <div class="w-100 pa-6" style="background: linear-gradient(transparent, rgba(0,0,0,0.7));">
          <div class="d-flex align-end">
            <VAvatar size="120" class="border-4 border-white">
              <VImg src="https://randomuser.me/api/portraits/women/44.jpg" />
            </VAvatar>
            <div class="ml-6 flex-grow-1">
              <h1 class="text-h4 font-weight-bold text-white">Sarah Johnson</h1>
              <p class="text-white-darken-1 mb-2">@sarahjohnson • Product Designer</p>
              <div class="d-flex ga-2">
                <VChip color="white" size="small" variant="flat">
                  <VIcon start size="small">mdi-map-marker</VIcon>
                  San Francisco, CA
                </VChip>
                <VChip color="white" size="small" variant="flat">
                  <VIcon start size="small">mdi-link</VIcon>
                  sarahjohnson.design
                </VChip>
              </div>
            </div>
            <div class="d-flex ga-2">
              <VBtn color="white" variant="flat">
                <VIcon start>mdi-account-plus</VIcon>
                Follow
              </VBtn>
              <VBtn color="white" variant="outlined">
                <VIcon start>mdi-email</VIcon>
                Message
              </VBtn>
            </div>
          </div>
        </div>
      </VImg>

      <VCardText class="pt-0">
        <VRow class="mt-4">
          <VCol cols="12" md="8">
            <p class="text-body-1 mb-4">
              Product designer with 5+ years of experience creating intuitive digital experiences.
              Passionate about user research, interaction design, and building products that matter.
              Currently leading design at TechStartup.
            </p>
            <div class="d-flex ga-2 flex-wrap">
              <VChip v-for="skill in skills" :key="skill" size="small" variant="tonal" color="primary">
                {{ skill }}
              </VChip>
            </div>
          </VCol>
          <VCol cols="12" md="4">
            <VRow class="text-center">
              <VCol>
                <h3 class="text-h5 font-weight-bold">128</h3>
                <p class="text-caption text-medium-emphasis">Projects</p>
              </VCol>
              <VCol>
                <h3 class="text-h5 font-weight-bold">12.5K</h3>
                <p class="text-caption text-medium-emphasis">Followers</p>
              </VCol>
              <VCol>
                <h3 class="text-h5 font-weight-bold">847</h3>
                <p class="text-caption text-medium-emphasis">Following</p>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VRow>
      <!-- Main Content -->
      <VCol cols="12" md="8">
        <VCard>
          <VTabs v-model="tab" color="primary">
            <VTab value="activity">Activity</VTab>
            <VTab value="projects">Projects</VTab>
            <VTab value="posts">Posts</VTab>
          </VTabs>

          <VDivider />

          <VTabs-window v-model="tab">
            <!-- Activity Tab -->
            <VTabs-window-item value="activity">
              <VCardText>
                <VTimeline density="compact" side="end">
                  <VTimeline-item
                    v-for="activity in activities"
                    :key="activity.id"
                    :dot-color="activity.color"
                    size="small"
                  >
                    <template #icon>
                      <VIcon size="16" color="white">{{ activity.icon }}</VIcon>
                    </template>
                    <VCard variant="tonal">
                      <VCardText>
                        <div class="d-flex justify-space-between align-start mb-2">
                          <span class="font-weight-medium">{{ activity.title }}</span>
                          <span class="text-caption text-medium-emphasis">{{ activity.time }}</span>
                        </div>
                        <p class="text-body-2 text-medium-emphasis mb-0">{{ activity.description }}</p>
                      </VCardText>
                    </VCard>
                  </v-timeline-item>
                </VTimeline>
              </VCardText>
            </v-tabs-window-item>

            <!-- Projects Tab -->
            <VTabs-window-item value="projects">
              <VCardText>
                <VRow>
                  <VCol v-for="project in projects" :key="project.id" cols="12" sm="6">
                    <VCard variant="outlined">
                      <VImg :src="project.image" height="150" cover />
                      <VCardText>
                        <h4 class="text-subtitle-1 font-weight-medium mb-1">{{ project.title }}</h4>
                        <p class="text-caption text-medium-emphasis mb-2">{{ project.description }}</p>
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center">
                            <VIcon size="small" class="mr-1">mdi-heart</VIcon>
                            <span class="text-caption">{{ project.likes }}</span>
                            <VIcon size="small" class="ml-3 mr-1">mdi-eye</VIcon>
                            <span class="text-caption">{{ project.views }}</span>
                          </div>
                          <VChip size="x-small" color="primary">{{ project.category }}</VChip>
                        </div>
                      </VCardText>
                    </VCard>
                  </VCol>
                </VRow>
              </VCardText>
            </v-tabs-window-item>

            <!-- Posts Tab -->
            <VTabs-window-item value="posts">
              <VList lines="three">
                <VListItem v-for="post in posts" :key="post.id">
                  <VListItemTitle class="font-weight-medium mb-1">{{ post.title }}</VListItemTitle>
                  <VListItemSubtitle>{{ post.excerpt }}</VListItemSubtitle>
                  <template #append>
                    <div class="text-right">
                      <p class="text-caption text-medium-emphasis mb-1">{{ post.date }}</p>
                      <div class="d-flex align-center">
                        <VIcon size="small" class="mr-1">mdi-heart</VIcon>
                        <span class="text-caption">{{ post.likes }}</span>
                      </div>
                    </div>
                  </template>
                </VListItem>
              </VList>
            </v-tabs-window-item>
          </v-tabs-window>
        </VCard>
      </VCol>

      <!-- Sidebar -->
      <VCol cols="12" md="4">
        <!-- About -->
        <VCard class="mb-4">
          <VCardTitle>About</VCardTitle>
          <VCardText>
            <VList density="compact" class="bg-transparent">
              <VListItem prepend-icon="mdi-briefcase" title="Product Designer" subtitle="TechStartup" />
              <VListItem prepend-icon="mdi-school" title="Stanford University" subtitle="Design & HCI" />
              <VListItem prepend-icon="mdi-calendar" title="Joined" subtitle="March 2020" />
            </VList>
          </VCardText>
        </VCard>

        <!-- Social Links -->
        <VCard class="mb-4">
          <VCardTitle>Connect</VCardTitle>
          <VCardText>
            <div class="d-flex ga-2">
              <VBtn icon variant="tonal" color="primary">
                <VIcon>mdi-twitter</VIcon>
              </VBtn>
              <VBtn icon variant="tonal" color="primary">
                <VIcon>mdi-linkedin</VIcon>
              </VBtn>
              <VBtn icon variant="tonal" color="primary">
                <VIcon>mdi-github</VIcon>
              </VBtn>
              <VBtn icon variant="tonal" color="primary">
                <VIcon>mdi-dribbble</VIcon>
              </VBtn>
            </div>
          </VCardText>
        </VCard>

        <!-- Similar Profiles -->
        <VCard>
          <VCardTitle>Similar Profiles</VCardTitle>
          <VList>
            <VListItem v-for="profile in similarProfiles" :key="profile.name">
              <template #prepend>
                <VAvatar size="40">
                  <VImg :src="profile.avatar" />
                </VAvatar>
              </template>
              <VListItemTitle>{{ profile.name }}</VListItemTitle>
              <VListItemSubtitle>{{ profile.role }}</VListItemSubtitle>
              <template #append>
                <VBtn variant="text" size="small" color="primary">Follow</VBtn>
              </template>
            </VListItem>
          </VList>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('activity')

const skills = ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'Design Systems', 'User Testing']

const activities = [
  { id: 1, title: 'Completed Project: Dashboard Redesign', description: 'Finished the new admin dashboard design with improved UX', time: '2 hours ago', icon: 'mdi-check-circle', color: 'success' },
  { id: 2, title: 'Published Article', description: 'How to create effective design systems', time: '1 day ago', icon: 'mdi-file-document', color: 'primary' },
  { id: 3, title: 'Received Badge', description: 'Top Designer of the Month', time: '3 days ago', icon: 'mdi-medal', color: 'warning' },
  { id: 4, title: 'Joined Team', description: 'Started as Lead Designer at TechStartup', time: '1 week ago', icon: 'mdi-account-group', color: 'info' },
]

const projects = [
  { id: 1, title: 'Dashboard Redesign', description: 'Modern admin dashboard with dark mode', image: 'https://picsum.photos/seed/proj1/400/200', likes: 234, views: 1205, category: 'UI Design' },
  { id: 2, title: 'Mobile Banking App', description: 'iOS app for personal finance', image: 'https://picsum.photos/seed/proj2/400/200', likes: 189, views: 892, category: 'Mobile' },
  { id: 3, title: 'E-commerce Platform', description: 'Full e-commerce design system', image: 'https://picsum.photos/seed/proj3/400/200', likes: 312, views: 1567, category: 'Web Design' },
  { id: 4, title: 'Brand Identity', description: 'Complete brand guidelines', image: 'https://picsum.photos/seed/proj4/400/200', likes: 156, views: 743, category: 'Branding' },
]

const posts = [
  { id: 1, title: 'The Future of Design Systems', excerpt: 'How modern design systems are evolving to meet the demands of complex applications...', date: 'Jan 15, 2024', likes: 234 },
  { id: 2, title: '10 Tips for Better UX Research', excerpt: 'Essential tips for conducting effective user research that drives design decisions...', date: 'Jan 10, 2024', likes: 189 },
  { id: 3, title: 'Designing for Accessibility', excerpt: 'A comprehensive guide to creating inclusive designs that work for everyone...', date: 'Jan 5, 2024', likes: 156 },
]

const similarProfiles = [
  { name: 'Mike Chen', role: 'UX Designer', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Emily Davis', role: 'UI Designer', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
  { name: 'John Smith', role: 'Product Designer', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
]
</script>
