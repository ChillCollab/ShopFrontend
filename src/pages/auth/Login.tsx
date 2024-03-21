import {Button, Input} from "@mui/material";
import "./auth.scss"

const Login = () => {
    return (
        <div className="inputContainer">
            <h1>Login</h1>
            <div className="dataContainer"></div>
            <Input
                type="email"
                placeholder="Email"
            />
            <Input
                disable={true}
                type="password"
                placeholder="Password"
            />
            <div className="forget">
                <Button
                >Forget password?</Button>
            </div>
            <div className="buttonsContainer">
                <Button
                    className="loginButton"
                    variant="contained"
                    style={{}}
                >Login</Button>
                <Button
                    className="registerButton"
                    variant="outlined"
                    style={{}}
                >Registration</Button>
            </div>
        </div>
    )
}

export default Login