import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import React from "react";
import "./inputs.scss"
interface InputLabelPassword {
    error: boolean
    isShow: boolean
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    label: string
    size: "small" | "medium"
    event: any
}
interface InputLabelEmail {
    error: boolean
    label: string
    size: "small" | "medium"
    event: any
}
interface InputLabelMain {
    error: boolean
    type: string
    label: string
    size: "small" | "medium"
    event: any
}

export const InputLabelPassword: React.FC<InputLabelPassword> = ({error, isShow, setIsShow, label, event, size}) => {
    return (
        <FormControl className="custom-form-control" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" style={{ display: 'flex', alignItems: 'center' }}>{label}</InputLabel>
            <OutlinedInput
                error={error}
                size={size}
                id="outlined-adornment-password"
                type={isShow ? 'text' : 'password'}
                onChange={event}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {isShow ? setIsShow(false) : setIsShow(true)}}
                            onMouseDown={() => {}}
                            edge="end">
                            {isShow ? <img src="/eye.svg" alt={""}/> :  <img src="/eye-off.svg" alt={""}/>}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    )
}

export const InputLabelEmail: React.FC<InputLabelEmail> = ({error, label, event, size}) => {
    return (
        <FormControl className="custom-form-control" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" style={{ display: 'flex', alignItems: 'center' }}>{label}</InputLabel>
            <OutlinedInput
                error={error}
                size={size}
                id="outlined-adornment-password"
                type="email"
                onChange={event}
                label={label}
            />
        </FormControl>
    )
}

export const InputLabelMain: React.FC<InputLabelMain> = ({error, type, label, event, size}) => {
    return (
        <FormControl className="custom-form-control" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" style={{ display: 'flex', alignItems: 'center' }}>{label}</InputLabel>
            <OutlinedInput
                error={error}
                size={size}
                id="outlined-adornment-password"
                type={type}
                onChange={event}
                label={label}
            />
        </FormControl>
    )
}