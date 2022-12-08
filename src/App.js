import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-action";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

let isInitial = true;
function App() {
  const isShow = useSelector((state) => state.show.showCart);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.show.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isShow && <Cart />}

        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
