import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Input(props) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="relative">
            {props.icon && (
                <div className="absolute top-1 left-3">
                    <img src={props.icon} className="h-[2rem]" alt="Ícone" />
                </div>
            )}
            <input 
                value={props.value}
                onChange={(e) => { props.handleInput(e, props.handlerAtributeChanger); }}
                id={props.id}
                type={props.type === 'password' && passwordVisible ? 'text' : props.type}
                placeholder={props.placeholder === undefined ? "" : props.placeholder}
                className={`w-[29vw] h-[2.5rem] rounded-[3.125rem] bg-[#F5F3F4] pl-14 text-[1.2rem] font-[400] text-[#555] form-control border border-slate-600 ${props.type === 'password' ? 'pr-10' : ''}`}
            />
            {props.type === 'password' && (
                <div
                    className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </div>
            )}
        </div>
    );
}

export default Input;
