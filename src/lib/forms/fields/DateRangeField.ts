import { BaseField } from './BaseField';
import type { FieldType, DateRangeFieldConfig } from '../types';

export class DateRangeField extends BaseField<
  [string | Date | null, string | Date | null],
  DateRangeFieldConfig
> {
  readonly type: FieldType = 'date-range';

  constructor(config: DateRangeFieldConfig = {}) {
    super({
      default: [null, null],
      prependInnerIcon: 'mdi-calendar-range',
      format: 'YYYY-MM-DD',
      startLabel: 'Start Date',
      endLabel: 'End Date',
      ...config,
    });
  }
}
