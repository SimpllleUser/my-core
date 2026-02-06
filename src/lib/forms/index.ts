// Types
export * from './types';

// Form Config
export { FormConfig } from './FormConfig';

// Composable
export { useForm } from './useForm';

// Fields
export {
  BaseField,
  isField,
  TextField,
  EmailField,
  PasswordField,
  NumberField,
  MoneyField,
  PhoneField,
  SelectField,
  AutocompleteField,
  TextareaField,
  SwitchField,
  CheckboxField,
  DateField,
  DateRangeField,
  FileField,
  ImageField,
  RadioField,
  RatingField,
  SliderField,
  ColorField,
  ArrayField,
  ObjectField,
  CustomField,
} from './fields';

// Validation
export {
  // Basic validators
  required,
  requiredIf,
  // Text validators
  minLength,
  maxLength,
  pattern,
  email,
  url,
  // Number validators
  min,
  max,
  between,
  integer,
  // Date validators
  minDate,
  maxDate,
  afterField,
  beforeField,
  // File validators
  maxFileSize,
  fileType,
  // Comparison validators
  sameAs,
  differentFrom,
  // Custom validator
  custom,
  // Validator utilities
  validateField,
  validateForm,
  getNestedValue,
  setNestedValue,
} from './validation';

// Components
export { FormField, FormActions, FormSection } from './components';

// Registry
export {
  registerFieldComponent,
  unregisterFieldComponent,
  getRegisteredComponent,
  hasRegisteredComponent,
  getRegisteredTypes,
  clearRegistry,
} from './registry';
