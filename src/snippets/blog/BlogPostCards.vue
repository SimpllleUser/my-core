<!--
  Snippet: Blog Post Cards
  Description: Various blog post card layouts with images, metadata, and actions
  Components: BlogCard, SectionHeader
  Variants: Grid, horizontal, featured, minimal
-->
<template>
  <div>
    <!-- Style 1: Standard Grid Cards -->
    <section class="py-8">
      <VContainer>
        <SectionHeader
          title="Latest Articles"
          subtitle="Discover insights, tutorials, and stories from our team"
          chip="Blog"
          chip-color="primary"
        />

        <VRow>
          <VCol v-for="post in gridPosts" :key="post.id" cols="12" sm="6" lg="4">
            <BlogCard
              :title="post.title"
              :excerpt="post.excerpt"
              :image="post.image"
              :author="post.author"
              :published-at="post.publishedAt"
              :read-time="post.readTime"
              :category="post.category"
              :likes="post.likes"
              :comments="post.comments"
            />
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Featured Post + Grid -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <div class="d-flex justify-space-between align-center mb-6">
          <h2 class="text-h5 font-weight-bold">Featured Stories</h2>
          <VBtn color="primary" variant="text">View All</VBtn>
        </div>

        <VRow>
          <!-- Featured Post -->
          <VCol cols="12" lg="6">
            <VCard variant="outlined" class="h-100" hover>
              <VImg :src="featuredPost.image" height="300" cover>
                <VChip color="primary" class="position-absolute ma-4" style="top: 0; left: 0;">
                  Featured
                </VChip>
              </VImg>
              <VCardText class="pa-6">
                <VChip size="small" color="secondary" variant="tonal" class="mb-3">
                  {{ featuredPost.category }}
                </VChip>
                <h3 class="text-h5 font-weight-bold mb-3">{{ featuredPost.title }}</h3>
                <p class="text-body-1 text-medium-emphasis mb-4">{{ featuredPost.excerpt }}</p>
                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <VAvatar size="40" class="mr-3">
                      <VImg :src="featuredPost.author.avatar" />
                    </VAvatar>
                    <div>
                      <div class="font-weight-medium">{{ featuredPost.author.name }}</div>
                      <div class="text-caption text-medium-emphasis">
                        {{ formatDate(featuredPost.publishedAt) }} · {{ featuredPost.readTime }} min read
                      </div>
                    </div>
                  </div>
                  <VBtn color="primary" variant="text">
                    Read More
                    <VIcon end>{{ Icons.ArrowRight }}</VIcon>
                  </VBtn>
                </div>
              </VCardText>
            </VCard>
          </VCol>

          <!-- Side Posts -->
          <VCol cols="12" lg="6">
            <VRow>
              <VCol v-for="post in sidePosts" :key="post.id" cols="12" sm="6" lg="12">
                <VCard variant="outlined" hover>
                  <div class="d-flex">
                    <VImg :src="post.image" width="150" height="120" cover class="flex-shrink-0" />
                    <VCardText class="pa-4">
                      <VChip size="x-small" :color="post.categoryColor" variant="tonal" class="mb-2">
                        {{ post.category }}
                      </VChip>
                      <h4 class="text-subtitle-1 font-weight-bold mb-2 line-clamp-2">
                        {{ post.title }}
                      </h4>
                      <div class="text-caption text-medium-emphasis">
                        {{ formatDate(post.publishedAt) }} · {{ post.readTime }} min
                      </div>
                    </VCardText>
                  </div>
                </VCard>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 3: Minimal Cards -->
    <section class="py-8">
      <VContainer>
        <div class="d-flex justify-space-between align-center mb-6">
          <h2 class="text-h5 font-weight-bold">Recent Posts</h2>
          <VBtnToggle v-model="viewMode" mandatory variant="outlined" density="compact">
            <VBtn value="grid" icon><VIcon>{{ Icons.ViewGrid }}</VIcon></VBtn>
            <VBtn value="list" icon><VIcon>{{ Icons.ViewList }}</VIcon></VBtn>
          </VBtnToggle>
        </div>

        <VRow>
          <VCol
            v-for="post in minimalPosts"
            :key="post.id"
            :cols="viewMode === 'grid' ? 12 : 12"
            :sm="viewMode === 'grid' ? 6 : 12"
            :md="viewMode === 'grid' ? 4 : 12"
          >
            <VCard variant="flat" class="bg-transparent" :class="{ 'd-flex': viewMode === 'list' }">
              <VImg
                :src="post.image"
                :height="viewMode === 'grid' ? 180 : 120"
                :width="viewMode === 'list' ? 200 : undefined"
                cover
                rounded="lg"
                class="flex-shrink-0"
              />
              <div :class="viewMode === 'grid' ? 'pt-4' : 'pa-4'">
                <div class="d-flex align-center ga-2 mb-2">
                  <VChip size="x-small" color="primary" variant="tonal">
                    {{ post.category }}
                  </VChip>
                  <span class="text-caption text-medium-emphasis">{{ post.readTime }} min read</span>
                </div>
                <h4 class="text-subtitle-1 font-weight-bold mb-2">{{ post.title }}</h4>
                <p v-if="viewMode === 'list'" class="text-body-2 text-medium-emphasis mb-2">
                  {{ post.excerpt }}
                </p>
                <div class="d-flex align-center">
                  <VAvatar size="24" class="mr-2">
                    <VImg :src="post.author.avatar" />
                  </VAvatar>
                  <span class="text-caption">{{ post.author.name }}</span>
                  <span class="text-caption text-medium-emphasis mx-1">·</span>
                  <span class="text-caption text-medium-emphasis">{{ formatDate(post.publishedAt) }}</span>
                </div>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 4: Category Cards -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <SectionHeader
          title="Browse by Category"
          subtitle="Find articles that match your interests"
          :centered="false"
        />

        <VRow>
          <VCol v-for="category in categories" :key="category.slug" cols="6" sm="4" md="2">
            <VCard variant="outlined" hover class="text-center pa-4">
              <VAvatar :color="category.color" size="56" rounded="lg" class="mb-3">
                <VIcon color="white" size="28">{{ category.icon }}</VIcon>
              </VAvatar>
              <div class="font-weight-bold mb-1">{{ category.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ category.count }} articles</div>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '@/shared/model'
