import React from "react";
import "../styles/Button.css";


interface ButtonProps {
    text : string;
}

function Button(props : ButtonProps){
    const { text} = props;

    const handleClick = () => {
        if(window.sendData){
            window.sendData();
        }else{
            console.log("La fonction sendData n'est pas définie.");
        }
    };

    return (
        <button className="build" onClick={handleClick}> {text} </button>
    );
}

export default Button;