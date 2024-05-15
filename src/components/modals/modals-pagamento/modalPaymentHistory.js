
import InputSearcModal from '../../inputs/inputSearchModal';
import HeaderModal from '../headerModal';
import ButtonClear from '../../buttons/buttonClear';
import ButtonModal from '../../buttons/buttonsModal';
import React, { useState, useEffect } from 'react';
import TabelaModal from '../../tables/tableModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


 function ModalPaymentHistory() {

    const [colunas, setColunas] = useState([]);
    const [dados, setDados] = useState([]);

    useEffect(() => {

        const colunasDoBanco = ['Tipo', 'Valor Pago', 'N.Parcelas'];

        const dadosDoBanco = [ ];

        setColunas(colunasDoBanco);

        setDados(dadosDoBanco);

    }, []);

    return (

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[37rem] h-[24rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
           <div className='w-[35rem]'>
           <HeaderModal
                props="Detalhamento do Pagamento"
            >
            </HeaderModal>
           </div>
           
            <div className='w-[35rem] h-[16rem]  border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto'>
                <TabelaModal colunas={colunas} dados={dados}></TabelaModal>
            </div>
            <div className="w-[35rem] flex justify-end items-end mt-1 h-7">
                <ButtonModal>Voltar</ButtonModal>
            </div>

        </div>

    );
}

function AbrirModalPaymentHistory() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalPaymentHistory />,
        // width: "auto",
        // heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalPaymentHistory;