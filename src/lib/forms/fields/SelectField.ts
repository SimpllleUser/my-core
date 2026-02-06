import { BaseField } from './BaseField';
import type { FieldType, SelectFieldConfig } from '../types';

export class SelectField<T = unknown> extends BaseField<T, SelectFieldConfig<T>> {
  readonly type: FieldType = 'select';

  constructor(config: SelectFieldConfig<T>) {
    super({
      itemTitle: 'title',
      itemValue: 'value',
      ...config,
    });
  }
}
