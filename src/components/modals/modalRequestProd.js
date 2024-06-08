
// import InputSearcModal from '../inputs/inputSearchModal';
// import HeaderModal from '../modals/headerModal';
// import ButtonClear from '../buttons/buttonClear';
// import ButtonModal from '../buttons/buttonsModal';
// import Tabela from '../tables/tableModal';
// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import InputAndLabelModal from '../inputs/inputAndLabelModal';
// import Input from '../inputs/inputAndLabelModal'


// import ApiRequest from "../../../connections/ApiRequest";
// function ModalRequestProd() {

//     const [colunasETP, setColunasETP] = useState([]);
//     const [dadosDoBancoETP, setDadosDoBancoETP] = useState([]);
//     const [dadosFiltradosETP, setDadosFiltradosETP] = useState([]);

//     async function fetchData() {
//         const colunasDoBancoETP = ['Código', 'Nome', 'Modelo', 'Tamanho', 'Cor', 'Preço', 'Loja', 'N.Itens'];
    
//         try {
//             const response = await ApiRequest.etpsGetAll();

//             if (response.status === 200) {
//                 const dados = response.data;
//                 setDadosDoBancoETP(dados);

//                 const filtrarDadosETP = dados
//                     .map(obj => (
//                         {
//                             codigo: obj.codigo, nome: obj.nome, modelo: obj.modelo, tamanho: obj.tamanho, cor: obj.cor, preco: obj.preco, loja: obj.loja, quantidade: obj.quantidade
//                         }
//                     ));

//                 setDadosFiltradosETP(filtrarDadosETP);
//             }
//         } catch (error) {
//             console.log("Erro ao buscar os dados", error);
//         }
       
//         setColunasETP(colunasDoBancoETP);
//     }

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleProdutoButtonClick = () => {
//         setIsProdutoSelected(true);
//     };


//     const handleEditarEtp = (etpId) => {
//         AbrirModalEditProd(etpId.id, updateTable);
//     };

//     async function excluir(etpId) {
//         const idProduto = etpId.idProduto
//         try {
//             const response = await ApiRequest.excluirProduto(idProduto);
//             if (response.status === 200) {
//                 console.log("Produto deletado");
//             } else if (response.status === 409) {
//                 Alert.alert(errorImage, "Este produto já foi excluido!");
//             }
//         } catch (error) {
//             console.log("Erro ao excluir um produto: ", error);
//         }
//     }

//     const handleDeleteEtp = (etpId) => {
//         Alert.alertQuestion("Deseja excluir esse produto? Essa ação é irreversível.", "Excluir", "Cancelar", () => excluir(etpId), () => updateTable())
//     }

//     const updateTable = () => {
//         fetchData();
//     };
// 
    // return (

    //     <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[28rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
             {/* <div className='w-[40rem]'>
                 <HeaderModal
                    props="Solicitar Produto"
                >
                </HeaderModal>
            </div>
            <div className="w-[40rem] h-[2rem] flex justify-between items-center ">
              <div className='w-[15rem] flex justify-between'>
              <p>Cód. vendedor:</p>
               <input className='w-[7rem] h-6 border-[1px] border-slate-700 rounded-lg'></input>

              </div>
                <InputSearcModal
                    props="text"
                >Pesquisar</InputSearcModal>
            </div>
            <div className='w-[40rem] h-[19rem] border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded-md'>
            <TabelaPage colunas={colunasETP} dados={dadosFiltradosETP.map(({ ...dados }) => dados)} edit={handleEditarEtp} remove={handleDeleteEtp} id={dadosDoBancoETP.map(({ ...dadosDoBancoETP }) => dadosDoBancoETP)} />
            </div>
            <div className="w-[40rem] flex justify-end items-end mt-1 h-7">
                <ButtonClear>Limpar</ButtonClear>
                <ButtonModal>Solicitar</ButtonModal>
            </div> */}
{/* 
        </div >

    );
}

 function AbrirModalRequestProd() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalRequestProd />,
        //   width: "auto",
        //   heigth: "60rem",
        showConfirmButton: false,
        heightAuto: true,
    });
 }

export default AbrirModalRequestProd; */}