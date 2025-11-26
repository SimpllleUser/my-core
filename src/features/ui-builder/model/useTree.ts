import type { PaletteItem } from '../types';

export function useTree() {
  const findById = (list: PaletteItem[], id: number | null): PaletteItem | null => {
    if (id == null) return null;
    for (const n of list) {
      if (n.id === id) return n;
      if (n.children?.length) {
        const f = findById(n.children, id);
        if (f) return f;
      }
    }
    return null;
  };
  return { findById };
}
