import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import SignUp from "./Pages/signUp";
import SignIn from "./Pages/signIn";
import Product from "./Pages/Product";
import Admin from "./Pages/Admin";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import MyOrders from "./Pages/MyOrders";

import AddItems from "./Components/addItems";
import ListItems from "./Components/listItems";
import OrdersItems from "./Components/ordersItems";

import { Provider } from "react-redux";
import { storeApp } from "./Store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/collection",
    element: <Collection />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/myOrders",
    element: <MyOrders />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "add",
        element: <AddItems />,
      },
      {
        path: "list",
        element: <ListItems />,
      },
      {
        path: "orders",
        element: <OrdersItems />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={storeApp}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
