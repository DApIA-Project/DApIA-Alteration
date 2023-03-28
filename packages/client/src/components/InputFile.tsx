import React from "react";
import "../styles/InputFile.css";

interface InputFileProps {
    name : string;
    className : string;

}

function InputFile(props : InputFileProps){
    return (
        <div>
            <input type="file" className={props.className} name={props.name} multiple/>
        </div>
);
}

export default InputFile;