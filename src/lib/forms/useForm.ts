import { ref, reactive, computed, watch, toRaw } from 'vue';
import type { FormValues, FieldDefinition, UseFormOptions, UseFormReturn } from './types';
import type { FormConfig } from './FormConfig';
import { validateField, validateForm, getNestedValue, setNestedValue } from './validation/validator';

export function useForm<T extends FormValues = FormValues>(
  config: FormConfig,
  options: UseFormOptions<T> = {}
): UseFormReturn<T> {
  const {
    initialValues = {},
    validateOn = 'blur',
    revalidateOn = 'change',
    asyncDebounce = 300,
  } = options;

  // Get field definitions
  const fieldDefinitions = config.getFields();

  // Build initial values from defaults + provided initial values
  const defaults = config.getDefaults() as T;
  const mergedInitialValues = { ...defaults, ...initialValues } as T;

  // Reactive state
  const values = reactive<T>({ ...mergedInitialValues }) as T;
  const errors = reactive<Partial<Record<keyof T, string>>>({});
  const touched = reactive<Partial<Record<keyof T, boolean>>>({});
  const isSubmitting = ref(false);
  const submitCount = ref(0);

  // Debounce timers for async validation
  const debounceTimers: Record<string, ReturnType<typeof setTimeout>> = {};

  // Computed properties
  const isDirty = computed(() => {
    return JSON.stringify(toRaw(values)) !== JSON.stringify(mergedInitialValues);
  });

  const isValid = computed(() => {
    return Object.keys(errors).length === 0;
  });

  const fields = computed<FieldDefinition[]>(() => {
    return fieldDefinitions.map((field) => {
      const visibleValue =
        typeof field.visible === 'function' ? field.visible(values as FormValues) : field.visible;

      const disabledValue =
        typeof field.disabled === 'function' ? field.disabled(values as FormValues) : field.disabled;

      return {
        ...field,
        visible: visibleValue,
        disabled: disabledValue,
      };
    });
  });

  // Get a specific field definition
  function getField(name: string): FieldDefinition | undefined {
    return fieldDefinitions.find((f) => f.name === name);
  }

  // Get fields by group
  function getGroup(group: string): FieldDefinition[] {
    return fieldDefinitions.filter((f) => f.group === group);
  }

  // Validate a single field
  async function validateFieldByName(name: string): Promise<boolean> {
    const field = getField(name);
    if (!field) return true;

    const value = getNestedValue(values as Record<string, unknown>, name);
    const result = await validateField(value, field.validation, {
      values: values as FormValues,
    });

    if (result.valid) {
      delete errors[name as keyof T];
    } else if (result.error) {
      (errors as Record<string, string>)[name] = result.error;
    }

    return result.valid;
  }

  // Validate all fields
  async function validate(): Promise<boolean> {
    const result = await validateForm(fieldDefinitions, values as FormValues);

    // Clear all errors first
    for (const key of Object.keys(errors)) {
      delete errors[key as keyof T];
    }

    // Set new errors
    for (const [key, error] of Object.entries(result.errors)) {
      (errors as Record<string, string>)[key] = error;
    }

    return result.valid;
  }

  // Reset form to initial values
  function reset(): void {
    Object.assign(values, { ...mergedInitialValues });

    // Clear errors
    for (const key of Object.keys(errors)) {
      delete errors[key as keyof T];
    }

    // Clear touched
    for (const key of Object.keys(touched)) {
      delete touched[key as keyof T];
    }

    submitCount.value = 0;
  }

  // Set form values
  function setValues(newValues: Partial<T>): void {
    for (const [key, value] of Object.entries(newValues)) {
      setFieldValue(key, value);
    }
  }

  // Set a single field value
  function setFieldValue(name: string, value: unknown): void {
    const updated = setNestedValue(
      values as Record<string, unknown>,
      name,
      value
    );
    Object.assign(values, updated);
  }

  // Set errors
  function setErrors(newErrors: Partial<Record<keyof T, string>>): void {
    for (const [key, error] of Object.entries(newErrors)) {
      if (error) {
        (errors as Record<string, string>)[key] = error as string;
      } else {
        delete errors[key as keyof T];
      }
    }
  }

  // Set a single field error
  function setFieldError(name: string, error: string | undefined): void {
    if (error) {
      (errors as Record<string, string>)[name] = error;
    } else {
      delete errors[name as keyof T];
    }
  }

  // Set field as touched
  function setTouched(name: string, isTouched = true): void {
    (touched as Record<string, boolean>)[name] = isTouched;
  }

  // Handle blur event
  function handleBlur(name: string): void {
    setTouched(name);

    if (validateOn === 'blur' || (submitCount.value > 0 && revalidateOn === 'blur')) {
      validateFieldByName(name);
    }
  }

  // Handle change event with debouncing for async validation
  function handleChange(name: string): void {
    if (validateOn === 'change' || (submitCount.value > 0 && revalidateOn === 'change')) {
      // Clear existing timer
      if (debounceTimers[name]) {
        clearTimeout(debounceTimers[name]);
      }

      // Debounce async validation
      debounceTimers[name] = setTimeout(() => {
        validateFieldByName(name);
      }, asyncDebounce);
    }
  }

  // Submit handler
  async function submit<R = void>(
    handler: (values: T) => Promise<R>
  ): Promise<R | undefined> {
    submitCount.value++;
    isSubmitting.value = true;

    try {
      const isFormValid = await validate();

      if (!isFormValid) {
        return undefined;
      }

      const result = await handler(toRaw(values) as T);
      return result;
    } finally {
      isSubmitting.value = false;
    }
  }

  // Watch for value changes to trigger revalidation
  watch(
    () => values,
    () => {
      // Revalidation is handled in handleChange
    },
    { deep: true }
  );

  return {
    // State
    values,
    errors: errors as Partial<Record<keyof T, string>>,
    touched: touched as Partial<Record<keyof T, boolean>>,
    isDirty: isDirty.value,
    isSubmitting: isSubmitting.value,
    isValid: isValid.value,
    fields: fields.value,

    // Methods
    getField,
    getGroup,
    validate,
    validateField: validateFieldByName,
    reset,
    setValues,
    setFieldValue,
    setErrors,
    setFieldError,
    setTouched,
    submit,
    handleBlur,
    handleChange,
  };
}
