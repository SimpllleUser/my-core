import type { ValidationRule } from '../types/field.types'

export const required =
  (message = 'Field is required'): ValidationRule =>
  value => {
    if (value === null || value === undefined || value === '') return message
    if (Array.isArray(value) && value.length === 0) return message
    return true
  }

export const email =
  (message = 'Invalid email format'): ValidationRule =>
  value => {
    if (!value) return true
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(value)) || message
  }

export const minLength =
  (min: number, message?: string): ValidationRule =>
  value => {
    if (!value) return true
    return String(value).length >= min || (message ?? `Minimum ${min} characters`)
  }

export const maxLength =
  (max: number, message?: string): ValidationRule =>
  value => {
    if (!value) return true
    return String(value).length <= max || (message ?? `Maximum ${max} characters`)
  }

export const pattern =
  (regex: RegExp, message = 'Invalid format'): ValidationRule =>
  value => {
    if (!value) return true
    return regex.test(String(value)) || message
  }

export const numeric =
  (message = 'Numbers only'): ValidationRule =>
  value => {
    if (!value) return true
    return !isNaN(Number(value)) || message
  }

export const min =
  (minVal: number, message?: string): ValidationRule =>
  value => {
    if (value === null || value === undefined || value === '') return true
    return Number(value) >= minVal || (message ?? `Minimum value: ${minVal}`)
  }

export const max =
  (maxVal: number, message?: string): ValidationRule =>
  value => {
    if (value === null || value === undefined || value === '') return true
    return Number(value) <= maxVal || (message ?? `Maximum value: ${maxVal}`)
  }

export const sameAs =
  (getValue: () => unknown, message = 'Values do not match'): ValidationRule =>
  value =>
    value === getValue() || message
