import { useEffect } from 'react';
import authRequests from '../requests/auth.ts';
import { useNavigate } from 'react-router-dom';

import { NavigateFunction } from 'react-router-dom';

const Auth = () => {
  // const [register, setRegister] = useState<boolean>(false);
  // const [isSuccessfulSend, setIsSuccessfulSend] = useState(false);
  // const [isForgot, setIsForgot] = useState(false);
  // const [isTitle, setIsTitle] = useState<string>('');
  const navigate = useNavigate();
  function checkLogin(nav: NavigateFunction) {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');
    if (access !== null || refresh !== null) {
      authRequests.userInfo().then((res) => {
        if (res.status !== 200) {
          if (res.status === 401) {
            authRequests.refreshToken().then((refreshResponse) => {
              if (refreshResponse.status !== 200) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
              } else {
                localStorage.setItem('access_token', refreshResponse.data.access_token);
                localStorage.setItem('refresh_token', refreshResponse.data.refresh_token);
                nav('/admin', { replace: true });
              }
            });
          }
        } else {
          if (res.data.role <= 0) {
            nav('/', { replace: true });
          } else {
            nav('/admin', { replace: true });
          }
        }
      });
    }
  }

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      checkLogin(navigate);
    }
  });
  return <div className="loginContainer">{/* <Manipulator /> */}</div>;
};

export default Auth;
