<script lang="ts">
import { defineComponent, h } from 'vue';
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import { VRow, VCol } from 'vuetify/components';
import type { PaletteItem } from '../types';
import { useDnDGroups } from '../model/useDnDGroups';

export default defineComponent({
  name: 'Node',
  props: {
    node: { type: Object as () => PaletteItem, required: true },
    selectedId: { type: Number, default: null }
  },
  emits: ['update:selectedId'],
  setup(_, { emit }) {
    const { groupCanvas } = useDnDGroups();
    const select = (id: number) => emit('update:selectedId', id);
    return { groupCanvas, select };
  },
  render() {
    const n = this.$props.node as PaletteItem;

    if (n.name === 'VRow') {
      if (!n.children) n.children = [];
      return h(
        Draggable as any,
        {
          modelValue: n.children,
          'onUpdate:modelValue': (v: PaletteItem[]) => (n.children = v),
          itemKey: 'id',
          group: this.groupCanvas,
          tag: VRow,
          class: [
            'row-decor',
            'bg-blue-lighten-4',
            'pa-3',
            'rounded-lg',
            this.$props.selectedId === n.id ? 'selected' : ''
          ],
          onClick: (e: Event) => {
            e.stopPropagation();
            this.select(n.id);
          }
        },
        {
          default: () => [
            h('div', { class: 'box-label position-absolute text-caption' }, 'VRow'),
            ...(n.children!.length
              ? n.children!.map(child =>
                  h((this as any).$options, {
                    node: child,
                    selectedId: this.$props.selectedId,
                    'onUpdate:selectedId': (id: number) => this.$emit('update:selectedId', id),
                    key: child.id
                  })
                )
              : [
                  h(
                    VCol as any,
                    { cols: 12, class: 'text-grey-darken-1 text-caption py-6', key: 'placeholder' },
                    'Перетягніть сюди компонент'
                  )
                ])
          ]
        }
      );
    }

    if (n.name === 'VCol') {
      if (!n.children) n.children = [];
      return h(
        VCol as any,
        {
          ...n.props,
          class: [
            'col-decor',
            'bg-green-lighten-4',
            'pa-3',
            'rounded-lg',
            this.$props.selectedId === n.id ? 'selected' : ''
          ],
          onClick: (e: Event) => {
            e.stopPropagation();
            this.select(n.id);
          }
        },
        {
          default: () => [
            h('div', { class: 'box-label position-absolute text-caption' }, `VCol (cols: ${n.props?.cols ?? ''})`),
            h(
              Draggable as any,
              {
                modelValue: n.children,
                'onUpdate:modelValue': (v: PaletteItem[]) => (n.children = v),
                itemKey: 'id',
                group: this.groupCanvas,
                tag: 'div',
                class: ['inner-list', 'bg-green-lighten-5', 'pa-3', 'rounded-lg']
              },
              {
                default: () =>
                  n.children!.length
                    ? n.children!.map(child =>
                        h((this as any).$options, {
                          node: child,
                          selectedId: this.$props.selectedId,
                          'onUpdate:selectedId': (id: number) => this.$emit('update:selectedId', id),
                          key: child.id
                        })
                      )
                    : [h('div', { class: 'inner-placeholder text-caption' }, 'Put here')]
              }
            )
          ]
        }
      );
    }

    const Comp = n.type as any;
    return h(
      'div',
      {
        class: ['leaf', this.$props.selectedId === n.id ? 'selected' : ''],
        onClick: (e: Event) => {
          e.stopPropagation();
          this.select(n.id);
        }
      },
      [h(Comp, n.props, { default: () => n.props?.text })]
    );
  }
});
</script>
