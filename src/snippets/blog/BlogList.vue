<!--
  Snippet: Blog List
  Description: Blog post listings with filters, search, and pagination
  Components: BlogCard, SectionHeader
  Variants: Full list, sidebar layout, infinite scroll
-->
<template>
  <div>
    <!-- Style 1: Full Width List -->
    <section class="py-8">
      <VContainer>
        <div class="d-flex flex-wrap justify-space-between align-center mb-6 ga-4">
          <h2 class="text-h4 font-weight-bold">All Articles</h2>
          <div class="d-flex ga-2">
            <VTextField
              v-model="search"
              :prepend-inner-icon="Icons.Search"
              placeholder="Search articles..."
              density="compact"
              variant="outlined"
              hide-details
              style="min-width: 250px"
            />
            <VSelect
              v-model="sortBy"
              :items="sortOptions"
              density="compact"
              variant="outlined"
              hide-details
              style="min-width: 150px"
            />
          </div>
        </div>

        <VRow>
          <VCol v-for="post in listPosts" :key="post.id" cols="12">
            <VCard variant="outlined" hover>
              <div class="d-flex flex-column flex-md-row">
                <VImg
                  :src="post.image"
                  width="100%"
                  :max-width="isMobile ? '100%' : 280"
                  height="200"
                  cover
                  class="flex-shrink-0"
                />
                <VCardText class="pa-5 flex-grow-1">
                  <div class="d-flex align-center ga-2 mb-2">
                    <VChip size="small" color="primary" variant="tonal">
                      {{ post.category }}
                    </VChip>
                    <span class="text-caption text-medium-emphasis">
                      {{ post.readTime }} min read
                    </span>
                  </div>
                  <h3 class="text-h6 font-weight-bold mb-2">{{ post.title }}</h3>
                  <p class="text-body-2 text-medium-emphasis mb-4">{{ post.excerpt }}</p>
                  <div class="d-flex align-center justify-space-between flex-wrap ga-4">
                    <div class="d-flex align-center">
                      <VAvatar size="36" class="mr-3">
                        <VImg :src="post.author.avatar" />
                      </VAvatar>
                      <div>
                        <div class="text-subtitle-2 font-weight-medium">{{ post.author.name }}</div>
                        <div class="text-caption text-medium-emphasis">
                          {{ formatDate(post.publishedAt) }}
                        </div>
                      </div>
                    </div>
                    <div class="d-flex align-center ga-4">
                      <span class="d-flex align-center text-body-2 text-medium-emphasis">
                        <VIcon size="16" class="mr-1">{{ Icons.Heart }}</VIcon>
                        {{ post.likes }}
                      </span>
                      <span class="d-flex align-center text-body-2 text-medium-emphasis">
                        <VIcon size="16" class="mr-1">{{ Icons.Comment }}</VIcon>
                        {{ post.comments }}
                      </span>
                      <VBtn color="primary" variant="text" size="small">
                        Read Article
                        <VIcon end size="16">{{ Icons.ArrowRight }}</VIcon>
                      </VBtn>
                    </div>
                  </div>
                </VCardText>
              </div>
            </VCard>
          </VCol>
        </VRow>

        <div class="d-flex justify-center mt-8">
          <VPagination v-model="page" :length="5" rounded />
        </div>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: With Sidebar -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <VRow>
          <!-- Main Content -->
          <VCol cols="12" lg="8">
            <h2 class="text-h5 font-weight-bold mb-6">Latest Articles</h2>

            <VCard v-for="post in sidebarPosts" :key="post.id" variant="flat" class="mb-4">
              <VRow no-gutters>
                <VCol cols="4">
                  <VImg :src="post.image" height="180" cover rounded="lg" />
                </VCol>
                <VCol cols="8">
                  <VCardText class="pa-4">
                    <VChip size="x-small" :color="post.categoryColor" variant="tonal" class="mb-2">
                      {{ post.category }}
                    </VChip>
                    <h4 class="text-subtitle-1 font-weight-bold mb-2">{{ post.title }}</h4>
                    <p class="text-body-2 text-medium-emphasis mb-3 line-clamp-2">
                      {{ post.excerpt }}
                    </p>
                    <div class="d-flex align-center">
                      <VAvatar size="24" class="mr-2">
                        <VImg :src="post.author.avatar" />
                      </VAvatar>
                      <span class="text-caption">{{ post.author.name }}</span>
                      <span class="text-caption text-medium-emphasis mx-2">·</span>
                      <span class="text-caption text-medium-emphasis">{{ post.readTime }} min</span>
                    </div>
                  </VCardText>
                </VCol>
              </VRow>
            </VCard>

            <VBtn color="primary" variant="outlined" block size="large" class="mt-4">
              Load More Articles
            </VBtn>
          </VCol>

          <!-- Sidebar -->
          <VCol cols="12" lg="4">
            <!-- Search -->
            <VCard variant="outlined" class="mb-4">
              <VCardText class="pa-4">
                <VTextField
                  v-model="sidebarSearch"
                  :prepend-inner-icon="Icons.Search"
                  placeholder="Search..."
                  variant="outlined"
                  density="comfortable"
                  hide-details
                />
              </VCardText>
            </VCard>

            <!-- Categories -->
            <VCard variant="outlined" class="mb-4">
              <VCardTitle class="text-subtitle-1 font-weight-bold pb-0">Categories</VCardTitle>
              <VCardText class="pa-4">
                <VList density="compact">
                  <VListItem
                    v-for="cat in sidebarCategories"
                    :key="cat.slug"
                    class="px-0"
                  >
                    <template #prepend>
                      <VIcon :color="cat.color" size="20" class="mr-2">{{ cat.icon }}</VIcon>
                    </template>
                    <VListItemTitle>{{ cat.name }}</VListItemTitle>
                    <template #append>
                      <VChip size="x-small" variant="tonal">{{ cat.count }}</VChip>
                    </template>
                  </VListItem>
                </VList>
              </VCardText>
            </VCard>

            <!-- Popular Posts -->
            <VCard variant="outlined" class="mb-4">
              <VCardTitle class="text-subtitle-1 font-weight-bold pb-0">Popular Posts</VCardTitle>
              <VCardText class="pa-4">
                <div v-for="(post, idx) in popularPosts" :key="post.id" class="d-flex mb-3">
                  <div class="text-h5 font-weight-bold text-primary mr-3" style="min-width: 24px">
                    {{ String(idx + 1).padStart(2, '0') }}
                  </div>
                  <div>
                    <div class="text-subtitle-2 font-weight-medium mb-1">{{ post.title }}</div>
                    <div class="text-caption text-medium-emphasis">{{ post.views }} views</div>
                  </div>
                </div>
              </VCardText>
            </VCard>

            <!-- Tags -->
            <VCard variant="outlined">
              <VCardTitle class="text-subtitle-1 font-weight-bold pb-0">Tags</VCardTitle>
              <VCardText class="pa-4">
                <div class="d-flex flex-wrap ga-2">
                  <VChip
                    v-for="tag in tags"
                    :key="tag"
                    size="small"
                    variant="outlined"
                    class="cursor-pointer"
                  >
                    {{ tag }}
                  </VChip>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { Icons } from '@/shared/model'
