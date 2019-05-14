import Constants from "../constants/Constants";
import axios from "axios";
import * as types from "../constants/ActionTypes";


export function getCategories() {
    return (dispatch) => {
        const url = `${Constants.URL.wc}products/categories?per_page=100&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`;

        return axios.get(url).then(response => {
            dispatch({
                    type: types.GET_CATEGORIES_SUCCESS,
                    categories: response.data
                }
            )
        }).catch(err => {
            console.log(err.error);
        })
    };
}