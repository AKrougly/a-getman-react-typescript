import { enumActions, AppActions} from '../stores/types';

export default function filterReducer(filter: boolean = false, action: AppActions): boolean {
  switch (action.type) {
    case enumActions.TOGGLE_FILTER:
      return !filter;
    default:
      return filter;
  }
}
