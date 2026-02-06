import type {
  FieldType,
  FieldDefinition,
  ValidationRule,
  VisibilityCallback,
  DisabledCallback,
  BaseFieldConfig,
} from '../types';

export abstract class BaseField<T = unknown, C extends BaseFieldConfig<T> = BaseFieldConfig<T>> {
  abstract readonly type: FieldType;

  protected _name: string = '';
  protected _config: C;

  constructor(config: C) {
    this._config = config;
  }

  get name(): string {
    return this._name;
  }

  setName(name: string): void {
    this._name = name;
  }

  get label(): string | undefined {
    return this._config.label;
  }

  get placeholder(): string | undefined {
    return this._config.placeholder;
  }

  get hint(): string | undefined {
    return this._config.hint;
  }

  get validation(): ValidationRule<T>[] {
    return this._config.validation ?? [];
  }

  get default(): T | undefined {
    return this._config.default;
  }

  get visible(): boolean | VisibilityCallback {
    return this._config.visible ?? true;
  }

  get disabled(): boolean | DisabledCallback {
    return this._config.disabled ?? false;
  }

  get group(): string | undefined {
    return this._config.group;
  }

  get cols(): number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number } | undefined {
    return this._config.cols;
  }

  get config(): C {
    return this._config;
  }

  toDefinition(): FieldDefinition<T> {
    return {
      name: this._name,
      type: this.type,
      label: this.label,
      placeholder: this.placeholder,
      hint: this.hint,
      validation: this.validation,
      default: this.default,
      visible: this.visible,
      disabled: this.disabled,
      group: this.group,
      cols: this.cols,
      config: this.getComponentConfig(),
    };
  }

  protected getComponentConfig(): Record<string, unknown> {
    const {
      label,
      placeholder,
      hint,
      validation,
      default: defaultValue,
      visible,
      disabled,
      group,
      cols,
      ...rest
    } = this._config as Record<string, unknown>;

    return rest;
  }
}

// Type guard to check if a value is a field
export function isField(value: unknown): value is BaseField {
  return value instanceof BaseField;
}
