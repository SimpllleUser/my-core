<!--
  Snippet: Article View
  Description: Full blog article page with content, author info, and related posts
  Components: SectionHeader, BlogCard
  Variants: Standard article, with TOC, magazine style
-->
<template>
  <div>
    <!-- Style 1: Standard Article -->
    <article class="py-8">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" lg="8">
            <!-- Header -->
            <div class="text-center mb-8">
              <VChip color="primary" class="mb-4">{{ article.category }}</VChip>
              <h1 class="text-h3 font-weight-bold mb-4">{{ article.title }}</h1>
              <p class="text-h6 text-medium-emphasis mb-6">{{ article.excerpt }}</p>

              <div class="d-flex justify-center align-center ga-4 mb-6">
                <div class="d-flex align-center">
                  <VAvatar size="48" class="mr-3">
                    <VImg :src="article.author.avatar" />
                  </VAvatar>
                  <div class="text-left">
                    <div class="font-weight-bold">{{ article.author.name }}</div>
                    <div class="text-caption text-medium-emphasis">{{ article.author.role }}</div>
                  </div>
                </div>
                <VDivider vertical class="mx-4" />
                <div class="text-caption text-medium-emphasis">
                  <VIcon size="16" class="mr-1">{{ Icons.Calendar }}</VIcon>
                  {{ formatDate(article.publishedAt) }}
                </div>
                <div class="text-caption text-medium-emphasis">
                  <VIcon size="16" class="mr-1">{{ Icons.Clock }}</VIcon>
                  {{ article.readTime }} min read
                </div>
              </div>
            </div>

            <!-- Featured Image -->
            <VImg
              :src="article.image"
              height="400"
              cover
              rounded="xl"
              class="mb-8"
            />

            <!-- Content -->
            <div class="article-content text-body-1">
              <p>{{ article.content }}</p>

              <h2 class="text-h5 font-weight-bold mt-8 mb-4">Introduction</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

              <VAlert color="info" variant="tonal" class="my-6">
                <template #prepend>
                  <VIcon>{{ Icons.Info }}</VIcon>
                </template>
                <strong>Pro Tip:</strong> Always consider the user experience when implementing new features.
              </VAlert>

              <h2 class="text-h5 font-weight-bold mt-8 mb-4">Key Concepts</h2>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>

              <VCard variant="tonal" color="grey-lighten-4" class="my-6 pa-4">
                <pre class="text-body-2 mb-0"><code>const greeting = 'Hello, World!';
