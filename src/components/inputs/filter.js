import React, { useState, useEffect } from 'react';
import ButtonModal from "../buttons/buttonsModal";
import InputFilterDate from "../inputs/inputFilterDate";
import ComboBoxFilter from "../inputs/comboBoxFilter";

import ApiRequest from '../../connections/ApiRequest';
import Alert from '../alerts/Alert';

function Filter({ data, cor, modelo, tamanho, preço, status, vendedor, tipoVenda, horario, tipoAlerta, produto, funcaoFilter, funcaoOriginal, categoriaModelo, tipoModelo, statusVenda }) {
    const [selectedValue, setSelectedValue] = useState('estoque');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const [cores, setCores] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [tiposModelo, setTiposModelo] = useState([]);
    const [categoriasModelo, setCategoriasModelo] = useState([]);
    const [tamanhos, setTamanhos] = useState([]);
    const [tiposVenda, setTiposVenda] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const [statusTransferencia, setStatusTransferencia] = useState([
        { nome: 'ACEITO' },
        { nome: 'NEGADO' },
        { nome: 'PENDENTE' }
    ]);

    const [statusVendas, setStatusVendas] = useState([
        { nome: 'PENDENTE' },
        { nome: 'FINALIZADA' },
        { nome: 'CANCELADA' }
    ])

    const [inputCorSelecionada, setInputCorSelecionada] = useState('');
    const [inputModeloSelecionado, setInputModeloSelecionado] = useState('');
    const [inputCategoriaModeloSelecionado, setInputCategoriaModeloSelecionado] = useState('');
    const [inputTipoModeloSelecionado, setInputTipoModeloSelecionado] = useState('');
    const [inputTipoVendaSelecionado, setInputTipoVendaSelecionado] = useState('');
    const [inputTamanhoSelecionado, setInputTamanhoSelecionado] = useState('');
    const [inputStatusSelecionado, setInputStatusSelecionado] = useState('');
    const [inputStatusVendaSelecionado, setInputStatusVendaSelecionado] = useState('');
    const [inputVendedorSelecionado, setInputVendedorSelecionado] = useState('');
    const [inputProdutoSelecionado, setInputProdutoSelecionado] = useState('');
    const [inputDataInicioSelecionada, setInputDataInicioSelecionada] = useState('');
    const [inputDataFimSelecionada, setInputDataFimSelecionada] = useState('');
    const [inputHorarioInicioSelecionado, setInputHorarioInicioSelecionado] = useState('');
    const [inputHorarioFimSelecionado, setInputHorarioFimSelecionado] = useState('');
    const [inputPrecoInicioSelecionado, setInputPrecoInicioSelecionado] = useState('');
    const [inputPrecoFimSelecionado, setInputPrecoFimSelecionado] = useState('');

    const handleInput = (evento, stateFunction) => {
        stateFunction(evento.target.value);
    };

    const handleClearFilters = () => {
        setInputCorSelecionada('');
        setInputModeloSelecionado('');
        setInputTamanhoSelecionado('');
        setInputStatusSelecionado('');
        setInputStatusVendaSelecionado('');
        setInputTipoVendaSelecionado('');
        setInputVendedorSelecionado('');
        setInputProdutoSelecionado('');
        setInputDataInicioSelecionada('');
        setInputDataFimSelecionada('');
        setInputHorarioInicioSelecionado('');
        setInputHorarioFimSelecionado('');
        setInputPrecoInicioSelecionado('');
        setInputPrecoFimSelecionado('');
        setSelectedValue('estoque');
        setInputCategoriaModeloSelecionado('');
        setInputTipoModeloSelecionado('');

        funcaoOriginal();
    };

    async function fetchData() {
        if (cor) {
            try {
                const response = await ApiRequest.corGetAll();

                if (response.status === 200) {
                    const dados = response.data;
                    setCores(dados);
                }
            } catch (error) {
                console.log("Erro ao buscar os dados", error);
            }
        }

        if (modelo) {
            try {
                const response = await ApiRequest.modeloGetAll();

                if (response.status === 200) {
                    const dados = response.data;

                    const filtrarDados = dados.map(obj => (
                        { id: obj.id, nome: obj.nome }
                    ));

                    const filtrarCategoriaDados = dados.reduce((acc, obj) => {
                        if (!acc.some(accObj => accObj.nome === obj.categoria)) {
                            acc.push({ nome: obj.categoria });
                        }
                        return acc;
                    }, []);

                    const filtrarTipoDados = dados.reduce((acc, obj) => {
                        if (!acc.some(accObj => accObj.nome === obj.tipo)) {
                            acc.push({ nome: obj.tipo });
                        }
                        return acc;
                    }, []);

                    setModelos(filtrarDados);
                    setCategoriasModelo(filtrarCategoriaDados);
                    setTiposModelo(filtrarTipoDados);
                }
            } catch (error) {
                console.log("Erro ao buscar os dados", error);
            }
        }

        if (tamanho) {
            try {
                const response = await ApiRequest.tamanhoGetAll();

                if (response.status === 200) {
                    const dados = response.data;

                    const filtrarDados = dados.map(obj => (
                        { id: obj.id, nome: obj.numero }
                    ));

                    setTamanhos(filtrarDados);
                }
            } catch (error) {
                console.log("Erro ao buscar os dados", error);
            }
        }

        if (tipoVenda) {
            try {
                const response = await ApiRequest.tipoVendaGetAll();

                if (response.status === 200) {
                    const dados = response.data;

                    const filtrarDados = dados.map(obj => (
                        { id: obj.id, nome: obj.tipo }
                    ));

                    setTiposVenda(filtrarDados);
                }
            } catch (error) {
                console.log("Erro ao buscar os dados", error);
            }
        }

        if (vendedor) {
            try {
                const response = await ApiRequest.userGetAll();

                if (response.status === 200) {
                    const dados = response.data;

                    const filtrarDados = dados.map(obj => (
                        { id: obj.id, nome: obj.nome }
                    ));

                    setVendedores(filtrarDados);
                }
            } catch (error) {
                console.log("Erro ao buscar os dados", error);
            }
        }

        if (produto) {
            try {
                const response = await ApiRequest.produtoGetAll();

                if (response.status === 200) {
                    const dados = response.data;

                    const filtrarDados = dados.map(obj => (
                        { id: obj.id, nome: obj.nome }
                    ));

                    setProdutos(filtrarDados);
                }
            } catch (error) {
                console.log("Erro ao buscar os dados", error);
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleFilter = () => {
        const filterData = {
            cor: inputCorSelecionada,
            modelo: inputModeloSelecionado,
            tamanho: inputTamanhoSelecionado,
            status: inputStatusSelecionado,
            tipoVenda: inputTipoVendaSelecionado,
            vendedor: inputVendedorSelecionado,
            produto: inputProdutoSelecionado,
            dataInicio: inputDataInicioSelecionada,
            dataFim: inputDataFimSelecionada,
            horaInicio: inputHorarioInicioSelecionado,
            horaFim: inputHorarioFimSelecionado,
            precoInicio: inputPrecoInicioSelecionado,
            precoFim: inputPrecoFimSelecionado,
            tipoAlerta: selectedValue,
            categoriaModelo: inputCategoriaModeloSelecionado,
            tipoModelo: inputTipoModeloSelecionado,
            statusVenda: inputStatusVendaSelecionado
        };

        if (filterData.cor !== '' || filterData.modelo !== '' || filterData.tamanho !== '' || filterData.status !== '' || filterData.tipoVenda !== '' || filterData.vendedor !== '' || filterData.produto !== '' || filterData.dataInicio !== '' || filterData.dataFim !== '' || filterData.horaInicio !== '' || filterData.horaFim !== '' || filterData.precoInicio !== '' || filterData.precoFim !== '' || filterData.categoriaModelo !== '' || filterData.tipoModelo !== '' || filterData.statusVenda !== '') {
            funcaoFilter(filterData);
        } else {
            Alert.alertTop(true, 'Nenhum campo preenchido!');
        }
    };

    return (
        <div className="w-full flex flex-wrap justify-between items-center text-center gap-[5px]">
            {/* Seção dos filtros */}
            <div className="md:flex md:space-x-4 md:w-auto md:mb-0">
                {data && (
                    <div>
                        <InputFilterDate
                            type="date"
                            placeholder="DD/MM/AAAA"
                            inicio="Data de"
                            fim="á"
                            name="select_data"
                            valueInicio={inputDataInicioSelecionada}
                            valueFim={inputDataFimSelecionada}
                            handleInputInicio={(e) => handleInput(e, setInputDataInicioSelecionada)}
                            handleInputFim={(e) => handleInput(e, setInputDataFimSelecionada)}
                        />
                    </div>
                )}
                {horario && (
                    <div>
                        <InputFilterDate
                            type="time"
                            placeholder="HH:MM"
                            inicio="Hora de"
                            fim="á"
                            name="select_hora"
                            valueInicio={inputHorarioInicioSelecionado}
                            valueFim={inputHorarioFimSelecionado}
                            handleInputInicio={(e) => handleInput(e, setInputHorarioInicioSelecionado)}
                            handleInputFim={(e) => handleInput(e, setInputHorarioFimSelecionado)}
                        />
                    </div>
                )}
                {vendedor && <ComboBoxFilter name="select_vendedor" opcoes={vendedores} value={inputVendedorSelecionado} handleInput={handleInput} handleAtribute={setInputVendedorSelecionado}>Vendedor</ComboBoxFilter>}
                {tipoVenda && <ComboBoxFilter name="select_tipo" opcoes={tiposVenda} value={inputTipoVendaSelecionado} handleInput={handleInput} handleAtribute={setInputTipoVendaSelecionado}>Tipo</ComboBoxFilter>}
                {cor && <ComboBoxFilter name="select_cor" opcoes={cores} value={inputCorSelecionada} handleInput={handleInput} handleAtribute={setInputCorSelecionada} valueNome>Cor</ComboBoxFilter>}
                {modelo && <ComboBoxFilter name="select_modelo" opcoes={modelos} value={inputModeloSelecionado} handleInput={handleInput} handleAtribute={setInputModeloSelecionado} valueNome>Modelo</ComboBoxFilter>}
                {categoriaModelo && <ComboBoxFilter name="select_categoria_modelo" opcoes={categoriasModelo} value={inputCategoriaModeloSelecionado} handleInput={handleInput} handleAtribute={setInputCategoriaModeloSelecionado} valueNome>Categoria</ComboBoxFilter>}
                {tipoModelo && <ComboBoxFilter name="select_tipo_modelo" opcoes={tiposModelo} value={inputTipoModeloSelecionado} handleInput={handleInput} handleAtribute={setInputTipoModeloSelecionado} valueNome>Tipo</ComboBoxFilter>}
                {produto && <ComboBoxFilter name="select_produto" opcoes={produtos} value={inputProdutoSelecionado} handleInput={handleInput} handleAtribute={setInputProdutoSelecionado} valueNome>Produto</ComboBoxFilter>}
                {tamanho && <ComboBoxFilter name="select_tamanho" opcoes={tamanhos} value={inputTamanhoSelecionado} handleInput={handleInput} handleAtribute={setInputTamanhoSelecionado} valueNome>Tamanho</ComboBoxFilter>}
                {status && <ComboBoxFilter name="select_status" opcoes={statusTransferencia} value={inputStatusSelecionado} handleInput={handleInput} handleAtribute={setInputStatusSelecionado} valueNome>Status</ComboBoxFilter>}
                {statusVenda && <ComboBoxFilter name="select_status" opcoes={statusVendas} value={inputStatusVendaSelecionado} handleInput={handleInput} handleAtribute={setInputStatusVendaSelecionado} valueNome>Status</ComboBoxFilter>}
                {preço && (
                    <div>
                        <InputFilterDate
                            type="number"
                            placeholder="R$00,00"
                            inicio="Preço de"
                            fim="a"
                            name="select_preco"
                            valueInicio={inputPrecoInicioSelecionado}
                            valueFim={inputPrecoFimSelecionado}
                            handleInputInicio={(e) => handleInput(e, setInputPrecoInicioSelecionado)}
                            handleInputFim={(e) => handleInput(e, setInputPrecoFimSelecionado)}
                        />
                    </div>
                )}
                {tipoAlerta && (
                    <div className="flex items-center">
                        <label className="text-[1rem] text-black font-normal mr-3">Tipo:</label>
                        <div className="flex gap-5 mt-1">
                            <div className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="tpAlerta"
                                    value="estoque"
                                    checked={selectedValue === 'estoque'}
                                    onChange={handleChange}
                                />
                                Estoque
                            </div>
                            <div className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="tpAlerta"
                                    value="transferencias"
                                    checked={selectedValue === 'transferencias'}
                                    onChange={handleChange}
                                />
                                Transferências
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Botões de limpar e filtrar */}
            <div className="flex h-6 gap-2">
                <ButtonModal cor="#919191" funcao={handleClearFilters}>Limpar</ButtonModal>
                <ButtonModal funcao={handleFilter}>Filtrar</ButtonModal>
            </div>
        </div>
    );
}

export default Filter;
