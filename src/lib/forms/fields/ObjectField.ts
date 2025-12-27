import { BaseField } from './BaseField';
import type { FieldType, ObjectFieldConfig, FieldDefinition } from '../types';

export class ObjectField extends BaseField<Record<string, unknown>, ObjectFieldConfig> {
  readonly type: FieldType = 'object';

  constructor(config: ObjectFieldConfig) {
    super({
      default: {},
      collapsible: false,
      defaultCollapsed: false,
      ...config,
    });
  }

  get fields(): FieldDefinition[] {
    return this._config.fields;
  }
}
