import { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Menu from './../menu/Menu';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';

const queryClient = new QueryClient();

const Layout = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleMenu = () => setIsOpenMenu((prev) => !prev);

  return (
    <div className="main">
      <Navbar toggleMenu={toggleMenu} />
      <div className="container">
        {isOpenMenu ? (
          <div className="menuContainer">
            <Menu toggleMenu={toggleMenu} />
          </div>
        ) : (
          <div className="mobileMenuContainer">
            <Menu toggleMenu={toggleMenu} />
          </div>
        )}
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

export default Layout;
