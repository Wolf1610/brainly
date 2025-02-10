import { ReactElement, useState } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon: ReactElement;
    onClick?: () => void;
    fullwidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    "primary": "bg-primary-1 text-white",
    "secondary": "bg-secondary-1 text-primary-1"
};

const defaultStyles = "px-4 py-2 rounded-md flex items-center";

export const Button = ({variant, text, startIcon, onClick, fullwidth, loading} : ButtonProps) => {

    return <>   
        <button 
            onClick={onClick} 
            className={`
                ${variantClasses[variant]} 
                ${defaultStyles} 
                ${fullwidth ? " w-full flex justify-center" : ""}
                ${loading ? "opacity-35" : ""}  
                cursor-pointer
            `}
            
        >
            <div className="pr-2">
                {startIcon}
            </div>
            {text}
        </button>

    </>
}

