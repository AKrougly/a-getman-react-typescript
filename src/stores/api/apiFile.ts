import {
	importItemsStarted,
	importItemsSuccess,
	importItemsFailure,
	//
	exportItemsSuccess,
} from '../actions';

export function importItems(file: Blob) {
	return dispatch => {
		dispatch(importItemsStarted());
	
		var reader: FileReader = new FileReader();
		reader.onload = function(event: ProgressEvent<FileReader>) {
			try {
				const jsonContent = JSON.parse((event.target as FileReader).result.toString());
				dispatch(importItemsSuccess(jsonContent) || []);
			} catch(e) {
				alert(e);
				//console.error('Error JSONParse', e.message);
			}
		};
		reader.onerror = function(event) {
			dispatch(importItemsFailure(event.type));
		};
	
		reader.readAsText(file);
	};
}

export function exportItems() {
	return dispatch => {
		dispatch(exportItemsSuccess());
	};
}
