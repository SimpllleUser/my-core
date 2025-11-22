import { ref } from 'vue';

type Key = string | number;
type Item<T> = T & { id: Key };

export function useArrayCrud<T extends { id: Key }>() {
  const items = ref<Item<T>[]>([]);

  function create(item: Item<T>) {
    items.value = [...items.value, item];
  }

  function read(id: Key): Item<T> | undefined {
    return items.value.find(item => item.id === id);
  }

  function update(id: Key, newItem: Partial<Item<T>>) {
    const index = items.value.findIndex(item => item.id === id);
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...newItem };
    }
  }

  function remove(id: Key) {
    items.value = items.value.filter(item => item.id !== id);
  }

  function list(): Item<T>[] {
    return items.value;
  }

  return {
    items,
    create,
    read,
    update,
    remove
  };
}
