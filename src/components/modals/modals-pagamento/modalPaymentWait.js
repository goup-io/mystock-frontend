
import ButtonClear from "../../buttons/buttonClear";
import ButtonModal from "../../buttons/buttonsModal";
import InputAndLabelModal from "../../inputs/inputAndLabelModal";
import HeaderModal from "../headerModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TabelaPage from "../../tables/tablePage";
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada'
import imgPagamento from '../../../assets/paymentWait.png';
import imgLoading from '../../../assets/loading.png';

import React, { useState, useEffect } from 'react';
import TabelaModal from "../../tables/tableModal";
import ButtonModalFull from "../../buttons/buttonModalFull";
import { LoadingButton } from "@mui/lab";

function ModalPaymentWait() {


    return (
        <>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[20rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
            <img className="w-[12rem] h-[12rem]" src={imgPagamento}></img>
            <img className="w-6 h-6 animate-spin" src={imgLoading}></img>
            <p>Aguardando finalização do pagamento...</p>
            <ButtonModal>Cancelar</ButtonModal>
            </div>
        </>
    );
}

function AbrirModalPaymentWait() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalPaymentWait />,
        // width: "auto",
        // heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalPaymentWait;