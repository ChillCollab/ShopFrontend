import {WhisperSpinner} from "react-spinners-kit";
import React from "react";

interface MainSpinner {
    isLoading: boolean
}
export const MainSpinner: React.FC<MainSpinner> = ({isLoading}) => {
    return (
        <div style={{width: "100%", height: "100%", display: "flex", justifyContent:"center", alignItems: "center"}}>
            <WhisperSpinner size={100} backColor="#8B87D6" loading={isLoading} />
        </div>
    )
}