import HeaderModal from '../headerModal';
import ButtonModal from '../../buttons/buttonsModal';
import React, { useState, useEffect } from 'react';
import TabelaModal from '../../tables/tableModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from "../../../connections/ApiRequest";

import AbrirModalSalesHistory from '../modalSalesHistory.js'

function ModalPaymentHistory(idVenda) {
    const [colunasPagamento, setColunasPagamento] = useState([]);
    const [dadosDoBancoPagamento, setDadosDoBancoPagamento] = useState([]);
    const [idsPagamento, setIdsPagamento] = useState([]);

    async function fetchData() {
        const colunasDoBancoPagamento = ['Tipo', 'Valor Pago', 'Parcelas'];

        try {
            const response = await ApiRequest.getPagamentoFluxoCaixa(idVenda.idVenda);

            if (response.status === 200) {
                const dados = response.data;

                const filtrarDados = dados
                    .map(obj => (
                        {
                            tipo: obj.tipoPagamento, valorPago: obj.valor.toFixed(2), parcelas: obj.qtdParcelas + 'x'
                        }
                    ));
                setDadosDoBancoPagamento(filtrarDados);

                const filtrarIds = response.data.map(obj => ({ id: obj.id }));
                setIdsPagamento(filtrarIds);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

        setColunasPagamento(colunasDoBancoPagamento);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDetailsVenda = () => {
        AbrirModalSalesHistory(idVenda.idVenda);
    }

    return (

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[37rem] h-[24rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
            <div className='w-[35rem]'>
                <HeaderModal
                    props="Detalhamento do Pagamento"
                >
                </HeaderModal>
            </div>

            <div className='w-[35rem] h-[16rem]  border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto'>

                <TabelaModal colunas={colunasPagamento} dados={dadosDoBancoPagamento} id={idsPagamento} />

            </div>
            <div className="w-[35rem] flex justify-end items-end mt-1 h-7">
                <ButtonModal funcao={handleDetailsVenda}>Voltar</ButtonModal>
            </div>

        </div>

    );
}

function AbrirModalPaymentHistory(idVenda) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalPaymentHistory idVenda={idVenda} />,
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalPaymentHistory;