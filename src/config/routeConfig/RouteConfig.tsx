import Layout from '../../components/layout/Layout';
import Auth from '../../pages/auth/Auth';
import Home from '../../pages/home/Home';
import Product from '../../pages/product/Product';
import Products from '../../pages/products/Products';
import User from '../../pages/user/User';
import Users from '../../pages/users/Users';

export const PathConstants = {
  HOME: '/',
  ABOUT: '/about',
  USER: '/users/:id',
  USERS: '/users',
  PRODUCTS: '/products',
  PRODUCT: '/products/:id',
};

export const configRoutes = [
  {
    path: PathConstants.HOME,
    element: <Layout />,
    children: [
      {
        path: PathConstants.HOME,
        element: <Home />,
      },
      {
        path: PathConstants.USERS,
        element: <Users />,
      },
      {
        path: PathConstants.PRODUCTS,
        element: <Products />,
      },
      {
        path: PathConstants.USER,
        element: <User />,
      },
      {
        path: PathConstants.PRODUCTS,
        element: <Product />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
];
