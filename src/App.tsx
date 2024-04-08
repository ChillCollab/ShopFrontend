import Home from "./pages/home/Home";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Auth from "./pages/auth/Auth.tsx";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useState} from "react";
import Navbar from "./components/navbar/Navbar.tsx";
import Menu from "./components/menu/Menu.tsx";
import Footer from "./components/footer/Footer.tsx";
import SubmitRegistration from "./pages/auth/SubmitRegistration.tsx";

const queryClient = new QueryClient();

function Layout(){
    const [toggle, setToggle] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    const router = createBrowserRouter([
        {
            path: "/admin",
            element: <Layout />,
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
            element: <Auth />,
        },
        {
            path: "/registration/submit/:id",
            element: <SubmitRegistration/>,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}


export default App;
