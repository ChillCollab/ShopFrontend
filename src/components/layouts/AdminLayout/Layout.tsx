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
import { storage } from '../../../storage/storage.ts';
import { useDispatch } from 'react-redux';
import { setError, setErrorMsg } from '../../../store/systemAlertSlices.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { setImage } from '../../../store/navbarSlices.ts';

const queryClient = new QueryClient();

const Layout = () => {
  const [toggle, setToggle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isName, setIsName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem(storage.userData) == null || localStorage.getItem(storage.accessToken) === undefined) {
      authRequests
        .userInfo()
        .then((res: AxiosResponse<any>) => {
          localStorage.setItem(storage.userData, JSON.stringify(res.data));
          dispatch(setImage({ isImage: res.data.avatar_id }));
          setIsName(res.data.name);
        })
        .catch((e: AxiosError<any>) => {
          if (e?.response?.status === 500) {
            dispatch(setErrorMsg({ isErrorMsg: 'Internal server error' }));
            dispatch(setError({ isError: true }));
          }
          dispatch(setErrorMsg({ isErrorMsg: e?.response?.data?.message }));
          dispatch(setError({ isError: true }));
        });
    } else {
      dispatch(setImage({ isImage: JSON.parse(localStorage.getItem(storage.userData) || '').avatar_id }));
      setIsName(JSON.parse(localStorage.getItem(storage.userData) || '').name);
    }
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
