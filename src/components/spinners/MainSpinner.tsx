import {WhisperSpinner} from "react-spinners-kit";
import React from "react";

interface MainSpinner {
    isLoading: boolean
}
export const MainSpinner: React.FC<MainSpinner> = ({isLoading}) => {
    return (
        <>
            <WhisperSpinner size={100} backColor="#8B87D6" loading={isLoading} />
        </>
    )
}