import { BaseField } from './BaseField';
import type { FieldType, PhoneFieldConfig } from '../types';

export class PhoneField extends BaseField<string, PhoneFieldConfig> {
  readonly type: FieldType = 'phone';

  constructor(config: PhoneFieldConfig = {}) {
    super({
      default: '',
      prependInnerIcon: 'mdi-phone-outline',
      ...config,
    });
  }
}
