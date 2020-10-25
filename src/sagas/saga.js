import { put, takeEvery } from "redux-saga/effects";

function* checkLogin(value) {
  yield put({ type: "CHECK_LOGIN", value });
}

export function* checkLoginCredentials() {
  yield takeEvery("CHECK_LOGIN_CRED", checkLogin);
}
