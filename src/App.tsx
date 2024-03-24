import Home from "./pages/home/Home";
import {createBrowserRouter, RouterProvider, Outlet, useNavigate} from "react-router-dom";
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
import {useEffect, useState} from "react";
import authRequests from "./requests/auth/auth.ts";


const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false);

    function getAuth() {
      return authRequests.userInfo()
          .then(userResponse => {
            if(userResponse?.status !== 200){
              if (userResponse?.status === 401) {
                return authRequests.refreshToken()
                    .then(refreshResponse => {
                      if(refreshResponse?.status !== 200) return false
                    })
              }
            } else return true;
          });
    }

    useEffect(() => {
      getAuth().then(res => {
        if(!res) {
          navigate('/auth', {replace: false});
        }
      });
    }, []);

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
      children: [
        {
          path: "/admin",
          element: <Layout/>,
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
