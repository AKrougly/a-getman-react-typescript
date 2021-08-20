import { combineReducers, Reducer, } from 'redux';

import itemsReducer from './itemsReducer';
import paletteReducer from './paletteReducer';
import visibilityFilterReducer from './visibilityFilterReducer';
import showProgressBarReducer from './showProgressBarReducer';
import showDeletedReducer from './showDeletedReducer';
import filterReducer from './filterReducer';

export const rootReducer: Reducer = combineReducers({
    items: itemsReducer,
    palette: paletteReducer,
    visibilityFilter: visibilityFilterReducer,
    showProgressBar: showProgressBarReducer,
    showDeleted: showDeletedReducer,
    filter: filterReducer,
  });
