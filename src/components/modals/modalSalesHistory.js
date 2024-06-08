
// import ButtonClear from "../buttons/buttonClear";
// import ButtonModal from "../buttons/buttonsModal";
// import InputAndLabelModal from "../inputs/inputAndLabelModal";
// import HeaderModal from "../modals/headerModal";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import TabelaPage from "../tables/tablePage";
// import ItemSeparadoPorLinhaTracejada from '../tables/ItemSeparadoPorLinhaTracejada'

// import ApiRequest from "../../../connections/ApiRequest";
// import React, { useState, useEffect } from 'react';
// import TabelaModal from "../tables/tableModal";
// import AbrirModalPaymentHistory from "./modals-pagamento/modalPaymentHistory";

// function ModalSalesHistory({ saleDetails }) {


//     const [colunasVenda, setColunasVenda] = useState([]);
//     const [dadosDoBancoVenda, setDadosDoBancoVenda] = useState([]);
//     const [dadosFiltradosVenda, setDadosFiltradosVenda] = useState([]);

//     async function fetchData() {
//         const colunasDoBancoVenda = ['Código', 'Nome', 'Modelo', 'Tamanho', 'Cor', 'Preço','Desconto', 'Quantidade', 'Subtotal'];

//         try {
//             const response = await ApiRequest.etpsGetAll();

//             if (response.status === 200) {
//                 const dados = response.data;
//                 setDadosDoBancoVenda(dados);

//                 const filtrarDados = dados
//                     .map(obj => (
//                         {
//                             codigo: obj.codigo, nome: obj.nome, modelo: obj.modelo, tamanho: obj.tamanho, cor: obj.cor, preco: obj.preco, desconto: obj.desconto, subtotal: obj.subtotal, quantidade: obj.quantidade
//                         }
//                     ));

//                 setDadosFiltradosVenda(filtrarDados);
//             }
//         } catch (error) {
//             console.log("Erro ao buscar os dados", error);
//         }

//         setColunasVenda(colunasDoBancoVenda);
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <>
//             <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[34rem] flex flex-col items-center justify-around  bg-white p-2 rounded-lg border border-black">
//                 <div className="w-[42rem]">
//                     <HeaderModal
//                         props="Detalhamento da Venda"
//                     ></HeaderModal>
//                 </div>
//                 <div className="w-[42rem] h-[28rem] flex flex-col rounded justify-start p-3 bg-[#F5F3F4] border-solid shadow-[5px_5px_10px_0_rgba(0,0,0,0.14)] border-gray-700">

//                     <div className=" w-[40rem] h-[14rem] ">

//                         <ItemSeparadoPorLinhaTracejada infoEsquerda={"Código da Venda:"} infoDireita={saleDetails.codigoVenda} />

//                         <ItemSeparadoPorLinhaTracejada infoEsquerda={"Data - Hora:"} infoDireita={saleDetails.dataHora} />

//                         <ItemSeparadoPorLinhaTracejada infoEsquerda={"Vendedor:"} infoDireita={saleDetails.vendedor} />

//                         <ItemSeparadoPorLinhaTracejada infoEsquerda={"Tipo da Venda:"} infoDireita={saleDetails.tipoVenda} />

//                         <ItemSeparadoPorLinhaTracejada infoEsquerda={"Total de Itens:"} infoDireita={saleDetails.totalItens} />

//                         <ItemSeparadoPorLinhaTracejada infoEsquerda={"Subtotal 1:"} infoDireita={saleDetails.subtotal1} />

//                         <ItemSeparadoPorLinhaTracejada infoEsquerda={"Desconto em Produtos:"} infoDireita={saleDetails.descontoProdutos} />

//                         <ItemSeparadoPorLinhaTracejada infoEsquerda={"Subtotal 2:"} infoDireita={saleDetails.subtotal2} />

//                         <ItemSeparadoPorLinhaTracejada infoEsquerda={"Desconto da Venda:"} infoDireita={saleDetails.descontoVenda} />

//                         <li className="flex flex-row justify-between">
//                             <p className="text-sm font-bold">Valor Total:</p>
//                             <p className="text-sm font-bold">{saleDetails.valorTotal}</p>
//                         </li>

//                         <div className="w-full h-[0.1rem] bg-[#355070] mt-2"></div>

//                     </div>

//                     <div className="w-[40rem] h-[13rem] flex flex-col justify-start mt-2 ">
//                         <p className="w-[40rem] h-[0.7rem] text-base font-medium flex justify-start">Itens da Venda</p>

//                         <div className=" w-[40rem] h-[10.5rem]  border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto mt-4">

//                             <TabelaPage colunas={colunasVenda} dados={dadosFiltradosVenda.map(({ ...dados }) => dados)} id={dadosDoBancoVenda.map(({ ...dadosDoBancoVenda }) => dadosDoBancoVenda)} />

//                         </div>

//                     </div>


//                 </div>
//                 <div className="w-[42rem] flex justify-between h-6 ">
//                     <ButtonModal cor="#6A8ACF"
//                         funcao={AbrirModalPaymentHistory}
//                     >Histórico de pagamento</ButtonModal>
//                     <div className="w-5/12 flex justify-between">
//                         <ButtonModal cor="#919191"

//                         >Cancelar Venda</ButtonModal>
//                         <ButtonModal

//                         >Trocar Itens</ButtonModal>
//                     </div>

//                 </div>
//             </div>
//         </>
//     );
// }

// function AbrirModalSalesHistory() {
//     const MySwal = withReactContent(Swal);
//     MySwal.fire({
//         html: <ModalSalesHistory />,
//         // width: "auto",
//         // heigth: "60rem",
//         showConfirmButton: false,
//         heightAuto: true,
//     });
// }

// export default AbrirModalSalesHistory;