import { useEffect, useState } from 'react';
import Navbar from '../../navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Menu from '../../menu/Menu';
import { Outlet } from 'react-router-dom';
import Footer from '../../footer/Footer';
import { MainSpinner } from '../../spinners/MainSpinner.tsx';
import authRequests from '../../../pages/auth/requests/auth.ts';
import { storage } from '../../../storage/storage.ts';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert } from '../../../store/systemAlertSlices.ts';
import { AxiosError, AxiosResponse } from 'axios';
import { setImage } from '../../../store/navbarSlices.ts';
import Alert from '../../alerts/AlertSuccess/Alert.tsx';
import { RootState } from '../../../store';
import { isLogin } from '../../../store/userDataSlices.ts';

const queryClient = new QueryClient();

const Layout = () => {
  const [toggle, setToggle] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const userData = useSelector((state: RootState) => state.userData);
  useEffect(() => {
    if (localStorage.getItem(storage.userData) == null || localStorage.getItem(storage.accessToken) === undefined) {
      authRequests
        .userInfo()
        .then((res: AxiosResponse<any>) => {
          localStorage.setItem(storage.userData, JSON.stringify(res.data));
          dispatch(setImage({ isImage: res.data.avatar_id }));
          dispatch(isLogin({ isLogin: res.data.login }));
        })
        .catch((e: AxiosError<any>) => {
          if (e?.response?.status === 500) {
            dispatch(addAlert({ message: 'Internal server error', type: 'error' }));
          }
          dispatch(addAlert({ message: e?.response?.data?.message, type: 'error' }));
        });
    } else {
      dispatch(setImage({ isImage: JSON.parse(localStorage.getItem(storage.userData) || '').avatar_id }));
      dispatch(isLogin({ isLogin: JSON.parse(localStorage.getItem(storage.userData) || '').login }));
    }
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <MainSpinner isLoading={isLoading} />
  ) : (
    <div className="main">
      <Navbar
        setToggle={setToggle}
        toggle={toggle}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isName={userData.isLogin}
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
      <Alert />
    </div>
  );
};

export default Layout;
