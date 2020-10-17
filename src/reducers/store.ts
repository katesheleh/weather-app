import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {requestReducer} from "./request-reducer";
import {weatherReducer} from "./weather-reducers";



const rootReducer = combineReducers({
    weather: weatherReducer,
    request: requestReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store;