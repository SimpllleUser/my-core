export type CompName = 'VBtn' | 'VChip' | 'VAlert' | 'VRow' | 'VCol' | 'Div';

export type PaletteItem = {
  id: number;
  type: any;
  name: CompName;
  props: Record<string, any>;
  children?: PaletteItem[];
};
