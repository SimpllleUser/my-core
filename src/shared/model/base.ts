export type EmitEvent<T extends Record<string, any>> = {
  <K extends keyof T>(event: K, ...args: T[K] extends never ? [] : [T[K]]): void;
};
