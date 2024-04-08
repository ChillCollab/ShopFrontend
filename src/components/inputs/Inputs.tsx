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
    onKeyDown?:   React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}
interface InputLabelEmail {
    error: boolean
    label: string
    size: "small" | "medium"
    event: any
    onKeyDown?:   React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
}
interface InputLabelMain {
    error: boolean
    type: string
    label: string
    size: "small" | "medium"
    event?: any
    onKeyDown?:   React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    disabled?: boolean | undefined
    value?: unknown
    itemID?: string
}

export const InputLabelPassword: React.FC<InputLabelPassword> = ({error, isShow, setIsShow, label, event, size, onKeyDown}) => {
    return (
        <FormControl className="custom-form-control" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" style={{ display: 'flex', alignItems: 'center' }}>{label}</InputLabel>
            <OutlinedInput
                error={error}
                size={size}
                id="outlined-adornment-password"
                type={isShow ? 'text' : 'password'}
                onChange={event}
                onKeyDown={onKeyDown}
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

export const InputLabelEmail: React.FC<InputLabelEmail> = ({error, label, event, size, onKeyDown}) => {
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
                onKeyDown={onKeyDown}
            />
        </FormControl>
    )
}

export const
    InputLabelMain:
        React.FC<InputLabelMain> =
        ({
             error,
             type,
             label,
             event,
             size,
             onKeyDown,
             disabled,
             value,
             itemID

}) => {
    return (
        <FormControl className="custom-form-control" variant="outlined">
            <InputLabel disabled={disabled} htmlFor="outlined-adornment-password" style={{ display: 'flex', alignItems: 'center' }}>{label}</InputLabel>
            <OutlinedInput
                itemID={itemID}
                disabled={disabled}
                error={error}
                size={size}
                id="outlined-adornment-password"
                type={type}
                onChange={event}
                label={label}
                onKeyDown={onKeyDown}
                value={value}
            />
        </FormControl>
    )
}