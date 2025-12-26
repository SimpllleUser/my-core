<!--
  Snippet: User Profile Card
  Description: User profile cards with avatar, info, and actions
  Components: VCard, VAvatar, VBtn, VChip, VDivider, VList
  Variants: Simple, Detailed, Horizontal, Social
-->
<template>
  <v-container fluid>
    <h2 class="text-h5 font-weight-bold mb-6">User Profile Card Variants</h2>

    <v-row>
      <!-- Simple Profile Card -->
      <v-col cols="12" sm="6" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Simple</h3>
        <v-card class="text-center pa-6">
          <v-avatar size="100" class="mb-4">
            <v-img src="https://randomuser.me/api/portraits/women/44.jpg" />
          </v-avatar>
          <h3 class="text-h6 font-weight-bold mb-1">Sarah Johnson</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">Product Designer</p>
          <div class="d-flex justify-center ga-2">
            <v-btn color="primary" size="small">Follow</v-btn>
            <v-btn variant="outlined" size="small">Message</v-btn>
          </div>
        </v-card>
      </v-col>

      <!-- Detailed Profile Card -->
      <v-col cols="12" sm="6" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Detailed</h3>
        <v-card>
          <v-img
            src="https://picsum.photos/seed/cover/400/150"
            height="120"
            cover
          />
          <v-card-text class="text-center" style="margin-top: -50px;">
            <v-avatar size="100" class="border-4 border-white">
              <v-img src="https://randomuser.me/api/portraits/men/32.jpg" />
            </v-avatar>
            <h3 class="text-h6 font-weight-bold mt-3 mb-1">Michael Chen</h3>
            <p class="text-body-2 text-medium-emphasis mb-2">Full Stack Developer</p>
            <div class="d-flex justify-center ga-1 mb-4">
              <v-chip size="small" color="primary" variant="tonal">Vue.js</v-chip>
              <v-chip size="small" color="success" variant="tonal">Node.js</v-chip>
              <v-chip size="small" color="warning" variant="tonal">Python</v-chip>
            </div>

            <v-row class="text-center mb-4">
              <v-col>
                <div class="text-h6 font-weight-bold">1.2K</div>
                <div class="text-caption text-medium-emphasis">Followers</div>
              </v-col>
              <v-col>
                <div class="text-h6 font-weight-bold">847</div>
                <div class="text-caption text-medium-emphasis">Following</div>
              </v-col>
              <v-col>
                <div class="text-h6 font-weight-bold">56</div>
                <div class="text-caption text-medium-emphasis">Projects</div>
              </v-col>
            </v-row>

            <v-btn color="primary" block>View Profile</v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Card with Stats -->
      <v-col cols="12" sm="6" md="4">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">With Stats</h3>
        <v-card>
          <v-card-text class="text-center pt-6">
            <v-badge
              color="success"
              dot
              location="bottom right"
              offset-x="3"
              offset-y="3"
            >
              <v-avatar size="80">
                <v-img src="https://randomuser.me/api/portraits/women/65.jpg" />
              </v-avatar>
            </v-badge>
            <h3 class="text-h6 font-weight-bold mt-4 mb-1">Emma Wilson</h3>
            <p class="text-body-2 text-medium-emphasis">Marketing Manager</p>
            <p class="text-caption text-medium-emphasis mb-4">
              <v-icon size="small">mdi-map-marker</v-icon>
              San Francisco, CA
            </p>
          </v-card-text>

          <v-divider />

          <v-card-text>
            <v-list density="compact" class="bg-transparent">
              <v-list-item>
                <template #prepend>
                  <v-icon color="primary">mdi-email</v-icon>
                </template>
                <v-list-item-title>emma@company.com</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="primary">mdi-phone</v-icon>
                </template>
                <v-list-item-title>+1 (555) 123-4567</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <template #prepend>
                  <v-icon color="primary">mdi-calendar</v-icon>
                </template>
                <v-list-item-title>Joined March 2022</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Horizontal Profile Card -->
      <v-col cols="12" md="6">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Horizontal</h3>
        <v-card>
          <v-row no-gutters>
            <v-col cols="auto" class="d-flex align-center pa-4">
              <v-avatar size="100">
                <v-img src="https://randomuser.me/api/portraits/men/45.jpg" />
              </v-avatar>
            </v-col>
            <v-col>
              <v-card-text>
                <div class="d-flex justify-space-between align-start">
                  <div>
                    <h3 class="text-h6 font-weight-bold">David Rodriguez</h3>
                    <p class="text-body-2 text-medium-emphasis mb-2">Senior Software Engineer at TechCorp</p>
                    <div class="d-flex align-center ga-2 text-caption text-medium-emphasis mb-3">
                      <span><v-icon size="small">mdi-map-marker</v-icon> New York</span>
                      <span><v-icon size="small">mdi-link</v-icon> davidr.dev</span>
                    </div>
                  </div>
                  <v-btn icon="mdi-dots-vertical" variant="text" size="small" />
                </div>
                <p class="text-body-2 mb-4">
                  Passionate about building scalable applications and mentoring junior developers.
                  Open source contributor and tech speaker.
                </p>
                <div class="d-flex ga-2">
                  <v-btn color="primary" size="small">Connect</v-btn>
                  <v-btn variant="outlined" size="small">Message</v-btn>
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Social Profile Card -->
      <v-col cols="12" md="6">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Social</h3>
        <v-card>
          <v-img
            src="https://picsum.photos/seed/social/600/200"
            height="150"
            cover
            class="d-flex align-end"
          >
            <div class="pa-4 w-100" style="background: linear-gradient(transparent, rgba(0,0,0,0.7));">
              <div class="d-flex align-center">
                <v-avatar size="80" class="border-3 border-white">
                  <v-img src="https://randomuser.me/api/portraits/women/28.jpg" />
                </v-avatar>
                <div class="ml-4">
                  <h3 class="text-h6 font-weight-bold text-white">Lisa Anderson</h3>
                  <p class="text-body-2 text-white-darken-1">@lisaanderson</p>
                </div>
              </div>
            </div>
          </v-img>

          <v-card-text>
            <p class="text-body-2 mb-4">
              Travel enthusiast | Coffee lover ☕ | Photographer 📸
              Sharing my adventures around the world one photo at a time.
            </p>

            <v-row class="text-center mb-4">
              <v-col>
                <div class="text-h6 font-weight-bold">12.5K</div>
                <div class="text-caption text-medium-emphasis">Posts</div>
              </v-col>
              <v-col>
                <div class="text-h6 font-weight-bold">458K</div>
                <div class="text-caption text-medium-emphasis">Followers</div>
              </v-col>
              <v-col>
                <div class="text-h6 font-weight-bold">892</div>
                <div class="text-caption text-medium-emphasis">Following</div>
              </v-col>
            </v-row>

            <div class="d-flex justify-center ga-2">
              <v-btn icon color="primary" variant="tonal">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon color="pink" variant="tonal">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
              <v-btn icon color="blue" variant="tonal">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon color="red" variant="tonal">
                <v-icon>mdi-youtube</v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Team Member Cards -->
      <v-col cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-3">Team Members</h3>
        <v-row>
          <v-col v-for="member in teamMembers" :key="member.name" cols="12" sm="6" md="3">
            <v-card hover>
              <v-card-text class="text-center pa-6">
                <v-avatar size="80" class="mb-4">
                  <v-img :src="member.avatar" />
                </v-avatar>
                <h4 class="text-subtitle-1 font-weight-bold">{{ member.name }}</h4>
                <p class="text-caption text-medium-emphasis mb-3">{{ member.role }}</p>
                <div class="d-flex justify-center ga-1">
                  <v-btn icon size="x-small" variant="text">
                    <v-icon size="18">mdi-twitter</v-icon>
                  </v-btn>
                  <v-btn icon size="x-small" variant="text">
                    <v-icon size="18">mdi-linkedin</v-icon>
                  </v-btn>
                  <v-btn icon size="x-small" variant="text">
                    <v-icon size="18">mdi-github</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const teamMembers = [
  { name: 'John Doe', role: 'CEO & Founder', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Jane Smith', role: 'CTO', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Mike Johnson', role: 'Lead Designer', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { name: 'Emily Davis', role: 'Marketing Head', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
]
</script>
