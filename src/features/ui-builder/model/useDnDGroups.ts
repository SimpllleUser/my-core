type PutFunction = (to: any, from: any, dragEl: HTMLElement) => boolean;

const isVCol = (el: HTMLElement): boolean => el.getAttribute('data-type') === 'VCol';

const putOnlyVCol: PutFunction = (_to, _from, dragEl) => isVCol(dragEl);
const putAny: PutFunction = () => true;

export function useDnDGroups() {
  const groupPalette = { name: 'vuetify', pull: 'clone', put: false };
  const groupCanvas = { name: 'vuetify', pull: true, put: putAny };
  const groupRow = { name: 'vuetify', pull: true, put: putOnlyVCol };
  const groupContainer = { name: 'vuetify', pull: true, put: putAny };
  return { groupPalette, groupCanvas, groupRow, groupContainer };
}
