import { IAppState } from '../types';
import {
	loadStateStarted,
	loadStateSuccess,
	loadStateFailure,
} from '../actions';
/*
export const loadState = () => {
  try {
    //localStorage.clear();
    const serializedState = localStorage.getItem('items');
    console.log(serializedState);
    if (serializedState === null) {
      return undefined;
    }
    const jsonState = JSON.parse(serializedState);
    //console.log('jsonState:'+jsonState);
    return jsonState;
  } catch (err) {
    return undefined;
  }
};
*/
export function loadState() {
	return dispatch => {
		dispatch(loadStateStarted());
		new Promise((resolve, reject) => {
			try {
				//localStorage.clear();
				resolve(JSON.parse(localStorage.getItem("a-app")) || []);
			} catch (err) {
				reject(err);
			}
		})
		.then(storageItem => {
			dispatch(loadStateSuccess(storageItem));
		})
		.catch(err => {
			dispatch(loadStateFailure(err));
		});
	};
}

export function saveState(state: IAppState) {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("a-app", serializedState);
	} catch (err) {
		// ignore write errors
	}
}
