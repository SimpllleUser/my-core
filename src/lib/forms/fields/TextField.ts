import { BaseField } from './BaseField';
import type { FieldType, TextFieldConfig } from '../types';

export class TextField extends BaseField<string, TextFieldConfig> {
  readonly type: FieldType = 'text';

  constructor(config: TextFieldConfig = {}) {
    super({
      default: '',
      ...config,
    });
  }
}
