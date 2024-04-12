import { LoadingButton } from '@mui/lab';
import "./auth.scss"
import React, {ChangeEvent, useState} from "react";
import authRequests from "./requests/auth.ts";
import {InputLabelMain} from "../../components/inputs/Inputs.tsx";
import {RegistrationResponse, SendEmailResponse} from "../../types/Auth.ts";
import {AxiosResponse} from "axios";

interface RegisterPage {
    setRegister: React.Dispatch<React.SetStateAction<boolean>>
    setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>
    setTitle: React.Dispatch<React.SetStateAction<string>>
}

const Register: React.FC<RegisterPage> = ({setRegister, setRegisterSuccess, setTitle}) => {
    const [isLogin, setIsLogin] = useState("")
    const [isName, setIsName] = useState("")
    const [isSurname, setIsSurname] = useState("")
    const [isEmail, setIsEmail] = useState("")
    const [isErrMsg, setIsErrMsg] = useState("")
    const [isErr, setIsErr] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isEmailErr, setIsEmailErr] = useState<boolean>(false)

    const handlerLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setIsLogin(event.target.value)
        setIsErr(false)
    }
    const handlerName = (event: ChangeEvent<HTMLInputElement>) => {
        setIsName(event.target.value)
        setIsErr(false)
    }
    const handlerSurname = (event: ChangeEvent<HTMLInputElement>) => {
        setIsSurname(event.target.value)
        setIsErr(false)
    }
    const handlerEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setIsEmail(event.target.value)
        setIsErr(false)
        setIsEmailErr(false)
    }

    function register(login: string, name: string, surname: string, email: string) {
        setIsLoading(true)

        if(login === "" || name === "" || surname === "" || email === ""){
            setIsErrMsg("Inputs can't be empty")
            setIsErr(true)
            setIsLoading(false)
            return
        }
        authRequests.register(login, name, surname, email)
            .then((registerResponse: AxiosResponse<RegistrationResponse>) => {
                if(registerResponse?.status === 200){
                    if(!registerResponse?.data?.error) {
                        authRequests.sendMail(isEmail)
                            .then((sendResponse: AxiosResponse<SendEmailResponse>) => {
                                if(sendResponse?.status === 200) {
                                    setTitle("Register successful!")
                                    setIsLoading(false)
                                    setRegister(false)
                                    setRegisterSuccess(true)
                                }
                            }).catch(error => {
                                console.error(error)
                                setIsErrMsg("ERROR")
                        })
                    }
                }
            }).catch( error => {
                if(error.response) {
                    if(error.response.data?.code === 2) {
                        setIsLoading(false)
                        setIsErrMsg("Incorrect email. Please, validate your email")
                        setIsEmailErr(true)
                    }
                }
            setIsLoading(false)
        })
    }

    return (
        <div className="inputContainer">
            <h1>Registration</h1>
            <InputLabelMain
                error={isErr}
                type={"login"}
                label={"Login"}
                size={"medium"}
                event={handlerLogin}
                />
            <InputLabelMain
                error={isErr}
                type={"name"}
                label={"Name"}
                size={"medium"}
                event={handlerName}
            />
            <InputLabelMain
                error={isErr}
                type={"surname"}
                label={"Surname"}
                size={"medium"}
                event={handlerSurname}
            />
            <InputLabelMain
                error={isEmailErr}
                type={"email"}
                label={"Email"}
                size={"medium"}
                event={handlerEmail}
            />
            {isErr ? <div style={{display: "flex", justifyContent: "center", color: "red"}}>{isErrMsg}</div> : <></>}
            <div className="buttonsContainer">
            <LoadingButton
                className="loginButton"
                variant="contained"
                loading={isLoading}
                onClick={() => {
                    register(isLogin, isName, isSurname, isEmail)
                }}>
                Register
            </LoadingButton>
            </div>
            <div className="registerBox"
                 onClick={() => setRegister(false)}>
                <p>Do you have an account yet?</p>
                <div className="registerButton">Login</div>
            </div>
        </div>
    )
}

export default Register