import type { ValidationRule, FormValues, FieldDefinition } from '../types';

export interface ValidationContext {
  values: FormValues;
  abortController?: AbortController;
}

export interface FieldValidationResult {
  valid: boolean;
  error?: string;
}

export interface FormValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates a single field value against its rules
 */
export async function validateField<T = unknown>(
  value: T,
  rules: ValidationRule<T>[],
  context: ValidationContext
): Promise<FieldValidationResult> {
  for (const rule of rules) {
    try {
      const result = await Promise.resolve(rule(value, context.values));

      if (context.abortController?.signal.aborted) {
        return { valid: true };
      }

      if (result !== true) {
        return {
          valid: false,
          error: result,
        };
      }
    } catch (error) {
      console.error('Validation error:', error);
      return {
        valid: false,
        error: 'Validation failed',
      };
    }
  }

  return { valid: true };
}

/**
 * Validates all form fields
 */
export async function validateForm(
  fields: FieldDefinition[],
  values: FormValues
): Promise<FormValidationResult> {
  const errors: Record<string, string> = {};
  const context: ValidationContext = { values };

  const validationPromises = fields.map(async (field) => {
    const value = getNestedValue(values, field.name);
    const result = await validateField(value, field.validation, context);

    if (!result.valid && result.error) {
      errors[field.name] = result.error;
    }
  });

  await Promise.all(validationPromises);

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Gets a nested value from an object using dot notation
 */
export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current, key) => {
    if (current === null || current === undefined) return undefined;
    return (current as Record<string, unknown>)[key];
  }, obj as unknown);
}

/**
 * Sets a nested value in an object using dot notation
 */
export function setNestedValue(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): Record<string, unknown> {
  const keys = path.split('.');
  const result = { ...obj };

  let current: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) };
    }
    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

/**
 * Creates a debounced validator function
 */
export function createDebouncedValidator(
  validateFn: () => Promise<FieldValidationResult>,
  delay: number
): () => Promise<FieldValidationResult> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let currentAbortController: AbortController | null = null;

  return () => {
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (currentAbortController) {
        currentAbortController.abort();
      }

      currentAbortController = new AbortController();

      timeoutId = setTimeout(async () => {
        const result = await validateFn();
        resolve(result);
      }, delay);
    });
  };
}
