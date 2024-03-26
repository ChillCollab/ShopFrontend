import "./auth.scss"
import {useEffect, useState} from "react";
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import authRequests from "../../requests/auth/auth.ts";
import {useNavigate} from "react-router-dom";
import SuccessfulSend from "./SuccessfulSend.tsx";
import Forgot from "./Forgot.tsx";

const Auth = () => {
    const [register, setRegister] = useState<boolean>(false);
    const [isSuccessfulSend, setIsSuccessfulSend] = useState(false);
    const [isForgot, setIsForgot] = useState(false);
    const [isTitle, setIsTitle] = useState<string>("")
    const navigate = useNavigate()
    function checkLogin() {
        const access = localStorage.getItem("access_token");
        const refresh = localStorage.getItem("refresh_token");
        if (access !== null || refresh !== null) {
            authRequests.userInfo()
                .then(res => {
                    if (res.status !== 200) {
                        authRequests.refreshToken()
                            .then(refreshResponse => {
                                if(refreshResponse.status !== 200) {
                                    localStorage.removeItem("access_token");
                                    localStorage.removeItem("refresh_token");
                                } else {
                                    localStorage.setItem("access_token", refreshResponse.data.access_token);
                                    localStorage.setItem("refresh_token", refreshResponse.data.refresh_token);
                                    navigate("/admin", {replace: true})
                                }
                            })
                    }
                })
        }
    }
    function Manipulator() {
        if(register) return <Register setRegister={setRegister} setRegisterSuccess={setIsSuccessfulSend} setTitle={setIsTitle}/>
        if(isSuccessfulSend) return <SuccessfulSend setRegisterSuccess={setIsSuccessfulSend} title={isTitle}/>
        if(isForgot) return <Forgot setForgot={setIsForgot} setSuccessfulRegister={setIsSuccessfulSend} setTitle={setIsTitle}/>
        return <Login setRegister={setRegister} setIsForgot={setIsForgot}/>
    }

    useEffect(() => {
        if(localStorage.getItem("access_token") !== null){
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
        checkLogin()
    }, [])
  return (
    <div className="loginContainer">
      <Manipulator/>
    </div>
  )
}

export default Auth