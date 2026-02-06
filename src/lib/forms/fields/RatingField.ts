import { BaseField } from './BaseField';
import type { FieldType, RatingFieldConfig } from '../types';

export class RatingField extends BaseField<number, RatingFieldConfig> {
  readonly type: FieldType = 'rating';

  constructor(config: RatingFieldConfig = {}) {
    super({
      default: 0,
      length: 5,
      hover: true,
      ...config,
    });
  }
}
