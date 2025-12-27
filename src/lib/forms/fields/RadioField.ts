import { BaseField } from './BaseField';
import type { FieldType, RadioFieldConfig } from '../types';

export class RadioField<T = unknown> extends BaseField<T, RadioFieldConfig<T>> {
  readonly type: FieldType = 'radio';

  constructor(config: RadioFieldConfig<T>) {
    super({
      ...config,
    });
  }
}
