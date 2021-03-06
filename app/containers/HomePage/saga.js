import { put, all, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { fetchUsersRequest, fetchUsersSuccess, fetchUsersError } from './slice';

function* fetchUsers() {
  try {
    const response = yield axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );
    yield put(
      fetchUsersSuccess(
        response.data
          .slice(0, 5)
          .map(item => ({
            ...item,
            score: parseInt(Math.random() * 100, 10),
          }))
          .sort((a, b) => b.score - a.score),
      ),
    );
  } catch (e) {
    console.error(e);
  }
}

function* homeSagas() {
  yield all([takeLatest(fetchUsersRequest.type, fetchUsers)]);
}

export default homeSagas;
