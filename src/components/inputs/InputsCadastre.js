import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function InputCadastre(props) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <form className="relative">
            {props.icon && (
                <div className="absolute top-2 left-3.5">
                    <img src={props.icon} alt="Ícone" />
                </div>
            )}
            <input
               value={props.value}
               onChange={(e) => {props.handleInput(e, props.handlerAtributeChanger)}}
               id={props.id} 
               type={`${props.type}`} 
               placeholder={props.placeholder == undefined ? "" : props.placeholder} 
               className="w-[16rem] h-7 rounded bg-[F5F3F4] pl-2 text-[1rem] font-[300] capitalize text-[#555] form-control border border-[0.1rem] border-slate-600"
            >{props.children}</input>
            {props.type === 'password' && (
                <div
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </div>
            )}

        </form>
    );
}

export default InputCadastre;