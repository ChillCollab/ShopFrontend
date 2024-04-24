import { useEffect, useState } from 'react';
import Navbar from '../../navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Menu from '../../menu/Menu';
import { Outlet } from 'react-router-dom';
import Footer from '../../footer/Footer';
import { getAuth } from '../../../pages/admin/home/Home.utils.ts';
import { routePaths } from '../../../config/configRoutes/configRoutes.tsx';

const queryClient = new QueryClient();

const Layout = () => {
  const [toggle, setToggle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImage, setIsImage] = useState<string>('');
  const [isName, setIsName] = useState<string>('');

  useEffect(() => {
    getAuth().then((res) => {
      if (res.status !== 200) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = routePaths.ADMIN_AUTH_LOGIN;
      }
      setIsName(res.data.login);
      console.log(res.data.avatar_id);
      setIsImage(res.data.avatar_id);
    });
  }, []);

  return (
    <div className="main">
      <Navbar
        setToggle={setToggle}
        toggle={toggle}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isName={isName}
        isImage={isImage}
      />
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
