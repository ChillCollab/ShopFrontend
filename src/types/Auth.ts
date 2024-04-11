import {User} from "../pages/auth/requests/auth.ts";

export interface RegistrationResponse{
    error: boolean,
    user: User
}

export interface SendEmailResponse{
    message: string
    success: boolean
}