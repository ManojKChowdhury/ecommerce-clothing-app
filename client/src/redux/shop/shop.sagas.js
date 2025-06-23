import {all, call, put, takeLatest} from 'redux-saga/effects';
import {collection, getDocs} from "firebase/firestore";

import ShopActionTypes from "./shop.types";
import {convertCollectionsSnapshotToMap, fireStore} from "../../firebase/firebase.util";
import {fetchCollectionsFailure, fetchCollectionsSuccess} from "./shop.actions";

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = collection(fireStore,'collections');
        const querySnapshot = yield getDocs(collectionRef);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, querySnapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)]);
}
