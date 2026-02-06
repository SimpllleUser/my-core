import { BaseField } from './BaseField';
import type { FieldType, SliderFieldConfig } from '../types';

export class SliderField extends BaseField<number | [number, number], SliderFieldConfig> {
  readonly type: FieldType = 'slider';

  constructor(config: SliderFieldConfig = {}) {
    super({
      default: 0,
      min: 0,
      max: 100,
      step: 1,
      thumbLabel: 'always',
      ...config,
    });
  }
}
