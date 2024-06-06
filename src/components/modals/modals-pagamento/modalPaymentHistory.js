
// import InputSearcModal from '../../inputs/inputSearchModal';
// import HeaderModal from '../headerModal';
// import ButtonClear from '../../buttons/buttonClear';
// import ButtonModal from '../../buttons/buttonsModal';
// import React, { useState, useEffect } from 'react';
// import TabelaModal from '../../tables/tableModal';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import ApiRequest from "../../../connections/ApiRequest";

//  function ModalPaymentHistory() {

//     const [colunasPagamento, setColunasPagamento] = useState([]);
//     const [dadosDoBancoPagamento, setDadosDoBancoPagamento] = useState([]);
//     const [dadosFiltradosPagamento, setDadosFiltradosPagamento] = useState([]);

//     async function fetchData() {
//         const colunasDoBancoPagamento = ['Tipo', 'Valor Pago', 'Parcelas'];

//         try {
//             const response = await ApiRequest.etpsGetAll();

//             if (response.status === 200) {
//                 const dados = response.data;
//                 setDadosDoBancoPagamento(dados);

//                 const filtrarDados = dados
//                     .map(obj => (
//                         {
//                             codigo: obj.tipo, nome: obj.valor, modelo: obj.parcelas
//                         }
//                     ));

//                 setDadosFiltradosPagamento(filtrarDados);
//             }
//         } catch (error) {
//             console.log("Erro ao buscar os dados", error);
//         }

//         setColunasPagamento(colunasDoBancoPagamento);
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (

//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[37rem] h-[24rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
//            <div className='w-[35rem]'>
//            <HeaderModal
//                 props="Detalhamento do Pagamento"
//             >
//             </HeaderModal>
//            </div>
           
//             <div className='w-[35rem] h-[16rem]  border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto'>

//             <TabelaPage colunas={colunasPagamento} dados={dadosFiltradosPagamento.map(({ ...dados }) => dados)} id={dadosDoBancoPagamento.map(({ ...dadosDoBancoPagamento }) => dadosDoBancoPagamento)} />

//             </div>
//             <div className="w-[35rem] flex justify-end items-end mt-1 h-7">
//                 <ButtonModal
                
//                 >Voltar</ButtonModal>
//             </div>

//         </div>

//     );
// }

// function AbrirModalPaymentHistory() {
//     const MySwal = withReactContent(Swal);
//     MySwal.fire({
//         html: <ModalPaymentHistory />,
//         // width: "auto",
//         // heigth: "60rem",
//         showConfirmButton: false,
//         heightAuto: true,
//     });
// }

// export default AbrirModalPaymentHistory;