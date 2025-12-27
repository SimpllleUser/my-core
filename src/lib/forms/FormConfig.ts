import type { FieldDefinition, FormValues } from './types';
import { BaseField, isField } from './fields';

export abstract class FormConfig {
  private _fields: FieldDefinition[] | null = null;
  private _fieldMap: Map<string, FieldDefinition> | null = null;

  /**
   * Get all field definitions from this config
   */
  getFields(): FieldDefinition[] {
    if (this._fields) return this._fields;

    this._fields = [];
    this._fieldMap = new Map();

    const prototype = Object.getPrototypeOf(this);
    const propertyNames = Object.getOwnPropertyNames(this);

    for (const name of propertyNames) {
      const value = (this as Record<string, unknown>)[name];

      if (isField(value)) {
        value.setName(name);
        const definition = value.toDefinition();
        this._fields.push(definition);
        this._fieldMap.set(name, definition);
      }
    }

    // Also check prototype for getter-defined fields
    const prototypePropertyNames = Object.getOwnPropertyNames(prototype);
    for (const name of prototypePropertyNames) {
      if (name === 'constructor') continue;

      const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
      if (descriptor?.get) {
        const value = (this as Record<string, unknown>)[name];

        if (isField(value) && !this._fieldMap.has(name)) {
          value.setName(name);
          const definition = value.toDefinition();
          this._fields.push(definition);
          this._fieldMap.set(name, definition);
        }
      }
    }

    return this._fields;
  }

  /**
   * Get a field definition by name
   */
  getField(name: string): FieldDefinition | undefined {
    if (!this._fieldMap) {
      this.getFields();
    }
    return this._fieldMap?.get(name);
  }

  /**
   * Get all fields belonging to a specific group
   */
  getGroup(group: string): FieldDefinition[] {
    return this.getFields().filter((field) => field.group === group);
  }

  /**
   * Get unique group names from all fields
   */
  getGroups(): string[] {
    const groups = new Set<string>();
    for (const field of this.getFields()) {
      if (field.group) {
        groups.add(field.group);
      }
    }
    return Array.from(groups);
  }

  /**
   * Get default values for all fields
   */
  getDefaults(): FormValues {
    const defaults: FormValues = {};

    for (const field of this.getFields()) {
      setNestedValue(defaults, field.name, field.default);
    }

    return defaults;
  }

  /**
   * Get fields organized by groups (including ungrouped)
   */
  getFieldsByGroups(): { group: string | null; fields: FieldDefinition[] }[] {
    const grouped = new Map<string | null, FieldDefinition[]>();

    for (const field of this.getFields()) {
      const key = field.group ?? null;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(field);
    }

    return Array.from(grouped.entries()).map(([group, fields]) => ({
      group,
      fields,
    }));
  }
}

/**
 * Helper to set nested value in object
 */
function setNestedValue(obj: FormValues, path: string, value: unknown): void {
  const keys = path.split('.');

  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as FormValues;
  }

  current[keys[keys.length - 1]] = value;
}
