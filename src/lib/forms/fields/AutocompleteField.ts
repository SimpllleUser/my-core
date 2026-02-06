import { BaseField } from './BaseField';
import type { FieldType, AutocompleteFieldConfig } from '../types';

export class AutocompleteField<T = unknown> extends BaseField<T, AutocompleteFieldConfig<T>> {
  readonly type: FieldType = 'autocomplete';

  constructor(config: AutocompleteFieldConfig<T> = {}) {
    super({
      itemTitle: 'title',
      itemValue: 'value',
      debounce: 300,
      minSearchLength: 1,
      ...config,
    });
  }
}
