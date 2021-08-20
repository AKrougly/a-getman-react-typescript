import { v1 as uuid } from 'uuid';
import { enumActions, AppActions, IItem } from '../stores/types';

const itemAction = (item: IItem, action: AppActions): IItem => {
  switch (action.type) {
    case enumActions.ADD_ITEM:
      return {
        uid: action.payload.item.uid,
        name: action.payload.item.name,
        url: action.payload.item.url,
        httpMethod: action.payload.item.httpMethod,
        time: Date(),
        response: "",
        error:  "",
        sended: "NOT_SENDED",
        completed: false,
        deleted: false,
      };
    case enumActions.CHANGE_ITEM:
      if (item.uid !== action.payload.item.uid) {
        return item;
      }
      return {
        ...item,
        name: action.payload.item.name,
        url: action.payload.item.url,
        httpMethod: action.payload.item.httpMethod,
        time: Date(),
        response: action.payload.item.response,
        error:  action.payload.item.error,
        sended: action.payload.item.sended,
        completed: action.payload.item.completed,
        deleted: action.payload.item.deleted,
      };
    default:
      return item;
  }
};

export default function itemsReducer(state: IItem[] = [], action: AppActions): IItem[] {
  switch (action.type) {
    case enumActions.INIT_STATE:
      return action.payload.initialAppState.items;
    case enumActions.LOAD_STATE:
      return action.payload.state.items;
    case enumActions.ADD_ITEM:
      return [...state, itemAction(undefined, action)];
    case enumActions.CHANGE_ITEM:
      return state.map(t =>
        itemAction(t, action)
      );
    case enumActions.IMPORT_ITEMS_SUCCESS:
      console.log(JSON.stringify(action.payload.items));
      return action.payload.items.map((item, idx) => {
        return { ...item, uid: uuid(), time: Date()};
      });
    case enumActions.EXPORT_ITEMS_SUCCESS:
      var text = JSON.stringify(state, null, '  ')/*.replace(/\\/g, '')*/;
      navigator.clipboard.writeText(text);
      return state;
    default:
      return state;
  }
}
