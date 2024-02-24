import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import authReducer from "../Authentication/Reducer";
import companyReducer from "../Company/Reducer";
import filesReducer from "../Files/Reducer";




const rootReducer=combineReducers({

    auth:authReducer,
    company:companyReducer,
    file:filesReducer,
   
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))