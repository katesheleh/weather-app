import {API_KEY, instance} from "./api";
import {searchPlaceResponseType} from "../types/common-types";


export const searchAPI = {
    place(place: string) {
        return instance.get<searchPlaceResponseType[]>(`/search.json?key=${API_KEY}&q=${place}`)
    }
}
