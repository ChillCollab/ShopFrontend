import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Auth from "./pages/auth/Auth.tsx";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";


const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    const [toggle, setToggle] = useState(false);
    return (
      <div className="main">
        <Navbar setToggle={setToggle} toggle={toggle}/>
        <div className="container">
          {toggle ? <div className="menuContainer">
           <Menu setToggle={setToggle}/>
          </div> : <div className="mobileMenuContainer">
            <Menu setToggle={setToggle}/>
          </div>
  }
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/admin",
          children: [
            {
              path: "home",
              element: <Home />,
            },
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "products",
              element: <Products />,
            },
            {
              path: "users/:id",
              element: <User />,
            },
            {
              path: "products/:id",
              element: <Product />,
            },
          ]
        }

      ],
    },
    {
      path: "/auth",
      element: <Auth />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
