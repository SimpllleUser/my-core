import { BaseField } from './BaseField';
import type { FieldType, TextareaFieldConfig } from '../types';

export class TextareaField extends BaseField<string, TextareaFieldConfig> {
  readonly type: FieldType = 'textarea';

  constructor(config: TextareaFieldConfig = {}) {
    super({
      default: '',
      rows: 3,
      ...config,
    });
  }
}
