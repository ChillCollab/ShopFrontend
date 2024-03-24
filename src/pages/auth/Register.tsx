import {Button, Input} from "@mui/material";
import "./auth.scss"

const Register = ({setRegister}) => {
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
            <div className="buttonsContainer">
            <Button
                className="loginButton"
                variant="contained"
                style={{}}>
                Register
            </Button>
            </div>
        </div>
    )
}

export default Register