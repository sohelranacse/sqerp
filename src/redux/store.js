import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from "./userRedux"
// eslint-disable-next-line
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// custom reducer
import hrdReducer from "./hrdRedux"
import salesReducer from "./salesRedux"

// constant reducer configuration
const persistConfig = {
  key: 'root', version: 1, storage,
  blacklist: ['hrd','sales']
}

// custom reducer configuration
const hrdConfig = {
  key: 'hrd', storage,
  blacklist: ['employeeSearchList','com_name_search']
}
const salesConfig = {
  key: 'sales', storage,
  blacklist: ['DailySalesCollectionList','ItemTypeNameRedux']
}

// root reducer
const rootReducer = combineReducers({
  user: userReducer,
  hrd: persistReducer(hrdConfig, hrdReducer),
  sales: persistReducer(salesConfig, salesReducer)
})

// reducer persisted
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   immutableCheck: false,
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false
    })
})
export let persistor = persistStore(store)