import { SectionHeader, BlogCard } from '@/shared/ui/snippets'
import type { IBlogPost, IBlogCategory, IBlogAuthor } from '@/shared/ui/snippets'

const viewMode = ref('grid')

const author1: IBlogAuthor = {
  id: 1,
  name: 'Sarah Johnson',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  role: 'Senior Developer',
}

const author2: IBlogAuthor = {
  id: 2,
  name: 'Mike Chen',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  role: 'Tech Writer',
}

const gridPosts: IBlogPost[] = [
  { id: 1, title: 'Getting Started with Vue 3 Composition API', excerpt: 'Learn the fundamentals of Vue 3 Composition API and how it can improve your development workflow.', image: 'https://picsum.photos/seed/vue/400/250', author: author1, publishedAt: '2024-12-20', readTime: 8, category: 'Vue.js', likes: 245, comments: 32 },
  { id: 2, title: 'Building Responsive UIs with Vuetify 3', excerpt: 'Discover how to create beautiful, responsive user interfaces using Vuetify 3 components.', image: 'https://picsum.photos/seed/vuetify/400/250', author: author2, publishedAt: '2024-12-18', readTime: 12, category: 'Vuetify', likes: 189, comments: 24 },
  { id: 3, title: 'TypeScript Best Practices for Vue Apps', excerpt: 'Master TypeScript in your Vue applications with these proven best practices and tips.', image: 'https://picsum.photos/seed/ts/400/250', author: author1, publishedAt: '2024-12-15', readTime: 15, category: 'TypeScript', likes: 312, comments: 45 },
]

const featuredPost: IBlogPost = {
  id: 10,
  title: 'The Complete Guide to Modern Frontend Architecture',
  excerpt: 'Explore the latest patterns and practices for building scalable frontend applications. From micro-frontends to state management, learn everything you need to know.',
  image: 'https://picsum.photos/seed/arch/800/400',
  author: author1,
  publishedAt: '2024-12-22',
  readTime: 20,
  category: 'Architecture',
  likes: 456,
  comments: 67,
}

const sidePosts = [
  { id: 4, title: 'Understanding Pinia State Management', image: 'https://picsum.photos/seed/pinia/300/200', publishedAt: '2024-12-19', readTime: 10, category: 'Vue.js', categoryColor: 'success' },
  { id: 5, title: 'CSS Grid vs Flexbox: When to Use Which', image: 'https://picsum.photos/seed/css/300/200', publishedAt: '2024-12-17', readTime: 7, category: 'CSS', categoryColor: 'info' },
  { id: 6, title: 'API Design Best Practices', image: 'https://picsum.photos/seed/api/300/200', publishedAt: '2024-12-16', readTime: 12, category: 'Backend', categoryColor: 'warning' },
]

const minimalPosts: IBlogPost[] = [
  { id: 7, title: 'Introduction to Web Components', excerpt: 'Learn how to create reusable web components that work across any framework.', image: 'https://picsum.photos/seed/wc/400/250', author: author2, publishedAt: '2024-12-14', readTime: 9, category: 'JavaScript', likes: 156, comments: 18 },
  { id: 8, title: 'Mastering Git Workflows', excerpt: 'Discover efficient Git workflows for teams of any size.', image: 'https://picsum.photos/seed/git/400/250', author: author1, publishedAt: '2024-12-12', readTime: 11, category: 'DevOps', likes: 203, comments: 29 },
  { id: 9, title: 'Performance Optimization Tips', excerpt: 'Speed up your web applications with these proven optimization techniques.', image: 'https://picsum.photos/seed/perf/400/250', author: author2, publishedAt: '2024-12-10', readTime: 14, category: 'Performance', likes: 278, comments: 41 },
]

const categories: IBlogCategory[] = [
  { id: 1, name: 'Vue.js', slug: 'vuejs', count: 45, icon: Icons.CodeTags, color: 'success' },
  { id: 2, name: 'TypeScript', slug: 'typescript', count: 32, icon: Icons.Code, color: 'primary' },
  { id: 3, name: 'CSS', slug: 'css', count: 28, icon: Icons.Palette, color: 'info' },
  { id: 4, name: 'DevOps', slug: 'devops', count: 19, icon: Icons.Server, color: 'warning' },
  { id: 5, name: 'Design', slug: 'design', count: 24, icon: Icons.FormatPaint, color: 'error' },
  { id: 6, name: 'Career', slug: 'career', count: 16, icon: Icons.Briefcase, color: 'secondary' },
]

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
