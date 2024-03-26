import {Button, TextField} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import "./auth.scss"
import React, {ChangeEvent, useState} from "react";
import authRequests from "../../requests/auth/auth.ts";

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
    const [isLoading, setIsLoading] = useState(false)

    const handlerLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setIsLogin(event.target.value)
    }
    const handlerName = (event: ChangeEvent<HTMLInputElement>) => {
        setIsName(event.target.value)
    }
    const handlerSurname = (event: ChangeEvent<HTMLInputElement>) => {
        setIsSurname(event.target.value)
    }
    const handlerEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setIsEmail(event.target.value)
    }

    function register(login: string, name: string, surname: string, email: string) {
        setIsLoading(true)
        if(login === "" || name === "" || surname === "" || email === ""){
            setIsErrMsg("Inputs can't be empty")
            setIsLoading(false)
            return
        }
        authRequests.register(login, name, surname, email)
            .then(registerResponse => {
                if(registerResponse?.status === 200){
                    if(!registerResponse?.data?.error) {
                        authRequests.sendMail(isEmail)
                            .then(sendResponse => {
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
                    }
                }
            setIsLoading(false)
        })
    }

    return (
        <div className="inputContainer">
            <div className="backContainer">
                <Button
                    variant="outlined"
                    onClick={() => setRegister(false)}
                >
                    ⬅ Back
                </Button>
            </div>
            <h1>Registration</h1>
            <div className="dataContainer"></div>
            <TextField
                variant="filled"
                type="login"
                placeholder="Login"
                onChange={handlerLogin}
                value={isLogin}
            />
            <TextField
                variant="filled"
                type="name"
                placeholder="Name"
                onChange={handlerName}
                value={isName}
            />
            <TextField
                variant="filled"
                type="surname"
                placeholder="Surname"
                onChange={handlerSurname}
                value={isSurname}
            />
            <TextField
                variant="filled"
                type="email"
                placeholder="Email"
                onChange={handlerEmail}
                value={isEmail}
            />
            <div style={{display: "flex", justifyContent: "center", color: "red"}}>{isErrMsg}</div>
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
        </div>
    )
}

export default Register