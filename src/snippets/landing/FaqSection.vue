<!--
  Snippet: FAQ Section
  Description: Frequently asked questions with accordion and various layouts
  Components: VContainer, VRow, VCol, VExpansionPanels, VCard
  Complexity: Medium
-->
<template>
  <div>
    <!-- FAQ Style 1: Simple Accordion -->
    <section class="py-12">
      <VContainer>
        <VRow justify="center">
          <VCol cols="12" md="8">
            <div class="text-center mb-8">
              <VChip color="primary" variant="tonal" class="mb-4">FAQ</VChip>
              <h2 class="text-h4 font-weight-bold mb-2">Frequently Asked Questions</h2>
              <p class="text-body-1 text-medium-emphasis">
                Everything you need to know about our product
              </p>
            </div>

            <VExpansionPanels variant="accordion">
              <VExpansionPanel v-for="faq in faqs" :key="faq.question">
                <VExpansionPanelTitle class="font-weight-medium">
                  {{ faq.question }}
                </VExpansionPanelTitle>
                <VExpansionPanelText class="text-body-2 text-medium-emphasis">
                  {{ faq.answer }}
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- FAQ Style 2: Two Columns -->
    <section class="py-12 bg-grey-lighten-5">
      <VContainer>
        <div class="text-center mb-8">
          <h2 class="text-h4 font-weight-bold mb-2">Common Questions</h2>
        </div>

        <VRow>
          <VCol v-for="(faq, index) in faqs" :key="faq.question" cols="12" md="6">
            <VCard class="pa-4 mb-4" variant="flat">
              <div class="d-flex">
                <VAvatar color="primary" size="32" class="mr-3">
                  <span class="text-body-2 font-weight-bold">{{ index + 1 }}</span>
                </VAvatar>
                <div>
                  <h4 class="text-subtitle-1 font-weight-bold mb-2">{{ faq.question }}</h4>
                  <p class="text-body-2 text-medium-emphasis mb-0">{{ faq.answer }}</p>
                </div>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- FAQ Style 3: With Categories -->
    <section class="py-12">
      <VContainer>
        <VRow>
          <VCol cols="12" md="4">
            <div class="position-sticky" style="top: 80px;">
              <h2 class="text-h4 font-weight-bold mb-4">Help Center</h2>
              <p class="text-body-1 text-medium-emphasis mb-6">
                Find answers to the most common questions about our platform.
              </p>
              <VList density="compact" class="bg-transparent">
                <VListItem
                  v-for="category in categories"
                  :key="category.name"
                  :active="activeCategory === category.name"
                  color="primary"
                  rounded="lg"
                  @click="activeCategory = category.name"
                >
                  <template #prepend>
                    <VIcon>{{ category.icon }}</VIcon>
                  </template>
                  <VListItemTitle>{{ category.name }}</VListItemTitle>
                </VListItem>
              </VList>
            </div>
          </VCol>
          <VCol cols="12" md="8">
            <VExpansionPanels variant="accordion">
              <VExpansionPanel
                v-for="faq in filteredFaqs"
                :key="faq.question"
              >
                <VExpansionPanelTitle class="font-weight-medium">
                  {{ faq.question }}
                </VExpansionPanelTitle>
                <VExpansionPanelText class="text-body-2 text-medium-emphasis">
                  {{ faq.answer }}
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VCol>
        </VRow>
      </VContainer>
    </section>

    <VDivider class="my-8" />

    <!-- FAQ Style 4: With Contact -->
    <section class="py-12 bg-grey-lighten-5">
      <VContainer>
        <VRow>
          <VCol cols="12" md="8">
            <h2 class="text-h4 font-weight-bold mb-6">Questions & Answers</h2>
            <VExpansionPanels>
              <VExpansionPanel v-for="faq in faqs.slice(0, 4)" :key="faq.question">
                <VExpansionPanelTitle>
                  <VIcon color="primary" class="mr-3">{{ Icons.HelpCircle }}</VIcon>
                  {{ faq.question }}
                </VExpansionPanelTitle>
                <VExpansionPanelText class="text-body-2 text-medium-emphasis pl-10">
                  {{ faq.answer }}
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VCol>
          <VCol cols="12" md="4">
            <VCard class="pa-6" color="primary" variant="flat">
              <VIcon color="white" size="48" class="mb-4">{{ Icons.Headphones }}</VIcon>
              <h3 class="text-h6 font-weight-bold text-white mb-2">Still have questions?</h3>
              <p class="text-body-2 text-white mb-4" style="opacity: 0.9">
                Can't find the answer you're looking for? Our team is here to help.
              </p>
              <VBtn color="white" block>
                <VIcon start>{{ Icons.Chat }}</VIcon>
                Contact Support
              </VBtn>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icons } from '@/shared/model'

const activeCategory = ref('General')

const categories = [
  { name: 'General', icon: Icons.HelpCircle },
  { name: 'Billing', icon: Icons.CreditCard },
  { name: 'Technical', icon: Icons.Cog },
  { name: 'Security', icon: Icons.ShieldCheck },
]

const faqs = [
  {
    question: 'How do I get started?',
    answer: 'Getting started is easy! Simply sign up for a free account, complete the onboarding process, and you can start using all features immediately. No credit card required.',
    category: 'General',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.',
    category: 'Billing',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
    category: 'Billing',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely! We use industry-standard encryption and security practices. Your data is stored in secure, SOC 2 compliant data centers.',
    category: 'Security',
  },
  {
    question: 'Do you offer API access?',
    answer: 'Yes, we provide a comprehensive REST API with all paid plans. Documentation and SDKs are available for popular programming languages.',
    category: 'Technical',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can reach our support team via email, live chat, or phone. Enterprise customers have access to dedicated support managers.',
    category: 'General',
  },
]

const filteredFaqs = computed(() =>
  faqs.filter((faq) => faq.category === activeCategory.value)
)
</script>
