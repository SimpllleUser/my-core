<!--
  Snippet: Team Section
  Description: Team members showcase with profiles
  Components: VContainer, VRow, VCol, VCard, VAvatar, VBtn, VChip
  Complexity: Medium
-->
<template>
  <div>
    <!-- Team Style 1: Simple Grid -->
    <section class="py-12">
      <VContainer>
        <div class="text-center mb-8">
          <VChip color="primary" variant="tonal" class="mb-4">Our Team</VChip>
          <h2 class="text-h4 font-weight-bold mb-2">Meet the People Behind the Product</h2>
          <p class="text-body-1 text-medium-emphasis mx-auto" style="max-width: 600px;">
            A diverse team of passionate individuals dedicated to building the best product.
          </p>
        </div>

        <VRow>
          <VCol v-for="member in teamMembers" :key="member.name" cols="12" sm="6" md="3">
            <VCard class="text-center pa-6" hover>
              <VAvatar size="96" class="mb-4">
                <VImg :src="member.avatar" />
              </VAvatar>
              <h4 class="text-subtitle-1 font-weight-bold mb-1">{{ member.name }}</h4>
              <p class="text-body-2 text-primary mb-3">{{ member.role }}</p>
              <div class="d-flex justify-center ga-1">
                <VBtn
                  v-for="social in member.socials"
                  :key="social.platform"
                  icon
                  size="small"
                  variant="text"
                  color="grey-darken-1"
                >
                  <VIcon size="18">{{ social.icon }}</VIcon>
                </VBtn>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Team Style 2: Cards with Bio -->
    <section class="py-12 bg-grey-lighten-5">
      <VContainer>
        <div class="text-center mb-8">
          <h2 class="text-h4 font-weight-bold mb-2">Leadership Team</h2>
        </div>

        <VRow>
          <VCol v-for="member in leadershipTeam" :key="member.name" cols="12" md="6" lg="4">
            <VCard class="pa-6" height="100%">
              <div class="d-flex align-start mb-4">
                <VAvatar size="80" class="mr-4">
                  <VImg :src="member.avatar" />
                </VAvatar>
                <div>
                  <h4 class="text-h6 font-weight-bold mb-0">{{ member.name }}</h4>
                  <p class="text-body-2 text-primary mb-1">{{ member.role }}</p>
                  <VChip size="x-small" variant="outlined">{{ member.department }}</VChip>
                </div>
              </div>
              <p class="text-body-2 text-medium-emphasis mb-4">{{ member.bio }}</p>
              <div class="d-flex ga-2">
                <VBtn
                  v-for="social in member.socials"
                  :key="social.platform"
                  variant="tonal"
                  size="small"
                  rounded
                >
                  <VIcon start size="16">{{ social.icon }}</VIcon>
                  {{ social.platform }}
                </VBtn>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Team Style 3: Horizontal Cards -->
    <section class="py-12">
      <VContainer>
        <VRow>
          <VCol cols="12" md="4">
            <div class="position-sticky" style="top: 80px;">
              <h2 class="text-h4 font-weight-bold mb-4">Join Our Team</h2>
              <p class="text-body-1 text-medium-emphasis mb-6">
                We're always looking for talented individuals to join our growing team.
              </p>
              <VBtn color="primary" size="large">
                <VIcon start>{{ Icons.Briefcase }}</VIcon>
                View Open Positions
              </VBtn>
            </div>
          </VCol>
          <VCol cols="12" md="8">
            <VCard
              v-for="member in teamMembers.slice(0, 4)"
              :key="member.name"
              class="mb-4"
              variant="outlined"
            >
              <VRow align="center" no-gutters>
                <VCol cols="auto" class="pa-4">
                  <VAvatar size="64">
                    <VImg :src="member.avatar" />
                  </VAvatar>
                </VCol>
                <VCol class="pa-4">
                  <h4 class="text-subtitle-1 font-weight-bold mb-0">{{ member.name }}</h4>
                  <p class="text-body-2 text-primary mb-0">{{ member.role }}</p>
                </VCol>
                <VCol cols="auto" class="pa-4">
                  <VBtn
                    v-for="social in member.socials"
                    :key="social.platform"
                    icon
                    variant="text"
                  >
                    <VIcon>{{ social.icon }}</VIcon>
                  </VBtn>
                </VCol>
              </VRow>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-founder',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    socials: [
      { platform: 'Twitter', icon: Icons.Twitter },
      { platform: 'LinkedIn', icon: Icons.LinkedIn },
    ],
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-founder',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    socials: [
      { platform: 'Twitter', icon: Icons.Twitter },
      { platform: 'Github', icon: Icons.Github },
    ],
  },
  {
    name: 'Emily Davis',
    role: 'Head of Design',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    socials: [
      { platform: 'Dribbble', icon: Icons.Dribbble },
      { platform: 'Twitter', icon: Icons.Twitter },
    ],
  },
  {
    name: 'James Wilson',
    role: 'Lead Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    socials: [
      { platform: 'Github', icon: Icons.Github },
      { platform: 'LinkedIn', icon: Icons.LinkedIn },
    ],
  },
]

const leadershipTeam = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-founder',
    department: 'Executive',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Sarah has 15+ years of experience in tech leadership. Previously led product at Fortune 500 companies.',
    socials: [
      { platform: 'Twitter', icon: Icons.Twitter },
      { platform: 'LinkedIn', icon: Icons.LinkedIn },
    ],
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-founder',
    department: 'Engineering',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Michael is a serial entrepreneur with a passion for building scalable systems and leading engineering teams.',
    socials: [
      { platform: 'Github', icon: Icons.Github },
      { platform: 'Twitter', icon: Icons.Twitter },
    ],
  },
  {
    name: 'Emily Davis',
    role: 'VP of Product',
    department: 'Product',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Emily drives product strategy and user experience. She previously led design at several successful startups.',
    socials: [
      { platform: 'LinkedIn', icon: Icons.LinkedIn },
      { platform: 'Dribbble', icon: Icons.Dribbble },
    ],
  },
]
</script>
