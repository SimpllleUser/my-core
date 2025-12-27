import { BaseField } from './BaseField';
import type { FieldType, ColorFieldConfig } from '../types';

export class ColorField extends BaseField<string, ColorFieldConfig> {
  readonly type: FieldType = 'color';

  constructor(config: ColorFieldConfig = {}) {
    super({
      default: '#000000',
      mode: 'hex',
      ...config,
    });
  }
}
