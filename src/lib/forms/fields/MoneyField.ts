import { BaseField } from './BaseField';
import type { FieldType, MoneyFieldConfig } from '../types';

export class MoneyField extends BaseField<number | null, MoneyFieldConfig> {
  readonly type: FieldType = 'money';

  constructor(config: MoneyFieldConfig = {}) {
    super({
      default: null,
      currency: 'USD',
      currencyDisplay: 'symbol',
      locale: 'en-US',
      precision: 2,
      ...config,
    });
  }
}
