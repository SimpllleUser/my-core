import { BaseField } from './BaseField';
import type { FieldType, ArrayFieldConfig, FieldDefinition } from '../types';

export class ArrayField<T = unknown> extends BaseField<T[], ArrayFieldConfig<T>> {
  readonly type: FieldType = 'array';

  constructor(config: ArrayFieldConfig<T>) {
    super({
      default: [],
      addLabel: 'Add Item',
      removeLabel: 'Remove',
      sortable: false,
      ...config,
    });
  }

  get itemField(): FieldDefinition {
    return this._config.itemField;
  }

  get minItems(): number | undefined {
    return this._config.minItems;
  }

  get maxItems(): number | undefined {
    return this._config.maxItems;
  }
}
