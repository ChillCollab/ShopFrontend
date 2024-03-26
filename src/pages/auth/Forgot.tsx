import {Button, TextField} from "@mui/material";
import React, {ChangeEvent, SetStateAction, useState} from "react";
import {LoadingButton} from "@mui/lab";
import authRequests from "../../requests/auth/auth.ts";

interface Forgot {
    setForgot: React.Dispatch<SetStateAction<boolean>>
    setSuccessfulRegister: React.Dispatch<SetStateAction<boolean>>
    setTitle: React.Dispatch<SetStateAction<string>>
}
const Forgot: React.FC<Forgot> = ({setForgot, setSuccessfulRegister, setTitle}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEmail, setIsEmail] = useState<string>("")
    const [isErrMsg, setIsErrMsg] = useState<string>("")

    const handlerEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setIsEmail(event.target.value)
    }
    const recovery = (email: string) => {
        setIsLoading(true)
        if (isEmail === "") {
            setIsErrMsg("Email can't be empty")
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
                        setIsLoading(false)
                        return
                    }
                }
        })
    }

    return (
        <div className="inputContainer">
            <div className="backContainer">
                <Button
                    variant="outlined"
                    onClick={() => setForgot(false)}
                >⬅ Back
                </Button>
            </div>
            <h1>Restore password</h1>
            <TextField
                variant="filled"
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
                    onClick={() => recovery(isEmail)}>
                    Send email
                </LoadingButton>
            </div>
        </div>
    )
}

export default Forgot