import { useEffect, useState } from 'react';
import Navbar from '../../navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Menu from '../../menu/Menu';
import { Outlet } from 'react-router-dom';
import Footer from '../../footer/Footer';
import { MainSpinner } from '../../spinners/MainSpinner.tsx';
import authRequests from '../../../pages/auth/requests/auth.ts';
import AlertSuccess from '../../alerts/AlertSuccess';
import AlertBad from '../../alerts/AlertSuccess/AlertBad.tsx';
import authLaoyout from '../../../requests/layout.ts';
import { storage } from '../../../storage/storage.ts';

const queryClient = new QueryClient();

const Layout = () => {
  const [toggle, setToggle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImage, setIsImage] = useState<string>('');
  const [isName, setIsName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    authLaoyout(authRequests.userInfo()).then((res: any) => {
      localStorage.setItem(storage.userData, JSON.stringify(res.data));
      setIsImage(res.data.avatar_id);
      setIsName(res.data.name);
    });
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <MainSpinner isLoading={isLoading} />
  ) : (
    <div className="main">
      <AlertSuccess />
      <AlertBad />
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
