import { BaseField } from './BaseField';
import type { FieldType, CheckboxFieldConfig } from '../types';

export class CheckboxField extends BaseField<boolean, CheckboxFieldConfig> {
  readonly type: FieldType = 'checkbox';

  constructor(config: CheckboxFieldConfig = {}) {
    super({
      default: false,
      ...config,
    });
  }
}
