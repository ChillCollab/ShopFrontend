import React, {ChangeEvent, SetStateAction, useState} from "react";
import {LoadingButton} from "@mui/lab";
import authRequests from "./requests/auth.ts";
import {InputLabelEmail} from "../../components/inputs/Inputs.tsx";

interface Forgot {
    setForgot: React.Dispatch<SetStateAction<boolean>>
    setSuccessfulRegister: React.Dispatch<SetStateAction<boolean>>
    setTitle: React.Dispatch<SetStateAction<string>>
}
const Forgot: React.FC<Forgot> = ({setForgot, setSuccessfulRegister, setTitle}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEmail, setIsEmail] = useState<string>("")
    const [isErrMsg, setIsErrMsg] = useState<string>("")
    const [isErr, setIsErr] = useState<boolean>(false)

    const handlerEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setIsErr(false)
        setIsEmail(event.target.value)
    }
    const recovery = (email: string) => {
        setIsLoading(true)
        if (isEmail === "") {
            setIsErrMsg("Email can't be empty")
            setIsErr(true)
            setIsLoading(false)
            return
        }
        authRequests.recovery(email)
            .then(recoveryResponse => {
                if(recoveryResponse.status === 200) {
                    setTitle("Restore successful!")
                    setSuccessfulRegister(true)
                    setIsLoading(false)
                    setForgot(false)
                }
            }).catch(e => {
                if(e.response){
                    if(e.response.data?.code === 2){
                        setIsErrMsg("Invalid email format")
                        setIsErr(true)
                        setIsLoading(false)
                        return
                    }
                }
        })
    }

    return (
        <div className="inputContainer">
            <div className="titleContainer">
                <h1>Recovery the password</h1>
                <p>Enter your authorized email address to receive a password reset link.</p>
            </div>
            <InputLabelEmail
                error={isErr}
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
                    onClick={() => recovery(isEmail)}>
                    Send email
                </LoadingButton>
            </div>
            <div className="registerBox"
                 onClick={() => setForgot(false)}>
                <p>Do you have an account yet?</p>
                <div className="registerButton">Login</div>
            </div>
        </div>
    )
}

export default Forgot