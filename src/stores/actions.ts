import { action } from 'typesafe-actions';
import { AxiosResponse, AxiosError } from "axios";
import { enumActions, initialAppState, SendStatus, IAppState, IItem, IPalette, IVisibilityFilter } from './types';

export function loadStateStarted() {
  return action(enumActions.INIT_STATE, {
    initialAppState
  });
}

export function loadStateSuccess(state: IAppState) {
  return action(enumActions.LOAD_STATE, {
    state
  });
};

export function loadStateFailure(err: any) {
  return action(enumActions.LOAD_STATE_FAILURE, {
    err
  });
};

export function importItemsStarted() {
  return action(enumActions.IMPORT_ITEMS_STARTED);
};

export function importItemsSuccess(items: IItem[]) {
  return action(enumActions.IMPORT_ITEMS_SUCCESS, {
    items
  })
};

export function importItemsFailure(err) {
  return action(enumActions.IMPORT_ITEMS_FAILURE, {
    err
  });
};

export function exportItemsSuccess() {
  return action(enumActions.EXPORT_ITEMS_SUCCESS);
};

export function sendItemStarted(item: IItem) {
  return action(enumActions.CHANGE_ITEM, {
    item: { ...item, response: "", error: "", sended: SendStatus.SEND_STARTED }
  });
};

export function sendItemSuccess(item: IItem, res: AxiosResponse) {
  return action(enumActions.CHANGE_ITEM, {
    item: { ...item, response: JSON.stringify(res.data), error: null, sended: SendStatus.SEND_SUCCESS, }
  });
};

function err2Str(err: AxiosError) {
  // Error 😨
  if (err.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    //console.log(err.response.data);
    //console.log(err.response.status);
    //console.log(err.response.headers);
    return JSON.stringify(err.response.data);
  } else if (err.request) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    //console.log(err.request);
    return err.request;
  } else {
    // Something happened in setting up the request and triggered an Error
    //console.log('Error', err.message);
    return 'Error:' + err.message;
  }
}

export function sendItemFailure(item: IItem, err: AxiosError) {
  return action(enumActions.CHANGE_ITEM, {
    item: { ...item, response: "", error: err2Str(err), sended: SendStatus.SEND_FAILURE, }
  });
};

export function addItem(item: IItem) {
  return action(enumActions.ADD_ITEM, {
    item
  });
}

export function changeItem(item: IItem) {
  return action(enumActions.CHANGE_ITEM, {
    item
  });
}

export function changePalette(palette: IPalette) {
  return action(enumActions.CHANGE_PALETTE, {
    palette
  });
}

export function setVisibilityFilter(visibilityFilter: IVisibilityFilter) {
  return action(enumActions.SET_VISIBILITY_FILTER, {
    visibilityFilter
  });
}

export function toggleShowProgressBar() {
  return action(enumActions.TOGGLE_SHOW_PROGRESS_BAR, {});
}

export function toggleShowDeleted() {
  return action(enumActions.TOGGLE_SHOW_DELETED, {});
}

export function toggleFilter() {
  return action(enumActions.TOGGLE_FILTER, {});
}
