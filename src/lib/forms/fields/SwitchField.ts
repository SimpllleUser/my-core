import { BaseField } from './BaseField';
import type { FieldType, SwitchFieldConfig } from '../types';

export class SwitchField extends BaseField<boolean, SwitchFieldConfig> {
  readonly type: FieldType = 'switch';

  constructor(config: SwitchFieldConfig = {}) {
    super({
      default: false,
      ...config,
    });
  }
}
