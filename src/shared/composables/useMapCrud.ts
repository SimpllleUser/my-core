import { ref } from "vue";

type Key = string | number;
type Item<T> = T & { id: Key };

export function useMapCrud<T extends { id: Key }>() {
  const items = ref<Map<Key, Item<T>>>(new Map());

  function create(item: Item<T>) {
    items.value.set(item.id, item);
  }

  function read(id: Key): Item<T> | undefined {
    return items.value.get(id);
  }

  function update(id: Key, newItem: Partial<Item<T>>) {
    const item = items.value.get(id);
    if (item) {
      items.value.set(id, { ...item, ...newItem });
    }
  }

  function remove(id: Key) {
    items.value.delete(id);
  }

  function list(): Item<T>[] {
    return Array.from(items.value.values());
  }

  return {
    items,
    create,
    read,
    update,
    remove,
  };
}
