import { BaseField } from './BaseField';
import type { FieldType, EmailFieldConfig } from '../types';

export class EmailField extends BaseField<string, EmailFieldConfig> {
  readonly type: FieldType = 'email';

  constructor(config: EmailFieldConfig = {}) {
    super({
      default: '',
      prependInnerIcon: 'mdi-email-outline',
      ...config,
    });
  }
}
