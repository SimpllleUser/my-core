import { BaseField } from './BaseField';
import type { FieldType, PasswordFieldConfig } from '../types';

export class PasswordField extends BaseField<string, PasswordFieldConfig> {
  readonly type: FieldType = 'password';

  constructor(config: PasswordFieldConfig = {}) {
    super({
      default: '',
      toggleVisibility: true,
      prependInnerIcon: 'mdi-lock-outline',
      ...config,
    });
  }
}
