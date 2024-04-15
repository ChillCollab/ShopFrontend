import { FC, ReactNode, useState } from 'react';
import Navbar from '../../navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Menu from '../../menu/Menu';
import { Outlet } from 'react-router-dom';
import Footer from '../../footer/Footer';

const queryClient = new QueryClient();

const Layout = () => {
  const [toggle, setToggle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="main">
      <Navbar setToggle={setToggle} toggle={toggle} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="container" onClick={() => setIsMenuOpen(false)}>
        {toggle ? (
          <div className="menuContainer">
            <Menu setToggle={setToggle} />
          </div>
        ) : (
          <div className="mobileMenuContainer">
            <Menu setToggle={setToggle} />
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
