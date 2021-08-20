import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppActions, IAppState, IItem, IVisibilityFilter, IPalette } from '../stores/types';

import {
  loadState
} from '../stores/api/apiLocalStorage';

import {
  importItems,
  exportItems,
} from '../stores/api/apiFile';

import {
  sendItem,
} from '../stores/api/apiAxios';

import {
  addItem,
  changeItem,
  changePalette,
  setVisibilityFilter,
  toggleShowProgressBar,
  toggleShowDeleted,
  toggleFilter
} from '../stores/actions';

import AppRouter from '../layouts/AppRouter';

const mapStateToProps = ( appState: IAppState) => {
  return appState;
}

const mapDispatcherToProps = (dispatch: ThunkDispatch<IAppState, void, AppActions>) => {
  return {
    loadState: () => dispatch(loadState()),
    importItems: (file: string) => dispatch(importItems(file)),
    exportItems: () => dispatch(exportItems()),
    addItem: (item: IItem) => dispatch(addItem(item)),
    changeItem: (item: IItem) => dispatch(changeItem(item)),
    sendItem: (item: IItem, items: IItem[]) => dispatch(sendItem(item, items)),
    changePalette: (palette: IPalette) => dispatch(changePalette(palette)),
    setVisibilityFilter: (value: IVisibilityFilter) => dispatch(setVisibilityFilter(value)),
    toggleShowProgressBar: () => dispatch(toggleShowProgressBar()),
    toggleShowDeleted: () => dispatch(toggleShowDeleted()),
    toggleFilter: () => dispatch(toggleFilter()),
  }
}

export type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>;

export default connect(mapStateToProps, mapDispatcherToProps)(AppRouter);