console.log(greeting);</code></pre>
              </VCard>

              <h2 class="text-h5 font-weight-bold mt-8 mb-4">Conclusion</h2>
              <p>Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
            </div>

            <!-- Tags -->
            <div class="d-flex flex-wrap ga-2 my-8">
              <VChip v-for="tag in article.tags" :key="tag" variant="outlined" size="small">
                {{ tag }}
              </VChip>
            </div>

            <!-- Actions -->
            <VCard variant="outlined" class="mb-8">
              <VCardText class="d-flex justify-space-between align-center pa-4">
                <div class="d-flex ga-2">
                  <VBtn variant="tonal" color="error">
                    <VIcon start>{{ Icons.Heart }}</VIcon>
                    {{ article.likes }}
                  </VBtn>
                  <VBtn variant="tonal">
                    <VIcon start>{{ Icons.Comment }}</VIcon>
                    {{ article.comments }}
                  </VBtn>
                </div>
                <div class="d-flex ga-2">
                  <VBtn icon variant="tonal"><VIcon>{{ Icons.Bookmark }}</VIcon></VBtn>
                  <VBtn icon variant="tonal"><VIcon>{{ Icons.Share }}</VIcon></VBtn>
                  <VBtn icon variant="tonal"><VIcon>{{ Icons.Twitter }}</VIcon></VBtn>
                  <VBtn icon variant="tonal"><VIcon>{{ Icons.Facebook }}</VIcon></VBtn>
                </div>
              </VCardText>
            </VCard>

            <!-- Author Box -->
            <VCard variant="outlined" class="mb-8">
              <VCardText class="pa-6">
                <div class="d-flex flex-column flex-sm-row align-center align-sm-start ga-4">
                  <VAvatar size="80">
                    <VImg :src="article.author.avatar" />
                  </VAvatar>
                  <div class="text-center text-sm-left flex-grow-1">
                    <div class="text-overline text-medium-emphasis mb-1">Written by</div>
                    <h4 class="text-h6 font-weight-bold mb-2">{{ article.author.name }}</h4>
                    <p class="text-body-2 text-medium-emphasis mb-3">{{ article.author.bio }}</p>
                    <div class="d-flex justify-center justify-sm-start ga-2">
                      <VBtn size="small" color="primary">Follow</VBtn>
                      <VBtn size="small" variant="outlined" icon><VIcon>{{ Icons.Twitter }}</VIcon></VBtn>
                      <VBtn size="small" variant="outlined" icon><VIcon>{{ Icons.LinkedIn }}</VIcon></VBtn>
                    </div>
                  </div>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </article>

    <VDivider />

    <!-- Related Posts -->
    <section class="py-8 bg-grey-lighten-5">
      <VContainer>
        <h3 class="text-h5 font-weight-bold mb-6">Related Articles</h3>
        <VRow>
          <VCol v-for="post in relatedPosts" :key="post.id" cols="12" sm="6" lg="4">
            <VCard variant="outlined" hover>
              <VImg :src="post.image" height="180" cover />
              <VCardText class="pa-4">
                <VChip size="x-small" color="primary" variant="tonal" class="mb-2">
                  {{ post.category }}
                </VChip>
                <h4 class="text-subtitle-1 font-weight-bold mb-2">{{ post.title }}</h4>
                <div class="d-flex align-center">
                  <VAvatar size="24" class="mr-2">
                    <VImg :src="post.author.avatar" />
                  </VAvatar>
                  <span class="text-caption text-medium-emphasis">
                    {{ post.author.name }} · {{ post.readTime }} min
                  </span>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider />

    <!-- Style 2: Article with TOC -->
    <article class="py-8">
      <VContainer>
        <VRow>
          <!-- Sticky TOC -->
          <VCol cols="12" md="3" class="d-none d-md-block">
            <div class="sticky" style="top: 80px;">
              <div class="text-overline text-medium-emphasis mb-3">Table of Contents</div>
              <VList density="compact" nav>
                <VListItem
                  v-for="item in toc"
                  :key="item.id"
                  :class="{ 'pl-4': item.level === 2 }"
                >
                  <VListItemTitle class="text-body-2">{{ item.title }}</VListItemTitle>
                </VListItem>
              </VList>

              <VDivider class="my-4" />

              <div class="text-overline text-medium-emphasis mb-3">Share</div>
              <div class="d-flex ga-2">
                <VBtn icon size="small" variant="tonal"><VIcon>{{ Icons.Twitter }}</VIcon></VBtn>
                <VBtn icon size="small" variant="tonal"><VIcon>{{ Icons.Facebook }}</VIcon></VBtn>
                <VBtn icon size="small" variant="tonal"><VIcon>{{ Icons.LinkedIn }}</VIcon></VBtn>
                <VBtn icon size="small" variant="tonal"><VIcon>{{ Icons.Link }}</VIcon></VBtn>
              </div>
            </div>
          </VCol>

          <!-- Article Content -->
          <VCol cols="12" md="9">
            <VChip color="secondary" class="mb-4">Tutorial</VChip>
            <h1 class="text-h4 font-weight-bold mb-4">Step-by-Step Guide to Modern Web Development</h1>

            <div class="d-flex align-center ga-4 mb-6">
              <VAvatar size="40">
                <VImg src="https://randomuser.me/api/portraits/men/32.jpg" />
              </VAvatar>
              <div>
                <span class="font-weight-medium">Mike Chen</span>
                <span class="text-medium-emphasis"> · Dec 20, 2024 · 15 min read</span>
              </div>
            </div>

            <VImg
              src="https://picsum.photos/seed/tutorial/800/400"
              height="350"
              cover
              rounded="lg"
              class="mb-8"
            />

            <div class="text-body-1">
              <p class="text-h6 text-medium-emphasis mb-6">
                Learn how to build modern web applications from scratch with this comprehensive guide.
              </p>

              <h2 id="getting-started" class="text-h5 font-weight-bold mt-8 mb-4">Getting Started</h2>
              <p>Before we dive in, make sure you have the necessary tools installed...</p>

              <h2 id="project-setup" class="text-h5 font-weight-bold mt-8 mb-4">Project Setup</h2>
              <p>Let's create a new project using the latest best practices...</p>

              <h3 id="dependencies" class="text-h6 font-weight-bold mt-6 mb-3">Installing Dependencies</h3>
              <p>Run the following commands to install the required dependencies...</p>

              <h2 id="implementation" class="text-h5 font-weight-bold mt-8 mb-4">Implementation</h2>
              <p>Now let's implement the core functionality...</p>

              <h2 id="conclusion" class="text-h5 font-weight-bold mt-8 mb-4">Conclusion</h2>
              <p>Congratulations! You've successfully built a modern web application...</p>
            </div>
          </VCol>
        </VRow>
      </VContainer>
    </article>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/shared/model'
