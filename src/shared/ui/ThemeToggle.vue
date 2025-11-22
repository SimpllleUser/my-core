<script setup lang="ts">
import { useTheme } from "vuetify";
import { ref, watch, computed } from "vue";
import { Icons, Themes } from "../model";

const theme = useTheme();
const isDark = ref(theme.global.name.value === Themes.Dark);

watch(isDark, (val) => {
  theme.global.name.value = val ? Themes.Dark : Themes.Light;
});

const themeIcon = computed(() => {
  return isDark.value ? Icons.WeatherNight : Icons.WhiteBalanceSunny;
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>

<template>
  <VBtn @click="toggleTheme" :icon="themeIcon" />
</template>
