import './navbar.scss';
import 'material-symbols/outlined.scss';
import React, { useCallback } from 'react';
import authRequests from '../../pages/auth/requests/auth.ts';
import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../config/configRoutes/configRoutes.tsx';
interface NavbarProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  isName: string;
  isImage: string;
}
interface SettingsMenu {
  isOpen: boolean;
}

const SettingsMenu: React.FC<SettingsMenu> = ({ isOpen }) => {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    authRequests.logout().then((logoutResponse) => {
      if (logoutResponse.status == 200) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate(routePaths.ADMIN_AUTH_LOGIN, { replace: true });
      }
    });
  }, []);
  if (isOpen) {
    return (
      <div className="settingsMenuContainer">
        <span className="settingsButton" onClick={() => logout()}>
          Logout
        </span>
      </div>
    );
  } else return <></>;
};

const Navbar: React.FC<NavbarProps> = ({ setToggle, toggle, isMenuOpen, setIsMenuOpen, isName, isImage }) => {
  return (
    <div className="navbar">
      <div className="logo">
        <span className="material-symbols-outlined" style={{ fontSize: '1.8rem' }} onClick={() => setToggle(!toggle)}>
          menu
        </span>
        <img src="/logo.svg" alt="" />
        <span>Universal store</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img src={isImage ? isImage : '/noavatar.png'} alt="" />
          <span>{isName}</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        <SettingsMenu isOpen={isMenuOpen} />
      </div>
    </div>
  );
};

export default Navbar;
