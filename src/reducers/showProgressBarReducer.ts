import { enumActions, AppActions} from '../stores/types';

export default function showProgressBarReducer(showProgressBar: boolean = false, action: AppActions): boolean {
  switch (action.type) {
    case enumActions.TOGGLE_SHOW_PROGRESS_BAR:
      return !showProgressBar;
    default:
      return showProgressBar;
  }
}
