import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {productListReducer,productDetailsReducer} from './reducers/productReducer'
import {userLoginReducer} from './reducers/userReducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import  cartReducer  from './reducers/cartReducers'
const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer

})
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
    userLogin:{userInfo:userInfoFromStorage}
};

  
const middleWare=[thunk]
const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
)  
export  default store