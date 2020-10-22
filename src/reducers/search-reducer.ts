import {Dispatch} from 'redux'
import {errorAC, ErrorACType, isFetchingAC, isFetchingACType} from "./request-reducer";
import {searchAPI} from "../api/search-api";
import {searchPlaceResponseType} from "../types/common-types";


let initialState: InitialStateType = {
    data: [] as Array<searchPlaceResponseType>
} as InitialStateType;

export const searchReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'SEARCH_DATA':
            return {...state, data: action.data}
        case 'CLEAN_DATA':
            return {...state, data: []}
        default:
            return state;
    }
}

// Action creators
export const searchDataAC = (data: Array<searchPlaceResponseType>) => ({type: 'SEARCH_DATA', data} as const)
export const cleanDataAC = () => ({type: 'CLEAN_DATA'} as const)


// THUNK
export const searchTC = (place: string) => (dispatch: Dispatch<ActionsType | isFetchingACType | ErrorACType>) => {
    searchAPI.place(place)
        .then(res => {
            dispatch(searchDataAC(res.data))
        })
        .catch((error) => {
            dispatch(errorAC(error.response.data.error))
        })
}

// TYPES
export type InitialStateType = {
    data: Array<searchPlaceResponseType>
}

export type ActionsType = SearchDataACType | CleanDataACType

export type SearchDataACType = ReturnType<typeof searchDataAC>
export type CleanDataACType = ReturnType<typeof cleanDataAC>