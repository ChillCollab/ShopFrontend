import {Button, TextField} from "@mui/material";
import "./auth.scss"
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import authRequests from "../../requests/auth/auth.ts";

const Login = ({setRegister}: any) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const handlerEmail = (data: any) => {
        setEmail(data.target.value)
    }

    const handlerPassword = (data: any) => {
        setPassword(data.target.value)
    }

    function logIn(login: string, password: string) {
            authRequests.login(login, password)
            .then(loginResponse => {
                if (loginResponse.status !== 200) {
                    setErrMsg("Incorrect password or email")
                }
                localStorage.setItem("access_token", loginResponse.data.access_token);
                localStorage.setItem("refresh_token", loginResponse.data.refresh_token);

                navigate('/admin', {replace: false})
            })
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            logIn(email, password)
        }
    };

    return (
        <div className="inputContainer">
            <h1>Login</h1>
            <div className="dataContainer"></div>
            <TextField
                variant="filled"
                type="email"
                placeholder="Email"
                onChange={handlerEmail}
                value={email}
                onClick={() => setErrMsg("")}
                onKeyDown={handleKeyDown}
            />
            <TextField
                variant="filled"
                type="password"
                placeholder="Password"
                onChange={handlerPassword}
                value={password}
                onClick={() => setErrMsg("")}
                onKeyDown={handleKeyDown}
            />
            <div style={{color: "red", display: "flex", justifyContent: "center"}}>{errMsg}</div>
            <div className="forget">
                <Button
                >Forget password?</Button>
            </div>
            <div className="buttonsContainer">
                <Button
                    className="loginButton"
                    variant="contained"
                    onClick={() => {
                        setErrMsg("")
                        logIn(email, password)}
                }
                    onKeyDown={handleKeyDown}
                >Login</Button>
                <Button
                    className="registerButton"
                    variant="outlined"
                    style={{}}
                    onClick={() => setRegister(true)}>
                    Registration
                </Button>
            </div>
        </div>
    )
}

export default Login