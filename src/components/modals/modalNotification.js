import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ButtonNotification from '../buttons/buttonNotification';
import ModalAviso from '../alerts/ModalAviso';
import ButtonModal from '../buttons/buttonsModal';
import ApiRequest from "../../connections/ApiRequest"; 

function ModalNotification() {
    const [dadosNotificacao, setDadosNotificacao] = useState([]);

    useEffect(() => {
        const idLoja = localStorage.getItem("visao_loja");
        fetchDados(idLoja);
    }, [localStorage.getItem("visao_loja")]);

    async function fetchDados(idLoja) {
        try {
            const response = await ApiRequest.alertasGetAllByLoja(idLoja);
            console.log("notificações response:", response);
            if (response.status === 200) {
                setDadosNotificacao(response.data);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados das notificações", error);
        }
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[32rem] flex flex-col items-center justify-around bg-white p-2 rounded-lg border border-black">
            <div className="w-[22rem] h-[2.5rem] ">
                <div className="w-full justify-between flex items-center">
                    <p className="font-semibold">NOTIFICAÇÕES</p>
                    <ButtonNotification />
                </div>
                <div className="w-full h-[0.1rem] bg-[#355070]"></div>
            </div>
            <div className="w-[22rem] h-[24rem] flex flex-col rounded gap-2 items-center p-4 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700 overflow-y-auto">
                {dadosNotificacao.map((aviso, index) => (
                    <ModalAviso 
                        key={index}
                        tipo={aviso.tipo} 
                        titulo={aviso.titulo} 
                        descricao={aviso.descricao} 
                        dataHora={aviso.dataHora} 
                    />
                ))}
            </div>
            <div className="w-[22rem] flex justify-end h-6">
                <ButtonModal cor="#919191">Limpar tudo</ButtonModal>
            </div>
        </div>
    );
}

function AbrirModalNotification() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalNotification />,
        width: "22rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalNotification;
