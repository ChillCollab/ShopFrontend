import {Button, Input} from "@mui/material";
import "./auth.scss"

const Register = () => {
    return (
        <div className="inputContainer">
            <div className="backButtonContainer">
                <Button></Button>
            </div>
            <h1>Registration</h1>
            <div className="dataContainer"></div>
            <Input
                type="login"
                placeholder="Login"
            />
            <Input
                type="name"
                placeholder="Name"
            />
            <Input
                type="surname"
                placeholder="Surname"
            />
            <Input
                type="email"
                placeholder="Email"
            />
            <Button
                className="loginButton"
                variant="contained"
                style={{}}>
                Register
            </Button>
        </div>
    )
}

export default Register