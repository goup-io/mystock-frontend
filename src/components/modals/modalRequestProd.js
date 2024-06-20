import InputSearcModal from '../inputs/inputSearchModal';
import HeaderModal from '../modals/headerModal';
import ButtonModal from '../buttons/buttonsModal';
import Tabela from '../tables/tableModal';
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ApiRequest from '../../connections/ApiRequest';
import Alert from '../alerts/Alert';

function ModalRequestProd() {
    const [colunasETP, setColunasETP] = useState([]);
    const [dadosDoBancoETP, setDadosDoBancoETP] = useState([]);
    const [etpsIds, setEtpsIds] = useState([]);
    const [codVendedor, setCodVendedor] = useState('');
    const [produtosSolicitados, setProdutosSolicitados] = useState([]);
    const tabelaRef = useRef(null);

    async function fetchData() {
        const colunasDoBancoETP = ['Cód.', 'Nome', 'Modelo', 'Tam.', 'Cor', 'Preço', 'Loja', 'Item Promo.', 'N.Itens'];

        try {
            const response = await ApiRequest.etpsGetAll();

            if (response.status === 200) {
                const dados = response.data;

                const filtrarDados = dados.map(obj => ({
                    id: obj.id,  // Adiciona o id aqui
                    codigo: obj.codigo,
                    nome: obj.nome,
                    modelo: obj.modelo,
                    tamanho: obj.tamanho,
                    cor: obj.cor,
                    preco: obj.preco,
                    loja: obj.loja,
                    itemPromocional: obj.itemPromocional === 'SIM' ? 'Sim' : 'Não',
                    quantidade: obj.quantidade,
                }));

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

    async function solicitarProduto() {
        if (codVendedor !== '' && produtosSolicitados.length > 0) {
            const requestBodyProdutos = {
                coletor_cod: codVendedor,
                itens: produtosSolicitados
            };

            try {
                const response = await ApiRequest.transferenciaCreate(requestBodyProdutos);
                if (response.status === 201) {
                    Alert.alertSuccess("Solicitação de produto realizada com sucesso!");
                    limparCampos();  // Adiciona a função de limpar campos após a solicitação ser realizada com sucesso
                } else {
                    Alert.alertError("Erro ao solicitar produto!", response.response.data.message);
                }
            } catch (error) {
                console.log("Erro ao solicitar produto:", error);
            }
        } else {
            Alert.alertError("Solicitação inválida!", "Preencha o código do vendedor e a quantidade de produtos que deseja solicitar.");
        }
    }

    function limparCampos() {
        setCodVendedor('');
        setProdutosSolicitados([]);
        fetchData();
        if (tabelaRef.current) {
            tabelaRef.current.limparQuantidades();
        }
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[28rem] flex flex-col justify-around items-center bg-white p-2 rounded-lg border border-black">
            <div className='w-[40rem]'>
                <HeaderModal props="Solicitar Produto" />
            </div>
            <div className="w-[40rem] h-[2rem] flex justify-between items-center">
                <div className='w-[15rem] flex justify-between items-center'>
                    <p className='text-lg text-black font-normal'>Cód. vendedor:</p>
                    <input
                        type='number'
                        value={codVendedor}
                        onChange={e => setCodVendedor(e.target.value)}
                        className='w-[7rem] h-6 border-[1px] border-slate-700 rounded-md pl-2 text-[1rem] font-[400] text-[#555] form-control border-[1px] border-gray-700 focus:outline-none'
                    />
                </div>
                <InputSearcModal props="text" funcao={fetchDataFilterSearchProduto}>Pesquisar</InputSearcModal>
            </div>
            <div className='w-[40rem] h-[19rem] border-solid border-[1px] border-slate-700 bg-slate-700 overflow-y-auto rounded-md'>
                <Tabela colunas={colunasETP} dados={dadosDoBancoETP} id={etpsIds} iptQuantidade onQuantityChange={setProdutosSolicitados} ref={tabelaRef} />
            </div>
            <div className="w-[40rem] flex justify-end items-end mt-1 h-7 gap-2">
                <ButtonModal cor="#919191" funcao={limparCampos}>Limpar</ButtonModal>
                <ButtonModal funcao={solicitarProduto}>Solicitar</ButtonModal>
            </div>
        </div>
    );
}

function AbrirModalRequestProd() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        html: <ModalRequestProd />,
        showConfirmButton: false,
        heightAuto: true,
    });
}

export default AbrirModalRequestProd;
