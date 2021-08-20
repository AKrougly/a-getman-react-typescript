import { enumActions, AppActions} from '../stores/types';

export default function showDeletedReducer(showDeleted: boolean = false, action: AppActions): boolean {
  switch (action.type) {
    case enumActions.TOGGLE_SHOW_DELETED:
      return !showDeleted;
    default:
      return showDeleted;
  }
}
