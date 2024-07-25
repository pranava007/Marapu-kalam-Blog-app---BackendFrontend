import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slice/UserSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import themeReducer from "./Slice/ThemeSlice";



export const rootReducer = combineReducers({
    user:UserReducer,
    theme:themeReducer,
})

const persistConfig = {
    key:"root",
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    
        reducer:persistedReducer,
        middleware:(getDefaultMiddleware)=>{
           return getDefaultMiddleware({serializableCheck:false})
        }
    
}) 

export const persistor = persistStore(store);