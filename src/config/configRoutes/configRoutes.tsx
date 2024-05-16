import AdminLayout from '../../components/layouts/AdminLayout/Layout';
import ResetPassword from '../../pages/auth/Forgot/ResetPassword.tsx';
import SubmitRegistration from '../../pages/auth/Register/SubmitRegistration.tsx';
import AdminHome from '../../pages/admin/home/Home';
import Product from '../../pages/admin/product/Product';
import Products from '../../pages/admin/products/Products';
import User from '../../pages/admin/user/User';
import Users from '../../pages/admin/users/Users';
import Layout from '../../components/layouts/Layout';
import Home from '../../pages/home/Home';
import Login from '../../pages/auth/Login/Login';
import Register from '../../pages/auth/Register/Register';
import Forgot from '../../pages/auth/Forgot/Forgot.tsx';
import SuccessfulSend from '../../pages/auth/Forgot/SuccessfulSend.tsx';

export const routePaths = {
  HOME: '/',
  ADMIN_PRODUCT: '/admin/product/:id',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_USER: '/admin/users/:id',
  ADMIN_USERS: '/admin/users',
  ADMIN: '/admin',
  RESET_PASSWORD: '/recovery/submit/:id',
  SUBMIT_REGISTRATION: '/registration/submit/:id',
  ADMIN_AUTH_LOGIN: '/admin/login',
  REGISTER_AUTH: '/admin/register', // url пока как админ будет, потом надо менять
  FORGOT_PASSWORD: '/admin/forgot',
  FORGOT_PASSWORD_SUCCESS: '/admin/forgot/success',
};

export const routeConfig = [
  {
    path: routePaths.ADMIN,
    element: <AdminLayout />,
    children: [
      {
        path: routePaths.ADMIN,
        element: <AdminHome />,
      },
      {
        path: routePaths.ADMIN_USER,
        element: <User />,
      },
      {
        path: routePaths.ADMIN_USERS,
        element: <Users />,
      },
      {
        path: routePaths.ADMIN_PRODUCT,
        element: <Product />,
      },
      {
        path: routePaths.ADMIN_PRODUCTS,
        element: <Products />,
      },
    ],
  },
  {
    path: routePaths.HOME,
    element: <Layout />,
    children: [
      {
        path: routePaths.HOME,
        element: <Home />,
      },
    ],
  },
  {
    path: routePaths.ADMIN_AUTH_LOGIN,
    element: <Login />,
  },
  {
    path: routePaths.REGISTER_AUTH,
    element: <Register />,
  },
  {
    path: routePaths.SUBMIT_REGISTRATION,
    element: <SubmitRegistration />,
  },
  {
    path: routePaths.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: routePaths.FORGOT_PASSWORD,
    element: <Forgot />,
  },
  {
    path: routePaths.FORGOT_PASSWORD_SUCCESS,
    element: <SuccessfulSend />,
  },
];
