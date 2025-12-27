import { BaseField } from './BaseField';
import type { FieldType, ImageFieldConfig } from '../types';

export class ImageField extends BaseField<File | File[] | null, ImageFieldConfig> {
  readonly type: FieldType = 'image';

  constructor(config: ImageFieldConfig = {}) {
    super({
      default: null,
      accept: 'image/*',
      prependIcon: 'mdi-image',
      showSize: true,
      showPreview: true,
      previewWidth: 200,
      previewHeight: 200,
      ...config,
    });
  }
}
