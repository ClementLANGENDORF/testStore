import * as types from '../constants/ActionTypes';
import InitialState from './InitialState';

export default function (state = InitialState.categories, action) {
    switch (action.type) {
        case types.GET_CATEGORIES_SUCCESS:
            return action.categories;
        default:
            return state;
    }
}
