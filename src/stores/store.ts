import { createStore, Reducer, CombinedState, AnyAction, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';

import { initialAppState, IAppState, } from './types';
import { rootReducer } from '../reducers/rootReducer';
import { loadState, saveState } from './api/apiLocalStorage';

const store = createStore<Reducer<CombinedState<IAppState>, AnyAction>, any, any, any> (
  rootReducer, initialAppState, applyMiddleware(thunk),
);

store.dispatch(loadState());

store.subscribe(() => saveState(store.getState()));

export default store;