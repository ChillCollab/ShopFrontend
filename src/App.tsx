import Home from "./pages/home/Home";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Auth from "./pages/auth/Auth.tsx";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";
import Navbar from "./components/navbar/Navbar.tsx";
import Menu from "./components/menu/Menu.tsx";
import Footer from "./components/footer/Footer.tsx";

const queryClient = new QueryClient();

function Layout({isMounted, setIsMounted}){
    const [toggle, setToggle] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const hasRendered = useRef(false);

    useEffect(() => {
        if (!hasRendered.current) {
            hasRendered.current = true;
            setIsMounted(true);
        }
    }, [isMounted])

  return (
      <div className="main">
        <Navbar setToggle={setToggle} toggle={toggle} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <div className="container" onClick={() => setIsMenuOpen(false)}>
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

function App() {
    const [isMounted, setIsMounted] = useState(false);
    const hasRendered = useRef(false);

    useEffect(() => {
        console.log(1)
    }, []);

    const router = createBrowserRouter([
        {
            path: "/admin",
            element: <Layout isMounted={isMounted} setIsMounted={setIsMounted}/>,
            children: [
                {
                    path: "",
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
            ],
        },
        {
            path: "/auth",
            element: <Auth
                isMounted={isMounted}
                setIsMounted={setIsMounted}
            />,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}


export default App;