import type { IBlogPost, IBlogAuthor, IBlogCategory } from '@/shared/ui/snippets'

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const search = ref('')
const sortBy = ref('newest')
const page = ref(1)
const sidebarSearch = ref('')

const sortOptions = ['Newest', 'Oldest', 'Most Popular', 'Most Commented']

const author1: IBlogAuthor = {
  id: 1,
  name: 'Sarah Johnson',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
}

const author2: IBlogAuthor = {
  id: 2,
  name: 'Mike Chen',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
}

const listPosts: IBlogPost[] = [
  { id: 1, title: 'Building Scalable Applications with Vue 3 and TypeScript', excerpt: 'Learn how to structure your Vue 3 applications for scale using TypeScript, composition API, and best practices from real-world projects.', image: 'https://picsum.photos/seed/vue3/400/250', author: author1, publishedAt: '2024-12-22', readTime: 15, category: 'Vue.js', likes: 342, comments: 45 },
  { id: 2, title: 'The Future of Frontend Development in 2025', excerpt: 'Explore upcoming trends, tools, and technologies that will shape frontend development in the coming year.', image: 'https://picsum.photos/seed/future/400/250', author: author2, publishedAt: '2024-12-20', readTime: 12, category: 'Industry', likes: 256, comments: 38 },
  { id: 3, title: 'Mastering CSS Grid: A Complete Guide', excerpt: 'Everything you need to know about CSS Grid layout, from basics to advanced techniques with practical examples.', image: 'https://picsum.photos/seed/grid/400/250', author: author1, publishedAt: '2024-12-18', readTime: 20, category: 'CSS', likes: 198, comments: 27 },
]

interface SidebarPost extends IBlogPost {
  categoryColor: string
}

const sidebarPosts: SidebarPost[] = [
  { id: 1, title: 'Introduction to Pinia Store', excerpt: 'Learn how to manage state in Vue 3 applications using Pinia, the recommended state management solution.', image: 'https://picsum.photos/seed/pinia2/300/200', author: author1, publishedAt: '2024-12-21', readTime: 10, category: 'Vue.js', categoryColor: 'success', likes: 180, comments: 22 },
  { id: 2, title: 'Responsive Design Patterns', excerpt: 'Modern approaches to building responsive web applications that work seamlessly across all devices.', image: 'https://picsum.photos/seed/resp/300/200', author: author2, publishedAt: '2024-12-19', readTime: 8, category: 'Design', categoryColor: 'info', likes: 145, comments: 18 },
  { id: 3, title: 'API Security Best Practices', excerpt: 'Essential security measures every developer should implement when building and consuming APIs.', image: 'https://picsum.photos/seed/sec/300/200', author: author1, publishedAt: '2024-12-17', readTime: 14, category: 'Security', categoryColor: 'error', likes: 210, comments: 31 },
]

const sidebarCategories: IBlogCategory[] = [
  { id: 1, name: 'Vue.js', slug: 'vuejs', count: 45, icon: Icons.CodeTags, color: 'success' },
  { id: 2, name: 'TypeScript', slug: 'typescript', count: 32, icon: Icons.Code, color: 'primary' },
  { id: 3, name: 'CSS', slug: 'css', count: 28, icon: Icons.Palette, color: 'info' },
  { id: 4, name: 'Security', slug: 'security', count: 15, icon: Icons.Shield, color: 'error' },
  { id: 5, name: 'DevOps', slug: 'devops', count: 19, icon: Icons.Server, color: 'warning' },
]

const popularPosts = [
  { id: 1, title: 'Getting Started with Vue 3', views: 12500 },
  { id: 2, title: 'TypeScript for Beginners', views: 9800 },
  { id: 3, title: 'CSS Flexbox Complete Guide', views: 8400 },
  { id: 4, title: 'Building REST APIs', views: 7200 },
  { id: 5, title: 'Web Performance Tips', views: 6100 },
]

const tags = ['Vue', 'React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'API', 'Design', 'UX', 'Performance', 'Testing']

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
