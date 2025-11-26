import type { Ref } from 'vue';
import type { PaletteItem } from '../types';
import { REGISTRY } from './registry';
import { useSelection } from './useSelection';

const genId = () => Date.now() + Math.floor(Math.random() * 1e6);

type ParentLoc = { parent: PaletteItem[]; index: number } | null;

function findParent(list: PaletteItem[], id: number): ParentLoc {
  for (let i = 0; i < list.length; i++) {
    const n = list[i];
    if (n.id === id) return { parent: list, index: i };
    if (n.children?.length) {
      const r = findParent(n.children, id);
      if (r) return r;
    }
  }
  return null;
}

export function useGroup(canvas: Ref<PaletteItem[]>) {
  const { selectedIds, selectOne } = useSelection();

  const canGroup = (): boolean => {
    if (selectedIds.value.length < 2) return false;
    const locs = selectedIds.value.map(id => findParent(canvas.value, id)).filter(Boolean) as ParentLoc[];
    if (!locs.length) return false;
    const firstParent = locs[0]!.parent;
    return locs.every(l => l!.parent === firstParent);
  };

  const groupIntoDiv = () => {
    if (!canGroup()) return;
    const ids = selectedIds.value.slice();
    const locs = ids.map(id => findParent(canvas.value, id)) as ParentLoc[];
    const parent = locs[0]!.parent;
    const orderIdx = parent.map((n, i) => (ids.includes(n.id) ? i : -1)).filter(i => i >= 0);
    const insertIndex = Math.min(...orderIdx);
    const nodes = parent.filter(n => ids.includes(n.id));
    const before = parent.slice(0, insertIndex).filter(n => !ids.includes(n.id));
    const after = parent.slice(insertIndex).filter(n => !ids.includes(n.id));

    const wrapper: PaletteItem = {
      id: genId(),
      name: 'Div',
      type: REGISTRY.Div,
      props: { class: '' },
      children: nodes
    };

    parent.splice(0, parent.length, ...before, wrapper, ...after);
    selectOne(wrapper.id);
  };

  return { canGroup, groupIntoDiv };
}
