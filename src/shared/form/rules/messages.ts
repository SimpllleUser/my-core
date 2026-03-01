export const messages = {
  required: 'Field is required',
  email: 'Invalid email format',
  url: 'Invalid URL',
  numeric: 'Numbers only',
  integer: 'Must be a whole number',
  pattern: 'Invalid format',
  sameAs: 'Values do not match',
  minLength: (min: number) => `Minimum ${min} characters`,
  maxLength: (max: number) => `Maximum ${max} characters`,
  min: (minVal: number) => `Minimum value: ${minVal}`,
  max: (maxVal: number) => `Maximum value: ${maxVal}`,
}
