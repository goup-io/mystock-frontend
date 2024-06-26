import React, { useState } from 'react';
import iconInfo from '../../assets/icons/i_info-light.svg';

const ButtonInfo = ({ mensagem }) => {
    const [modalAberto, setModalAberto] = useState(false);

    const toggleModal = () => {
        setModalAberto(!modalAberto);
    };

    return (
        <>
            <a onClick={toggleModal} className="cursor-pointer absolute bottom-0 right-2  duration-150 ease-in-out hover:scale-[1.03]">
                <img src={iconInfo} alt="Info" className="w-5" />
            </a>
            {modalAberto && (     
                <div onClose={toggleModal} className="max-w-80 absolute bottom-5 right-[-150px] transform -translate-x-1/2 bg-white shadow-md p-4 rounded z-10">
                    <p className="text-xs">{mensagem}</p>
                </div>
            )}
        
        </>
    );
};

export default ButtonInfo;
