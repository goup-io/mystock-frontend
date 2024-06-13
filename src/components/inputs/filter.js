import React, { useState, useEffect } from 'react';
import ButtonClearFilter from "../buttons/buttonClearFilter";
import ButtonModal from "../buttons/buttonsModal";
import InputFilterDate from "../inputs/inputFilterDate";
import ComboBoxFilter from "../inputs/comboBoxFilter";

import ApiRequest from '../../connections/ApiRequest';

function Filter({ data, cor, modelo, tamanho, preço, status, vendedor, tipoVenda, horario, tipoAlerta, produto }) {
    const [selectedValue, setSelectedValue] = useState('todos');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const [cores, setCores] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [tamanhos, setTamanhos] = useState([]);
    const [tiposVenda, setTiposVenda] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const [statusTransferencia, setStatusTransferencia] = useState([
        {id: 'ACEITO', nome: 'Aceito'},
        {id: 'NEGADO', nome: 'Negado'},
        {id: 'PENDENTE', nome: 'Pendente'}
    ]);

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

                    const filtrarDados = dados
                        .map(obj => (
                            {
                                id: obj.id, nome: obj.nome
                            }
                        ));

                    setModelos(filtrarDados);
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

                    const filtrarDados = dados
                        .map(obj => (
                            {
                                id: obj.id, nome: obj.numero
                            }
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

                    const filtrarDados = dados
                        .map(obj => (
                            {
                                id: obj.id, nome: obj.tipo
                            }
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

                    const filtrarDados = dados
                        .map(obj => (
                            {
                                id: obj.id, nome: obj.nome
                            }
                        ));

                    setVendedores(filtrarDados);
                }
            } catch (error) {
                console.log("Erro ao buscar os dados", error);
            }
        }

        if (produtos) {
            try {
                const response = await ApiRequest.produtoGetAll();

                if (response.status === 200) {
                    const dados = response.data;

                    const filtrarDados = dados
                        .map(obj => (
                            {
                                id: obj.id, nome: obj.nome
                            }
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

    return (
        <div className="w-full flex flex-wrap justify-between items-center text-center">
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
                        />
                    </div>
                )}
                {vendedor && <ComboBoxFilter name="select_vendedor" opcoes={vendedores}>Vendedor</ComboBoxFilter>}
                {tipoVenda && <ComboBoxFilter name="select_tipo" opcoes={tiposVenda}>Tipo</ComboBoxFilter>}
                {cor && <ComboBoxFilter name="select_cor" opcoes={cores}>Cor</ComboBoxFilter>}
                {modelo && <ComboBoxFilter name="select_modelo" opcoes={modelos}>Modelo</ComboBoxFilter>}
                {produto && <ComboBoxFilter name="select_produto" opcoes={produtos}>Produto</ComboBoxFilter>}
                {tamanho && <ComboBoxFilter name="select_tamanho" opcoes={tamanhos}>Tamanho</ComboBoxFilter>}
                {status && <ComboBoxFilter name="select_status" opcoes={statusTransferencia}>Status</ComboBoxFilter>}
                {preço && (
                    <div>
                        <InputFilterDate
                            type="text"
                            placeholder="R$00,00"
                            inicio="Preço de"
                            fim="á"
                            name="select_preco"
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
                                    value="todos"
                                    checked={selectedValue === 'todos'}
                                    onChange={handleChange}
                                /> 
                                Todos
                            </div>
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
            <div className="flex h-6">
                <ButtonClearFilter>Limpar</ButtonClearFilter>
                <ButtonModal>Filtrar</ButtonModal>
            </div>
        </div>
    );
}

export default Filter;
