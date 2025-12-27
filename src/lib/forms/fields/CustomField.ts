import type { Component, Raw } from 'vue';
import { BaseField } from './BaseField';
import type { FieldType, CustomFieldConfig } from '../types';

export class CustomField<T = unknown> extends BaseField<T, CustomFieldConfig<T>> {
  readonly type: FieldType = 'custom';

  constructor(config: CustomFieldConfig<T>) {
    super(config);
  }

  get component(): Raw<Component> {
    return this._config.component;
  }

  get componentProps(): Record<string, unknown> {
    return this._config.props ?? {};
  }
}
