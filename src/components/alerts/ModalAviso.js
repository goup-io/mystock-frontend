import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import iconSeta from '../../assets/icons/i_arrow-solid.png';

function ModalAviso(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const rotaTelaEstoque = location.pathname === '/avisos' ? '/estoque-gerente' : '/estoque';
    const rotaTelaTransferencia = location.pathname === '/avisos' ? '/transacao-gerente' : '/transacao';

    return (
        <div key={props.key} className="w-full bg-[#355070] rounded-md flex text-[#ffffff] shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] text-left drop-shadow-md">
            <div className={`w-[1.5%] rounded-l-md ${props.tipo === 'Vermelho' ? 'bg-[#EF233C]' : 'bg-[#F29100]'}`}></div>
            <div className="w-full p-2 px-4 flex flex-col">
                <div className="flex justify-between">
                    <span className="font-medium ">{props.titulo}</span>
                    <span className="text-xs">{props.dataHora}</span>
                </div>
                <p className="text-sm">{props.descricao}</p>
                <div className="flex justify-end">
                    <a onClick={() => navigate(props.isTransferencia ? rotaTelaTransferencia : rotaTelaEstoque)} className="text-xs cursor-pointer underline duration-150 ease-in-out hover:text-[#A6CEE3] flex items-center gap-1">
                        {props.isTransferencia ? 'Ver transferências' : 'Ver estoque'} 
                        <img src={iconSeta} className='h-3' />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default ModalAviso;
