<!--
  Snippet: Team Section
  Description: Team members showcase with profiles
  Components: SectionHeader, TeamMemberCard, SocialLinks
  Complexity: Medium
-->
<template>
  <div>
    <!-- Team Style 1: Simple Grid -->
    <section class="py-12">
      <VContainer>
        <SectionHeader
          title="Meet the People Behind the Product"
          subtitle="A diverse team of passionate individuals dedicated to building the best product."
          chip="Our Team"
        />

        <VRow>
          <VCol v-for="member in teamMembers" :key="member.name" cols="12" sm="6" md="3">
            <TeamMemberCard
              :name="member.name"
              :role="member.role"
              :avatar="member.avatar"
              :socials="member.socials"
              layout="centered"
              :avatar-size="96"
              content-class="pa-6"
            />
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- Team Style 2: Cards with Bio -->
    <section class="py-12 bg-grey-lighten-5">
      <VContainer>
        <SectionHeader
          title="Leadership Team"
          :chip="undefined"
        />

        <VRow>
          <VCol v-for="member in leadershipTeam" :key="member.name" cols="12" md="6" lg="4">
            <TeamMemberCard
              :name="member.name"
              :role="member.role"
              :avatar="member.avatar"
              :department="member.department"
              :bio="member.bio"
              :socials="member.socials"
              layout="default"
              :show-social-labels="true"
            />
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
            <TeamMemberCard
              v-for="member in teamMembers.slice(0, 4)"
              :key="member.name"
              :name="member.name"
              :role="member.role"
              :avatar="member.avatar"
              :socials="member.socials"
              layout="horizontal"
              card-variant="outlined"
              class="mb-4"
              :avatar-size="64"
            />
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'
import { SectionHeader, TeamMemberCard } from '@/shared/ui/snippets'
import type { ISocialLink } from '@/shared/ui/snippets'

interface ITeamMemberData {
  name: string
  role: string
  avatar: string
  department?: string
  bio?: string
  socials: ISocialLink[]
}

const teamMembers: ITeamMemberData[] = [
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

const leadershipTeam: ITeamMemberData[] = [
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
