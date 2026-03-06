<!--
  Snippet: Timeline Examples
  Description: Timeline layouts for history, activity feeds, and project progress
  Components: TimelineItem, VTimeline, VCard
  Variants: Simple, Alternating, With Images
-->
<script setup lang="ts">
import { Icons } from '../../shared/model'
import { TimelineItem } from '../../shared/ui/snippets'

const projectHistory = [
  { title: 'Project Kickoff', subtitle: 'Team assembled', description: 'Initial planning meeting and goal definition.', date: 'Jan 10', icon: Icons.RocketLaunch, dotColor: 'primary' },
  { title: 'Design Phase', subtitle: 'UI/UX wireframes', description: 'Figma prototypes created and approved by stakeholders.', date: 'Jan 24', icon: Icons.Palette, dotColor: 'purple' },
  { title: 'Development Sprint 1', subtitle: 'Core features', description: 'Authentication, dashboard, and data models implemented.', date: 'Feb 7', icon: Icons.CodeBraces, dotColor: 'blue' },
  { title: 'Beta Release', subtitle: 'Internal testing', description: 'QA team performed full regression testing.', date: 'Feb 21', icon: Icons.TestTube, dotColor: 'orange' },
  { title: 'Public Launch', subtitle: '🎉 Live!', description: 'Successfully launched to 1,000+ users on day one.', date: 'Mar 5', icon: Icons.Trophy, dotColor: 'success' },
]

const activityFeed = [
  { title: 'Sarah merged PR #142', description: 'feat: add dark mode toggle', date: '2 min ago', icon: Icons.SourceMerge, dotColor: 'success' },
  { title: 'New issue opened', description: 'Bug: chart not rendering on mobile', date: '15 min ago', icon: Icons.Bug, dotColor: 'error' },
  { title: 'Deploy to production', description: 'v2.4.1 deployed successfully', date: '1 hour ago', icon: Icons.CloudUpload, dotColor: 'primary' },
  { title: 'Alex left a comment', description: 'Great work on the animations!', date: '3 hours ago', icon: Icons.Comment, dotColor: 'blue' },
]
</script>
<template>
  <VContainer>
    <!-- Project History (alternating) -->
    <VRow class="mb-8">
      <VCol cols="12">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Project History (alternating)</h3>
        <VTimeline side="end" line-color="primary" truncate-line="start">
          <TimelineItem
            v-for="(item, i) in projectHistory"
            :key="i"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :date="item.date"
            :icon="item.icon"
            :dot-color="item.dotColor"
            card-variant="outlined"
          />
        </VTimeline>
      </VCol>
    </VRow>

    <!-- Activity Feed (compact, right-side only) -->
    <VRow>
      <VCol cols="12" md="7">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Activity Feed (compact)</h3>
        <VTimeline density="compact" side="end">
          <TimelineItem
            v-for="(item, i) in activityFeed"
            :key="i"
            :title="item.title"
            :description="item.description"
            :date="item.date"
            :icon="item.icon"
            :dot-color="item.dotColor"
            :hide-opposite-content="true"
            card-variant="flat"
            content-class="pa-2"
          />
        </VTimeline>
      </VCol>

      <!-- Simple dot timeline -->
      <VCol cols="12" md="5">
        <h3 class="text-subtitle-1 text-medium-emphasis mb-4">Simple dot style</h3>
        <VTimeline density="compact" side="end" line-inset="8">
          <TimelineItem
            v-for="(item, i) in projectHistory"
            :key="i"
            :title="item.title"
            :date="item.date"
            :dot-color="item.dotColor"
            :hide-opposite-content="true"
            card-variant="flat"
            content-class="pa-2"
            :fill-dot="true"
          />
        </VTimeline>
      </VCol>
    </VRow>
  </VContainer>
</template>
