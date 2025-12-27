import { BaseField } from './BaseField';
import type { FieldType, FileFieldConfig } from '../types';

export class FileField extends BaseField<File | File[] | null, FileFieldConfig> {
  readonly type: FieldType = 'file';

  constructor(config: FileFieldConfig = {}) {
    super({
      default: null,
      prependIcon: 'mdi-paperclip',
      showSize: true,
      ...config,
    });
  }
}
