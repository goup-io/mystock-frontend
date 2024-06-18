import React, { useState, useEffect } from 'react';
import PageLayout from '../PageLayoutAreaRestrita.js';
import TitleBox from '../../header/TitleBox.js';
import ChartBox from '../../chartsBoxes/ChartBox.js';
import Filter from '../../inputs/filter.js';
import InputSearcModal from '../../inputs/inputSearchModal.js';
import ModalAviso from '../../alerts/ModalAviso.js';
import ApiRequest from '../../../connections/ApiRequest.js';
import Alert from '../../alerts/Alert.js';

function Aviso() {
    const [dadosDoBanco, setDadosDoBanco] = useState([]);
    const [isEstoqueSelecionado, setIsEstoqueSelecionado] = useState(true);

    async function fetchData() {
        try {
            let response;
            if (localStorage.getItem('cargo') === 'ADMIN' && localStorage.getItem('visao_loja') === '0') {
                response = await ApiRequest.alertasGetAll();
            } else {
                response = await ApiRequest.alertasGetAllByLoja(localStorage.getItem('visao_loja'));
            }

            if (response.status === 200) {
                const dados = response.data;
                setDadosDoBanco(dados);
                console.log(dados);   
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    async function fetchDataFilter(filterData) {
        const isEstoque = filterData.tipoAlerta === 'estoque';
        setIsEstoqueSelecionado(isEstoque);

        try {
            let response;
            if (isEstoque) {
                if (localStorage.getItem('cargo') === 'ADMIN' && localStorage.getItem('visao_loja') === '0') {
                    response = await ApiRequest.alertasGetByFilter(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, '');
                } else {
                    response = await ApiRequest.alertasGetByFilter(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, localStorage.getItem('visao_loja'));
                }
            } else {
                if (localStorage.getItem('cargo') === 'ADMIN' && localStorage.getItem('visao_loja') === '0') {
                    response = await ApiRequest.transferenciaGetByFilter(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, filterData.modelo, filterData.produto, filterData.tamanho, filterData.cor, filterData.status, '');
                } else {
                    response = await ApiRequest.transferenciaGetByFilter(filterData.dataInicio, filterData.dataFim, filterData.horaInicio, filterData.horaFim, filterData.modelo, filterData.produto, filterData.tamanho, filterData.cor, filterData.status, localStorage.getItem('visao_loja'));
                }
            }

            if (response.status === 200) {
                const dados = response.data;
                setDadosDoBanco(dados);
                Alert.alertTop(false, "Filtro aplicado com sucesso!");
            } else if (response.status === 204) {
                Alert.alertTop(true, "Nenhum produto encontrado com os filtros aplicados!");
                fetchData();
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <PageLayout>
                <TitleBox title="Mural de Avisos"></TitleBox>
                <div className='w-full flex md:flex-row md:justify-center rounded-md py-4 px-5 drop-shadow-md items-center text-sm bg-white'>
                    <Filter data horario tipoAlerta funcaoOriginal={fetchData} funcaoFilter={fetchDataFilter}></Filter>
                </div>
                <ChartBox>
                    <div className='p-2 px-3 flex justify-between'>
                        <h2 className='font-medium text-lg'>AVISOS</h2>
                        <InputSearcModal props="text">Pesquisar</InputSearcModal>
                    </div>
                    <div className='h-[50vh] flex flex-col gap-2 px-3 mt-2 mb-5 overflow-y-auto'>
                        {dadosDoBanco.map((aviso, index) => (
                            isEstoqueSelecionado ? 
                                <ModalAviso 
                                    key={index} 
                                    tipo='Vermelho' 
                                    titulo={aviso.titulo} 
                                    descricao={aviso.descricao} 
                                    dataHora={(aviso.dataHora).replace('T', ' ')} 
                                />
                            : 
                                <ModalAviso 
                                    key={index} 
                                    tipo='Laranja' 
                                    titulo='Novo pedido de transferência' 
                                    descricao={`A ${aviso.loja_coletora} solicitou ${aviso.quantidadeSolicitada} ${aviso.etp.nome}, tamanho ${aviso.etp.tamanho} para a ${aviso.loja_liberadora}.`} 
                                    dataHora={(aviso.dataHora).replace('T', ' ')}
                                    isTransferencia 
                                />
                        ))}
                    </div>
                </ChartBox>
            </PageLayout>
        </>
    );
}

export default Aviso;
