import "./navbar.scss";
import "material-symbols/outlined.scss"
import React from "react";
import authRequests from "../../requests/auth/auth.ts";
import {useNavigate} from "react-router-dom";
interface NavbarProps {
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isMenuOpen: boolean;
}
interface SettingsMenu {
    isOpen: boolean
}
const Navbar: React.FC<NavbarProps> = ({setToggle , toggle, isMenuOpen, setIsMenuOpen}) => {
    const navigate = useNavigate();

    const SettingsMenu: React.FC<SettingsMenu> = ({isOpen}) => {
        function logout() {
            authRequests.logout()
                .then(logoutResponse => {
                    if (logoutResponse.status !== 200) {

                    } else {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("refresh_token");
                        navigate("/auth", {replace: true})
                    }
                })
        }
        if(isOpen){
            return (
                <div className="settingsMenuContainer">
                    <span
                        className="settingsButton"
                        onClick={() => logout()}
                    >Logout</span>
                </div>
            )
        } else return <></>
    }

    return (
    <div className="navbar" >
      <div className="logo">
      <span className="material-symbols-outlined" style={{fontSize: "1.8rem"}} onClick={() => setToggle(!toggle)}>menu</span>
        <img src="/logo.svg" alt="" />
        <span>lamadmin</span>
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
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Jane</span>
        </div>
        <img
            src="/settings.svg" alt=""
            className="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
          <SettingsMenu isOpen={isMenuOpen}/>
      </div>
    </div>
  );
};

export default Navbar;
