import Layout from '../../components/layout/Layout';
import Auth from '../../pages/auth/Auth';
import ResetPassword from '../../pages/auth/ResetPassword';
import SubmitRegistration from '../../pages/auth/SubmitRegistration';
import Home from '../../pages/home/Home';
import Product from '../../pages/product/Product';
import Products from '../../pages/products/Products';
import User from '../../pages/user/User';
import Users from '../../pages/users/Users';

export const routePaths = {
  HOME: '/',
  PRODUCT: '/product/:id',
  PRODUCTS: '/products',
  USER: '/user/:id',
  USERS: '/users',
  AUTH: '/auth',
  ADMIN: '/admin',
  RESET_PASSWORD: '/reset/submit/:id',
  SUBMIT_REGISTRATION: '/registration/submit/:id',
};

export const routeConfig = [
  {
    path: routePaths.HOME,
    element: <Layout />,
    children: [
      {
        path: routePaths.HOME,
        element: <Home />,
      },
      {
        path: routePaths.USER,
        element: <User />,
      },
      {
        path: routePaths.USERS,
        element: <Users />,
      },
      {
        path: routePaths.PRODUCT,
        element: <Product />,
      },
      {
        path: routePaths.PRODUCTS,
        element: <Products />,
      },
    ],
  },
  {
    path: routePaths.AUTH,
    element: <Auth />,
  },
  {
    path: routePaths.SUBMIT_REGISTRATION,
    element: <SubmitRegistration />,
  },
  {
    path: routePaths.RESET_PASSWORD,
    element: <ResetPassword />,
  },
];
