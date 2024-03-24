import "./auth.scss"
import {useState} from "react";
import Login from "./Login.tsx";
import Register from "./Register.tsx";

const Auth = () => {
    const [register, setRegister] = useState<boolean>(false)

    function Manipulator() {
        if(register) return <Register setRegister={setRegister}/>
        return <Login setRegister={setRegister}/>
    }

  return (
    <div className="loginContainer">
      <Manipulator/>
    </div>
  )
}

export default Auth