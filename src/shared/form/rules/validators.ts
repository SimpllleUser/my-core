import type { ValidationRule } from '../types/field.types'

export const required =
  (message = "Поле обов'язкове"): ValidationRule =>
  value => {
    if (value === null || value === undefined || value === '') return message
    if (Array.isArray(value) && value.length === 0) return message
    return true
  }

export const email =
  (message = 'Невірний формат email'): ValidationRule =>
  value => {
    if (!value) return true
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(value)) || message
  }

export const minLength =
  (min: number, message?: string): ValidationRule =>
  value => {
    if (!value) return true
    return String(value).length >= min || (message ?? `Мінімум ${min} символів`)
  }

export const maxLength =
  (max: number, message?: string): ValidationRule =>
  value => {
    if (!value) return true
    return String(value).length <= max || (message ?? `Максимум ${max} символів`)
  }

export const pattern =
  (regex: RegExp, message = 'Невірний формат'): ValidationRule =>
  value => {
    if (!value) return true
    return regex.test(String(value)) || message
  }

export const numeric =
  (message = 'Тільки числа'): ValidationRule =>
  value => {
    if (!value) return true
    return !isNaN(Number(value)) || message
  }

export const min =
  (minVal: number, message?: string): ValidationRule =>
  value => {
    if (value === null || value === undefined || value === '') return true
    return Number(value) >= minVal || (message ?? `Мінімальне значення: ${minVal}`)
  }

export const max =
  (maxVal: number, message?: string): ValidationRule =>
  value => {
    if (value === null || value === undefined || value === '') return true
    return Number(value) <= maxVal || (message ?? `Максимальне значення: ${maxVal}`)
  }

export const sameAs =
  (getValue: () => unknown, message = 'Значення не співпадають'): ValidationRule =>
  value =>
    value === getValue() || message
