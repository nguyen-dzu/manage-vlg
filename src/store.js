import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducers } from "./redux";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
const config = combineReducers({
    auth: reducers.authReducers,
    menu: reducers.menuReducer,
    form: reducers.formReducer,
    restaurant: reducers.restaurantReducers,
    order: reducers.orderReducer
    // banner: reducers.bannerReducer,
    // order: reducers.orderReducer,
    // news: reducers.newsReducer,
    // keyword: reducers.keyWordReducer,
    // vouchers:reducers.vouchersReducer
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    version: 1,
    // blacklist:[]
}
const persisReducerConfig = persistReducer(persistConfig, config)
const store = configureStore({
    reducer: persisReducerConfig
})
export const persistor = persistStore(store);
export default store;