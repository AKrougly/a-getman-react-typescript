import { enumActions, AppActions, IVisibilityFilter} from '../stores/types';

export default function visibilityFilterReducer(visibilityFilter: IVisibilityFilter = "SHOW_ALL", action: AppActions): IVisibilityFilter {
  switch (action.type) {
    case enumActions.SET_VISIBILITY_FILTER:
      return action.payload.visibilityFilter;
    default:
      return visibilityFilter;
  }
}
