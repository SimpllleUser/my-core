<script setup lang="ts">
import { useTheme } from 'vuetify';
import { ref, watch, computed } from 'vue';
import { Icons, Themes } from '../model';
import { useLocalStorage } from '@vueuse/core';

const themeValue = useLocalStorage('app-theme', Themes.Light);

const theme = useTheme();
theme.global.name.value = themeValue.value;
const isDark = ref(themeValue.value === Themes.Dark);

watch(isDark, val => {
  theme.global.name.value = val ? Themes.Dark : Themes.Light;
  themeValue.value = val ? Themes.Dark : Themes.Light;
});

watch(
  () => theme.global.name.value,
  val => {
    isDark.value = val === Themes.Dark;
    themeValue.value = val;
  }
);

const themeIcon = computed(() => {
  return isDark.value ? Icons.WeatherNight : Icons.WhiteBalanceSunny;
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>

<template>
  <VBtn
    @click="toggleTheme"
    :icon="themeIcon"
  />
</template>
