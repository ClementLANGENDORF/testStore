import { combineReducers } from 'redux';
import products from './ProductReducer';
import cart from './CartReducer';
import categories from './CategoriesReducer'

const RootReducer = combineReducers({
	categories,
	products,
	cart
});

export default RootReducer;
