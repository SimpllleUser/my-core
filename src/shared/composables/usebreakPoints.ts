import { computed } from "vue";
import { useBreakpoints } from "@vueuse/core";
import { Breakpoints } from "../model";

export const breakpoints = useBreakpoints({
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1264,
  xl: 1904,
});

export function useBreakPoint() {
  const literalBreakpoint = computed(() => {
    if (breakpoints.xl.value) return Breakpoints.Xl;
    if (breakpoints.lg.value) return Breakpoints.Lg;
    if (breakpoints.md.value) return Breakpoints.Md;
    if (breakpoints.sm.value) return Breakpoints.Sm;
    return Breakpoints.Xs;
  });

  const isMobile = computed(() => {
    return (
      literalBreakpoint.value === Breakpoints.Xs ||
      literalBreakpoint.value === Breakpoints.Sm
    );
  });

  return {
    literalBreakpoint,
    isMobile,
  };
}
