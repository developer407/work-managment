import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import authReducer from "../Authentication/Reducer";
import companyReducer from "../Company/Reducer";
import filesReducer from "../Files/Reducer";
import eventsReducer from "../Events/Reducer";
import toolReducer from "../Tools/reducer";




const rootReducer=combineReducers({

    auth:authReducer,
    company:companyReducer,
    file:filesReducer,
    event:eventsReducer,
    tool:toolReducer,
   
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))