import type { IBlogPost, IBlogAuthor } from '@/shared/ui/snippets'

const author: IBlogAuthor = {
  id: 1,
  name: 'Sarah Johnson',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  role: 'Senior Developer',
  bio: 'Passionate developer with 10+ years of experience building web applications. Writing about Vue.js, TypeScript, and modern web development practices.',
}

const article: IBlogPost = {
  id: 1,
  title: 'Building Modern Web Applications with Vue 3 and TypeScript',
  excerpt: 'A comprehensive guide to creating scalable, maintainable web applications using the latest Vue 3 features and TypeScript best practices.',
  content: 'In this article, we will explore the best practices for building modern web applications...',
  image: 'https://picsum.photos/seed/article/1200/600',
  author,
  publishedAt: '2024-12-22',
  readTime: 15,
  category: 'Vue.js',
  tags: ['Vue 3', 'TypeScript', 'Composition API', 'Web Development', 'Frontend'],
  likes: 456,
  comments: 67,
}

const relatedPosts: IBlogPost[] = [
  { id: 2, title: 'Understanding Vue 3 Reactivity System', excerpt: '', image: 'https://picsum.photos/seed/rel1/400/250', author, publishedAt: '2024-12-20', readTime: 10, category: 'Vue.js', likes: 234, comments: 28 },
  { id: 3, title: 'TypeScript Generics Explained', excerpt: '', image: 'https://picsum.photos/seed/rel2/400/250', author, publishedAt: '2024-12-18', readTime: 12, category: 'TypeScript', likes: 189, comments: 21 },
  { id: 4, title: 'State Management with Pinia', excerpt: '', image: 'https://picsum.photos/seed/rel3/400/250', author, publishedAt: '2024-12-15', readTime: 8, category: 'Vue.js', likes: 156, comments: 15 },
]

const toc = [
  { id: 'getting-started', title: 'Getting Started', level: 1 },
  { id: 'project-setup', title: 'Project Setup', level: 1 },
  { id: 'dependencies', title: 'Installing Dependencies', level: 2 },
  { id: 'implementation', title: 'Implementation', level: 1 },
  { id: 'conclusion', title: 'Conclusion', level: 1 },
]

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
</script>

<style scoped>
.article-content p {
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.sticky {
  position: sticky;
}
</style>
