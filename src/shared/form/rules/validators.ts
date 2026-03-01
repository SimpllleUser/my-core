import type { ValidationRule } from '../types/field.types'
import { messages } from './messages'

export const required =
  (message = messages.required): ValidationRule =>
  value => {
    if (value === null || value === undefined || value === '') return message
    if (Array.isArray(value) && value.length === 0) return message
    return true
  }

export const email =
  (message = messages.email): ValidationRule =>
  value => {
    if (!value) return true
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(value)) || message
  }

export const url =
  (message = messages.url): ValidationRule =>
  value => {
    if (!value) return true
    try {
      new URL(String(value))
      return true
    } catch {
      return message
    }
  }

export const numeric =
  (message = messages.numeric): ValidationRule =>
  value => {
    if (!value) return true
    return !isNaN(Number(value)) || message
  }

export const integer =
  (message = messages.integer): ValidationRule =>
  value => {
    if (value === null || value === undefined || value === '') return true
    return Number.isInteger(Number(value)) || message
  }

export const pattern =
  (regex: RegExp, message = messages.pattern): ValidationRule =>
  value => {
    if (!value) return true
    return regex.test(String(value)) || message
  }

export const minLength =
  (min: number, message?: string): ValidationRule =>
  value => {
    if (!value) return true
    return String(value).length >= min || (message ?? messages.minLength(min))
  }

export const maxLength =
  (max: number, message?: string): ValidationRule =>
  value => {
    if (!value) return true
    return String(value).length <= max || (message ?? messages.maxLength(max))
  }

export const min =
  (minVal: number, message?: string): ValidationRule =>
  value => {
    if (value === null || value === undefined || value === '') return true
    return Number(value) >= minVal || (message ?? messages.min(minVal))
  }

export const max =
  (maxVal: number, message?: string): ValidationRule =>
  value => {
    if (value === null || value === undefined || value === '') return true
    return Number(value) <= maxVal || (message ?? messages.max(maxVal))
  }

export const sameAs =
  (getValue: () => unknown, message = messages.sameAs): ValidationRule =>
  value =>
    value === getValue() || message
