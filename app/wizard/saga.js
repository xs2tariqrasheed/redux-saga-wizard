import { put, takeEvery, call } from 'redux-saga/effects';

import actions from './actions';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const actionList = actions.map(action => ({
  ...action,
  delay: action.delay || 60 * 5, // default delay 5 minutes
  isRunning: false,
  reduxAction: null,
  counter: action.delay || 60 * 5,
}));

const match = route => {
  const { pathname } = window.location;
  const routeRegEx = new RegExp(`^${route.replace(/:[^\s/]+/g, '([\\w-]+)')}$`);
  return routeRegEx.test(pathname);
};

const doesRouteMatch = ({ route, routes }) => {
  if (route) return match(route);
  if (routes) return routes.some(r => match(r));
  return false;
};

function* watchAllActions() {
  yield takeEvery('*', function* logger(action) {
    const actionIndex = actionList.findIndex(item => item.type === action.type);

    // don't need to do anything if we don't wanna auto dispatch this action.
    if (actionIndex < 0) return;

    // initialize generator/saga for this action to auto dispatch it
    if (
      action.type === actionList[actionIndex].type &&
      !actionList[actionIndex].isRunning
    ) {
      actionList[actionIndex].reduxAction = { ...action };

      yield call(dispatchActionAutomatically, {
        actionIndex,
      });
    }
    // if it's already running then update the reduxAction because we well auto dispatch with newer payload
    else if (action.type === actionList[actionIndex].type && !action.auto) {
      actionList[actionIndex].counter = actionList[actionIndex].delay;
      actionList[actionIndex].reduxAction = { ...action };
      console.log(
        'Delay reset ----> ',
        actionList[actionIndex].reduxAction,
        '  <---- Delay reset',
      );
    }
  });
}

function* dispatchActionAutomatically({ actionIndex }) {
  actionList[actionIndex].isRunning = true;
  while (doesRouteMatch({ ...actionList[actionIndex] })) {
    // we can optimize it by increase the following delay for each iteration
    yield call(delay, 1000);

    // if app isn't visible to user then do nothing.
    // eslint-disable-next-line no-continue
    if (window.document.hidden) continue;

    actionList[actionIndex].counter -= 1;
    if (actionList[actionIndex].counter === 0) {
      // auto dispatched action
      yield put({ ...actionList[actionIndex].reduxAction, auto: true });
      // after dispatching reset the delay
      actionList[actionIndex].counter = actionList[actionIndex].delay;
      console.log(
        'Auto dispatched ----> ',
        actionList[actionIndex].reduxAction,
        '  <---- Auto dispatched',
      );
    }
  }
  // if user changes the route then nullify/reset the whole action object
  actionList[actionIndex].counter = actionList[actionIndex].delay;
  actionList[actionIndex].isRunning = false;
  actionList[actionIndex].reduxAction = null;
}

export default watchAllActions;
