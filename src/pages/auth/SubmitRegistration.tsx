import {InputLabelMain, InputLabelPassword} from "../../components/inputs/Inputs.tsx";
import {Button} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import {
    BallSpinner,
    BarsSpinner,
    CubeSpinner,
    DominoSpinner,
    GridSpinner,
    MetroSpinner,
    PushSpinner, WhisperSpinner
} from "react-spinners-kit";
import {MainSpinner} from "../../components/spinners/MainSpinner.tsx";

export default function SubmitRegistration() {
    const [isErr, setIsErr] = useState<boolean>(false)
    const [isEyeFirst, setIsEyeFirst] = useState<boolean>(false)
    const [isEyeSecond, setIsEyeSecond] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const handlerPassword = (data: ChangeEvent<HTMLInputElement>) => {
        setIsPassword(data.target.value)
    }

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 5000)
    }, [])

    return (
        <div className="loginContainer">
            {isLoading ? <MainSpinner isLoading={isLoading} />
                :
                <div className="inputContainer">
                    <div className="titleContainer">
                        <h1>Confirmation of registration</h1>
                    </div>
                    <InputLabelMain
                        itemID={"name"}
                        error={false}
                        type={"text"}
                        label={""}
                        size={"medium"}
                        value={"Daniil"}
                    />
                    <InputLabelMain
                        itemID={"surname"}
                        error={false}
                        type={"text"}
                        label={""}
                        size={"medium"}
                        value={"Petrov"}
                    />
                    <InputLabelMain
                        itemID={"email"}
                        error={false}
                        type={"email"}
                        label={""}
                        size={"medium"}
                        value={"sanya2test@msoftgroup.ru"}
                    />
                    <InputLabelPassword
                        error={isErr}
                        isShow={isEyeFirst}
                        setIsShow={setIsEyeFirst}
                        label={"Password"}
                        event={handlerPassword}
                        size={"medium"}
                    />
                    <InputLabelPassword
                        error={isErr}
                        isShow={isEyeSecond}
                        setIsShow={setIsEyeSecond}
                        label={"Password"}
                        event={handlerPassword}
                        size={"medium"}
                    />
                    {isErr ? <div style={{color: "red", display: "flex", justifyContent: "center"}}>{errMsg}</div> : <></>}
                    <div className="buttonsContainer">
                        <Button
                            className="loginButton"
                            variant="contained"
                            onClick={() => {}
                            }
                        >Login</Button>
                    </div>
                </div>
            }
        </div>
    )
}