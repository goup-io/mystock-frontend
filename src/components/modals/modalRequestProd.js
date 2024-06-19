
import InputSearcModal from '../inputs/inputSearchModal';
import HeaderModal from '../modals/headerModal';
import ButtonClear from '../buttons/buttonClear';
import ButtonModal from '../buttons/buttonsModal';
import Tabela from '../tables/tableModal';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import InputAndLabelModal from '../inputs/inputAndLabelModal';
import Input from '../inputs/inputAndLabelModal'

import ApiRequest from '../../connections/ApiRequest';
import AbrirModalEditProd from './modals-produto/modalEditProd';
import Alert from '../alerts/Alert';
import errorImage from "../../assets/error.png"


function ModalRequestProd() {

    const [colunasETP, setColunasETP] = useState([]);
    const [dadosDoBancoETP, setDadosDoBancoETP] = useState([]);
    const [dadosFiltradosETP, setDadosFiltradosETP] = useState([]);
    const [etpsIds, setEtpsIds] = useState([]);


    async function fetchData() {
        const colunasDoBancoETP = ['Cód.', 'Nome', 'Modelo', 'Tam.', 'Cor', 'Preço', 'Loja', 'Item Promo.', 'N.Itens'];

        try {
            const response = await ApiRequest.etpsGetAll();

            if (response.status === 200) {
                const dados = response.data;

                const filtrarDados = dados
                    .map(obj => (
                        {
                            codigo: obj.codigo, nome: obj.nome, modelo: obj.modelo, tamanho: obj.tamanho, cor: obj.cor, preco: obj.preco, loja: obj.loja, itemPromocional: obj.itemPromocional == 'SIM' ? 'Sim' : 'Não', quantidade: obj.quantidade
                        }
                    ));

                const filtrarIdsEtps = dados.map(obj => ({ id: obj.id }));
                setEtpsIds(filtrarIdsEtps);

                setDadosDoBancoETP(filtrarDados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }

        setColunasETP(colunasDoBancoETP);
    }

    async function fetchDataFilterSearchProduto(filterData) {
        if (filterData === "") {
            fetchData();
        } else {
            const searchData = dadosDoBancoETP.filter((item) => {
                const lowerCaseFilter = filterData.toLowerCase();
                return (
                    item.codigo.toLowerCase().includes(lowerCaseFilter) ||
                    item.nome.toLowerCase().includes(lowerCaseFilter) ||
                    item.modelo.toLowerCase().includes(lowerCaseFilter) ||
                    item.cor.toLowerCase().includes(lowerCaseFilter) ||
                    item.loja.toLowerCase().includes(lowerCaseFilter) ||
                    item.itemPromocional.toLowerCase().includes(lowerCaseFilter)
                );
            });
            setDadosDoBancoETP(searchData);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[28rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
            <div className='w-[40rem]'>
                <HeaderModal
                    props="Solicitar Produto"
                >
                </HeaderModal>
            </div>
            <div className="w-[40rem] h-[2rem] flex justify-between items-center ">
                <div className='w-[15rem] flex justify-between'>
                    <p>Cód. vendedor:</p>
                    <input className='w-[7rem] h-6 border-[1px] border-slate-700 rounded-md'></input>

                </div>

                <InputSearcModal props="text" funcao={fetchDataFilterSearchProduto} > Pesquisar</InputSearcModal>
            </div>
            <div className='w-[40rem] h-[19rem] border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded-md'>
                <Tabela colunas={colunasETP} dados={dadosDoBancoETP.map(({ ...dados }) => dados)} id={etpsIds} iptQuantidade />
            </div>
            <div className="w-[40rem] flex justify-end items-end mt-1 h-7 gap-2">
                <ButtonModal cor="#919191">Limpar</ButtonModal>
                <ButtonModal>Solicitar</ButtonModal>
            </div>

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

export default AbrirModalRequestProd; 