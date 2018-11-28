import {Api} from './Api';
import {takeLatest, put, call} from "redux-saga/effects";
import * as Actions from '../actions/actionTypes';


function* fetchHome() {
    try {
        const homeData = yield call(Api.fetchHomeData());
        yield put(Actions.SAVE_HOME_DATA, homeData);
    } catch (e) {

    }
}

export default function* watchFetchHomeData() {
    yield takeLatest(Actions.FETCH_HOME_DATA, fetchHome);
}