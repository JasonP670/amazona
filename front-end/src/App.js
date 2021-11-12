import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { removeShippingAddress, selectShoppingCart } from "./slices/cartSlice";
import { useSelector } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { selectUserData, signout } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import { clearCart } from "./slices/cartSlice";
import OrderScreen from "./screens/OrderScreen";

function App() {
  const cart = useSelector(selectShoppingCart);
  const userData = useSelector(selectUserData);
  let name;
  if (userData) {
    name = userData.name;
  }

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
    dispatch(removeShippingAddress());
  };

  const clear = () => {
    dispatch(clearCart());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              Amazona
            </Link>
          </div>
          <div>
            <Link to="/cart" alt="">
              Cart
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </Link>
            {name ? (
              <div className="dropdown">
                <Link to="#">
                  {name} <i className="fas fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
        </main>
        <footer className="row center">All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
