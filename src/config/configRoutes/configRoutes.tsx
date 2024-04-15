import AdminLayout from '../../components/layouts/AdminLayout/Layout';
import Auth from '../../pages/auth/Auth';
import ResetPassword from '../../pages/auth/ResetPassword';
import SubmitRegistration from '../../pages/auth/SubmitRegistration';
import AdminHome from '../../pages/admin/home/Home';
import Product from '../../pages/admin/product/Product';
import Products from '../../pages/admin/products/Products';
import User from '../../pages/admin/user/User';
import Users from '../../pages/admin/users/Users';
import Layout from '../../components/layouts/Layout';
import Home from '../../pages/Home';

export const routePaths = {
  HOME: '/',
  ADMIN_PRODUCT: '/admin/product/:id',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_USER: '/admin/users/:id',
  ADMIN_USERS: '/admin/users',
  AUTH: '/auth',
  ADMIN: '/admin',
  RESET_PASSWORD: '/reset/submit/:id',
  SUBMIT_REGISTRATION: '/registration/submit/:id',
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
    element: <Layout/>,
    children: [
      {
        path: routePaths.HOME,
        element: <Home/>,
      }
    ]
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
