import { BaseField } from './BaseField';
import type { FieldType, NumberFieldConfig } from '../types';

export class NumberField extends BaseField<number | null, NumberFieldConfig> {
  readonly type: FieldType = 'number';

  constructor(config: NumberFieldConfig = {}) {
    super({
      default: null,
      ...config,
    });
  }
}
