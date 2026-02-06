import type { Component, Raw } from 'vue';

type RegisteredComponent = Raw<Component>;

const componentRegistry = new Map<string, RegisteredComponent>();

/**
 * Register a custom component for a field type
 * @param type - The field type name (e.g., 'custom-address', 'rich-text')
 * @param component - The Vue component to render for this type
 */
export function registerFieldComponent(type: string, component: RegisteredComponent): void {
  componentRegistry.set(type, component);
}

/**
 * Unregister a component for a field type
 * @param type - The field type name to unregister
 */
export function unregisterFieldComponent(type: string): boolean {
  return componentRegistry.delete(type);
}

/**
 * Get the registered component for a field type
 * @param type - The field type name
 * @returns The registered component or undefined
 */
export function getRegisteredComponent(type: string): RegisteredComponent | undefined {
  return componentRegistry.get(type);
}

/**
 * Check if a component is registered for a field type
 * @param type - The field type name
 */
export function hasRegisteredComponent(type: string): boolean {
  return componentRegistry.has(type);
}

/**
 * Get all registered field types
 */
export function getRegisteredTypes(): string[] {
  return Array.from(componentRegistry.keys());
}

/**
 * Clear all registered components
 */
export function clearRegistry(): void {
  componentRegistry.clear();
}
