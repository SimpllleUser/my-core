<!--
  Snippet: Profile Page
  Description: User profile page with overview and activity
  Components: VCard, VAvatar, VTabs, VList, VChip, VBtn
  Variants: Light/Dark (automatic via Vuetify theme)
-->
<template>
  <v-container>
    <!-- Profile Header -->
    <v-card class="mb-6">
      <v-img
        src="https://picsum.photos/seed/cover/1200/300"
        height="200"
        cover
        class="d-flex align-end"
      >
        <div class="w-100 pa-6" style="background: linear-gradient(transparent, rgba(0,0,0,0.7));">
          <div class="d-flex align-end">
            <v-avatar size="120" class="border-4 border-white">
              <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
            </v-avatar>
            <div class="ml-6 flex-grow-1">
              <h1 class="text-h4 font-weight-bold text-white">Sarah Johnson</h1>
              <p class="text-white-darken-1 mb-2">@sarahjohnson • Product Designer</p>
              <div class="d-flex ga-2">
                <v-chip color="white" size="small" variant="flat">
                  <v-icon start size="small">mdi-map-marker</v-icon>
                  San Francisco, CA
                </v-chip>
                <v-chip color="white" size="small" variant="flat">
                  <v-icon start size="small">mdi-link</v-icon>
                  sarahjohnson.design
                </v-chip>
              </div>
            </div>
            <div class="d-flex ga-2">
              <v-btn color="white" variant="flat">
                <v-icon start>mdi-account-plus</v-icon>
                Follow
              </v-btn>
              <v-btn color="white" variant="outlined">
                <v-icon start>mdi-email</v-icon>
                Message
              </v-btn>
            </div>
          </div>
        </div>
      </v-img>

      <v-card-text class="pt-0">
        <v-row class="mt-4">
          <v-col cols="12" md="8">
            <p class="text-body-1 mb-4">
              Product designer with 5+ years of experience creating intuitive digital experiences.
              Passionate about user research, interaction design, and building products that matter.
              Currently leading design at TechStartup.
            </p>
            <div class="d-flex ga-2 flex-wrap">
              <v-chip v-for="skill in skills" :key="skill" size="small" variant="tonal" color="primary">
                {{ skill }}
              </v-chip>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <v-row class="text-center">
              <v-col>
                <h3 class="text-h5 font-weight-bold">128</h3>
                <p class="text-caption text-medium-emphasis">Projects</p>
              </v-col>
              <v-col>
                <h3 class="text-h5 font-weight-bold">12.5K</h3>
                <p class="text-caption text-medium-emphasis">Followers</p>
              </v-col>
              <v-col>
                <h3 class="text-h5 font-weight-bold">847</h3>
                <p class="text-caption text-medium-emphasis">Following</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row>
      <!-- Main Content -->
      <v-col cols="12" md="8">
        <v-card>
          <v-tabs v-model="tab" color="primary">
            <v-tab value="activity">Activity</v-tab>
            <v-tab value="projects">Projects</v-tab>
            <v-tab value="posts">Posts</v-tab>
          </v-tabs>

          <v-divider />

          <v-tabs-window v-model="tab">
            <!-- Activity Tab -->
            <v-tabs-window-item value="activity">
              <v-card-text>
                <v-timeline density="compact" side="end">
                  <v-timeline-item
                    v-for="activity in activities"
                    :key="activity.id"
                    :dot-color="activity.color"
                    size="small"
                  >
                    <template #icon>
                      <v-icon size="16" color="white">{{ activity.icon }}</v-icon>
                    </template>
                    <v-card variant="tonal">
                      <v-card-text>
                        <div class="d-flex justify-space-between align-start mb-2">
                          <span class="font-weight-medium">{{ activity.title }}</span>
                          <span class="text-caption text-medium-emphasis">{{ activity.time }}</span>
                        </div>
                        <p class="text-body-2 text-medium-emphasis mb-0">{{ activity.description }}</p>
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-tabs-window-item>

            <!-- Projects Tab -->
            <v-tabs-window-item value="projects">
              <v-card-text>
                <v-row>
                  <v-col v-for="project in projects" :key="project.id" cols="12" sm="6">
                    <v-card variant="outlined">
                      <v-img :src="project.image" height="150" cover />
                      <v-card-text>
                        <h4 class="text-subtitle-1 font-weight-medium mb-1">{{ project.title }}</h4>
                        <p class="text-caption text-medium-emphasis mb-2">{{ project.description }}</p>
                        <div class="d-flex justify-space-between align-center">
                          <div class="d-flex align-center">
                            <v-icon size="small" class="mr-1">mdi-heart</v-icon>
                            <span class="text-caption">{{ project.likes }}</span>
                            <v-icon size="small" class="ml-3 mr-1">mdi-eye</v-icon>
                            <span class="text-caption">{{ project.views }}</span>
                          </div>
                          <v-chip size="x-small" color="primary">{{ project.category }}</v-chip>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-tabs-window-item>

            <!-- Posts Tab -->
            <v-tabs-window-item value="posts">
              <v-list lines="three">
                <v-list-item v-for="post in posts" :key="post.id">
                  <v-list-item-title class="font-weight-medium mb-1">{{ post.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ post.excerpt }}</v-list-item-subtitle>
                  <template #append>
                    <div class="text-right">
                      <p class="text-caption text-medium-emphasis mb-1">{{ post.date }}</p>
                      <div class="d-flex align-center">
                        <v-icon size="small" class="mr-1">mdi-heart</v-icon>
                        <span class="text-caption">{{ post.likes }}</span>
                      </div>
                    </div>
                  </template>
                </v-list-item>
              </v-list>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>
      </v-col>

      <!-- Sidebar -->
      <v-col cols="12" md="4">
        <!-- About -->
        <v-card class="mb-4">
          <v-card-title>About</v-card-title>
          <v-card-text>
            <v-list density="compact" class="bg-transparent">
              <v-list-item prepend-icon="mdi-briefcase" title="Product Designer" subtitle="TechStartup" />
              <v-list-item prepend-icon="mdi-school" title="Stanford University" subtitle="Design & HCI" />
              <v-list-item prepend-icon="mdi-calendar" title="Joined" subtitle="March 2020" />
            </v-list>
          </v-card-text>
        </v-card>

        <!-- Social Links -->
        <v-card class="mb-4">
          <v-card-title>Connect</v-card-title>
          <v-card-text>
            <div class="d-flex ga-2">
              <v-btn icon variant="tonal" color="primary">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon variant="tonal" color="primary">
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>
              <v-btn icon variant="tonal" color="primary">
                <v-icon>mdi-github</v-icon>
              </v-btn>
              <v-btn icon variant="tonal" color="primary">
                <v-icon>mdi-dribbble</v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Similar Profiles -->
        <v-card>
          <v-card-title>Similar Profiles</v-card-title>
          <v-list>
            <v-list-item v-for="profile in similarProfiles" :key="profile.name">
              <template #prepend>
                <v-avatar size="40">
                  <v-img :src="profile.avatar" />
                </v-avatar>
              </template>
              <v-list-item-title>{{ profile.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ profile.role }}</v-list-item-subtitle>
              <template #append>
                <v-btn variant="text" size="small" color="primary">Follow</v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
