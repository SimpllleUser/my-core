import { BaseField } from './BaseField';
import type { FieldType, DateFieldConfig } from '../types';

export class DateField extends BaseField<string | Date | null, DateFieldConfig> {
  readonly type: FieldType = 'date';

  constructor(config: DateFieldConfig = {}) {
    super({
      default: null,
      prependInnerIcon: 'mdi-calendar',
      format: 'YYYY-MM-DD',
      ...config,
    });
  }
}
