<script lang="ts">
import { defineComponent, h } from 'vue';
import { VueDraggableNext as Draggable } from 'vue-draggable-next';
import { VRow, VCol, VBtn } from 'vuetify/components';
import type { PaletteItem } from '../types';

export default defineComponent({
  name: 'Node',
  props: {
    node: { type: Object as () => PaletteItem, required: true },
    selectedIds: { type: Array as () => number[], required: true }
  },
  emits: ['click-node', 'remove', 'changed'],
  setup(_, { emit }) {
    const clickNode = (id: number, meta: boolean) => emit('click-node', { id, meta });
    const remove = (id: number, e?: Event) => {
      if (e) e.stopPropagation();
      emit('remove', id);
    };
    const changed = () => emit('changed');
    const actions = (id: number) =>
      h('div', { class: 'node-actions' }, [
        h(VBtn as any, {
          icon: 'mdi-delete',
          size: 'x-small',
          variant: 'text',
          density: 'comfortable',
          onClick: (e: Event) => remove(id, e)
        })
      ]);
    return { clickNode, actions, changed };
  },
  render() {
    const n = this.$props.node as PaletteItem;
    const isSelected = this.$props.selectedIds.includes(n.id);

    const handleClick = (e: Event) => {
      const me = e as MouseEvent;
      this.clickNode(n.id, !!(me.metaKey || me.ctrlKey));
      e.stopPropagation();
    };

    if (n.name === 'VRow') {
      if (!n.children) n.children = [];
      return h(
        Draggable as any,
        {
          modelValue: n.children,
          'onUpdate:modelValue': (v: PaletteItem[]) => {
            n.children = v;
            this.changed();
          },
          itemKey: 'id',
          group: { name: 'vuetify', pull: true, put: true },
          tag: VRow,
          class: ['row-decor', 'bg-blue-lighten-4', 'pa-3', 'rounded-lg', isSelected ? 'selected' : ''],
          onClick: handleClick
        },
        {
          default: () => [
            h('div', { class: 'box-label position-absolute text-caption' }, 'VRow'),
            this.actions(n.id),
            ...(n.children!.length
              ? n.children!.map(child =>
                  h((this as any).$options, {
                    node: child,
                    selectedIds: this.$props.selectedIds,
                    onClickNode: (p: any) => this.$emit('click-node', p),
                    onRemove: (id: number) => this.$emit('remove', id),
                    onChanged: () => this.$emit('changed'),
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
          class: ['col-decor', 'bg-green-lighten-4', 'pa-3', 'rounded-lg', isSelected ? 'selected' : ''],
          onClick: handleClick
        },
        {
          default: () => [
            h('div', { class: 'box-label position-absolute text-caption' }, `VCol (cols: ${n.props?.cols ?? ''})`),
            this.actions(n.id),
            h(
              Draggable as any,
              {
                modelValue: n.children,
                'onUpdate:modelValue': (v: PaletteItem[]) => {
                  n.children = v;
                  this.changed();
                },
                itemKey: 'id',
                group: { name: 'vuetify', pull: true, put: true },
                tag: 'div',
                class: ['inner-list', 'bg-green-lighten-5', 'pa-3', 'rounded-lg']
              },
              {
                default: () =>
                  n.children!.length
                    ? n.children!.map(child =>
                        h((this as any).$options, {
                          node: child,
                          selectedIds: this.$props.selectedIds,
                          onClickNode: (p: any) => this.$emit('click-node', p),
                          onRemove: (id: number) => this.$emit('remove', id),
                          onChanged: () => this.$emit('changed'),
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

    if (n.name === 'Div') {
      if (!n.children) n.children = [];
      return h(
        'div',
        {
          class: ['group-decor', 'bg-grey-lighten-4', 'pa-3', 'rounded-lg', isSelected ? 'selected' : ''],
          onClick: handleClick
        },
        [
          h('div', { class: 'box-label position-absolute text-caption' }, 'DIV'),
          this.actions(n.id),
          h(
            Draggable as any,
            {
              modelValue: n.children,
              'onUpdate:modelValue': (v: PaletteItem[]) => {
                n.children = v;
                this.changed();
              },
              itemKey: 'id',
              group: { name: 'vuetify', pull: true, put: true },
              tag: 'div',
              class: ['inner-list', 'bg-grey-lighten-5', 'pa-3', 'rounded-lg']
            },
            {
              default: () =>
                n.children!.length
                  ? n.children!.map(child =>
                      h((this as any).$options, {
                        node: child,
                        selectedIds: this.$props.selectedIds,
                        onClickNode: (p: any) => this.$emit('click-node', p),
                        onRemove: (id: number) => this.$emit('remove', id),
                        onChanged: () => this.$emit('changed'),
                        key: child.id
                      })
                    )
                  : [h('div', { class: 'inner-placeholder text-caption' }, 'Put here')]
            }
          )
        ]
      );
    }

    const Comp = n.type as any;
    return h(
      'div',
      {
        class: ['leaf', isSelected ? 'selected' : ''],
        onClick: handleClick,
        style: { position: 'relative' }
      },
      [this.actions(n.id), h(Comp, n.props, { default: () => n.props?.text })]
    );
  }
});
</script>
