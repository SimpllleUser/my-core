<script setup lang="ts">
import { ref } from 'vue';
import { Icons } from '../../model/icons.ts';
import ThemeCustomizer from '../../../lib/theme-configuration/components/ThemeCustomizer.vue';

defineOptions({
  name: 'ThemeDrawer'
})

const drawer = ref(false)
</script>

<template>
 <div>
   <VBtn :icon="Icons.Palette" @click="() => drawer = !drawer" />
   <VNavigationDrawer v-if="drawer" v-model="drawer" temporary width="300px">
     <div class="d-flex justify-end">
       <VBtn :icon="Icons.Close" @click="() => drawer = false" />
     </div>
     <ThemeCustomizer />
   </VNavigationDrawer>
 </div>
</template>
