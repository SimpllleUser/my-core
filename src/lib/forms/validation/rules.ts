import type { ValidationRule, FormValues } from '../types';

// ============================================================================
// Helper Types
// ============================================================================

type DateInput = Date | string | ((values: FormValues) => Date);

// ============================================================================
// Basic Validators
// ============================================================================

export function required(message = 'This field is required'): ValidationRule {
  return (value: unknown): true | string => {
    if (value === null || value === undefined) return message;
    if (typeof value === 'string' && value.trim() === '') return message;
    if (Array.isArray(value) && value.length === 0) return message;
    return true;
  };
}

export function requiredIf(
  condition: (values: FormValues) => boolean,
  message = 'This field is required'
): ValidationRule {
  return (value: unknown, values: FormValues): true | string => {
    if (!condition(values)) return true;
    if (value === null || value === undefined) return message;
    if (typeof value === 'string' && value.trim() === '') return message;
    if (Array.isArray(value) && value.length === 0) return message;
    return true;
  };
}

// ============================================================================
// Text Validators
// ============================================================================

export function minLength(length: number, message?: string): ValidationRule<string> {
  const msg = message ?? `Must be at least ${length} characters`;
  return (value: string): true | string => {
    if (!value) return true;
    return value.length >= length ? true : msg;
  };
}

export function maxLength(length: number, message?: string): ValidationRule<string> {
  const msg = message ?? `Must be at most ${length} characters`;
  return (value: string): true | string => {
    if (!value) return true;
    return value.length <= length ? true : msg;
  };
}

export function pattern(regex: RegExp, message = 'Invalid format'): ValidationRule<string> {
  return (value: string): true | string => {
    if (!value) return true;
    return regex.test(value) ? true : message;
  };
}

export function email(message = 'Invalid email address'): ValidationRule<string> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (value: string): true | string => {
    if (!value) return true;
    return emailRegex.test(value) ? true : message;
  };
}

export function url(message = 'Invalid URL'): ValidationRule<string> {
  return (value: string): true | string => {
    if (!value) return true;
    try {
      new URL(value);
      return true;
    } catch {
      return message;
    }
  };
}

// ============================================================================
// Number Validators
// ============================================================================

export function min(minValue: number, message?: string): ValidationRule<number | null> {
  const msg = message ?? `Must be at least ${minValue}`;
  return (value: number | null): true | string => {
    if (value === null || value === undefined) return true;
    return value >= minValue ? true : msg;
  };
}

export function max(maxValue: number, message?: string): ValidationRule<number | null> {
  const msg = message ?? `Must be at most ${maxValue}`;
  return (value: number | null): true | string => {
    if (value === null || value === undefined) return true;
    return value <= maxValue ? true : msg;
  };
}

export function between(
  minValue: number,
  maxValue: number,
  message?: string
): ValidationRule<number | null> {
  const msg = message ?? `Must be between ${minValue} and ${maxValue}`;
  return (value: number | null): true | string => {
    if (value === null || value === undefined) return true;
    return value >= minValue && value <= maxValue ? true : msg;
  };
}

export function integer(message = 'Must be an integer'): ValidationRule<number | null> {
  return (value: number | null): true | string => {
    if (value === null || value === undefined) return true;
    return Number.isInteger(value) ? true : message;
  };
}

// ============================================================================
// Date Validators
// ============================================================================

function resolveDate(date: DateInput, values: FormValues): Date {
  if (typeof date === 'function') {
    return date(values);
  }
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
}

function parseValue(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'string') return new Date(value);
  return null;
}

export function minDate(date: DateInput, message?: string): ValidationRule {
  return (value: unknown, values: FormValues): true | string => {
    const parsed = parseValue(value);
    if (!parsed) return true;

    const minD = resolveDate(date, values);
    const msg = message ?? `Date must be on or after ${minD.toLocaleDateString()}`;
    return parsed >= minD ? true : msg;
  };
}

export function maxDate(date: DateInput, message?: string): ValidationRule {
  return (value: unknown, values: FormValues): true | string => {
    const parsed = parseValue(value);
    if (!parsed) return true;

    const maxD = resolveDate(date, values);
    const msg = message ?? `Date must be on or before ${maxD.toLocaleDateString()}`;
    return parsed <= maxD ? true : msg;
  };
}

export function afterField(fieldName: string, message?: string): ValidationRule {
  return (value: unknown, values: FormValues): true | string => {
    const parsed = parseValue(value);
    if (!parsed) return true;

    const otherValue = values[fieldName];
    const otherDate = parseValue(otherValue);
    if (!otherDate) return true;

    const msg = message ?? `Must be after ${fieldName}`;
    return parsed > otherDate ? true : msg;
  };
}

export function beforeField(fieldName: string, message?: string): ValidationRule {
  return (value: unknown, values: FormValues): true | string => {
    const parsed = parseValue(value);
    if (!parsed) return true;

    const otherValue = values[fieldName];
    const otherDate = parseValue(otherValue);
    if (!otherDate) return true;

    const msg = message ?? `Must be before ${fieldName}`;
    return parsed < otherDate ? true : msg;
  };
}

// ============================================================================
// File Validators
// ============================================================================

export function maxFileSize(bytes: number, message?: string): ValidationRule<File | File[] | null> {
  const sizeMB = (bytes / (1024 * 1024)).toFixed(2);
  const msg = message ?? `File size must not exceed ${sizeMB} MB`;

  return (value: File | File[] | null): true | string => {
    if (!value) return true;

    const files = Array.isArray(value) ? value : [value];
    for (const file of files) {
      if (file.size > bytes) return msg;
    }
    return true;
  };
}

export function fileType(types: string[], message?: string): ValidationRule<File | File[] | null> {
  const msg = message ?? `Allowed file types: ${types.join(', ')}`;

  return (value: File | File[] | null): true | string => {
    if (!value) return true;

    const files = Array.isArray(value) ? value : [value];
    for (const file of files) {
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
      const mimeMatch = types.some(
        (type) => file.type === type || file.type.startsWith(type.replace('*', ''))
      );
      const extMatch = types.some((type) => type.toLowerCase() === fileExt);

      if (!mimeMatch && !extMatch) return msg;
    }
    return true;
  };
}

// ============================================================================
// Comparison Validators
// ============================================================================

export function sameAs(fieldName: string, message?: string): ValidationRule {
  const msg = message ?? `Must match ${fieldName}`;
  return (value: unknown, values: FormValues): true | string => {
    if (!value) return true;
    return value === values[fieldName] ? true : msg;
  };
}

export function differentFrom(fieldName: string, message?: string): ValidationRule {
  const msg = message ?? `Must be different from ${fieldName}`;
  return (value: unknown, values: FormValues): true | string => {
    if (!value) return true;
    return value !== values[fieldName] ? true : msg;
  };
}

// ============================================================================
// Custom Validator
// ============================================================================

export function custom<T = unknown>(
  validator: (value: T, values: FormValues) => boolean | string | Promise<boolean | string>,
  message = 'Invalid value'
): ValidationRule<T> {
  return async (value: T, values: FormValues): Promise<true | string> => {
    const result = await validator(value, values);
    if (result === true) return true;
    if (result === false) return message;
    return result;
  };
}
