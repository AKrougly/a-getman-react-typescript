import { enumActions, AppActions, IPalette, initPalette, } from '../stores/types';

export default function paletteReducer(state: IPalette = initPalette, action: AppActions): IPalette {
  switch (action.type) {
    case enumActions.CHANGE_PALETTE:
      const {primary, secondary, type}: IPalette = action.payload.palette;
      return {...state, primary, secondary, type };
    default:
      return state;
  }
}
