import logger from 'redux-logger';
import {persistStore} from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];

// Only add logger in the development environment
if (process.env.NODE_ENV === 'development') {
    middleWares.push(logger);
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // For redux-persist compatibility
        }).concat(middleWares)
});

try {
    sagaMiddleware.run(rootSaga);
} catch (error) {
    console.error('Failed to run saga middleware:', error);
}


export const persistor = persistStore(store);
