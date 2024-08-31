import PageLayout from '../PageLayout.js';
import Header from '../../header/Header.js';
import Button from '../../buttons/buttonsModal.js';
import ApiRequest from "../../../connections/ApiRequest";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../alerts/Alert.js';

const styleTitulo = {
    display: 'flex',
    justifyContent: 'space-between'
};

function CaixaTexto(props) {
    return (
        <div style={styleTitulo}>
            <p className="text-left font-semibold text-xl mb-2">{props.titulo !== undefined ? props.titulo : "SEM TITULO"}</p>
            <span>Quantidade:  {props.quantidadeItens}</span>
        </div>
    );
}

function ItemCarrinho(props) {
    const { id, horario, vendedor, quantidadeItens, tipoVenda, valor, par } = props;
    const navigate = useNavigate();

    const style = {
        backgroundColor: par ? "#E7E7E7" : "#D0D4F0",
    };

    function handleFinalizarVenda() {
        navigate(`/venda/pagamento/${props.id}`, { state: { id } });
    }

    const updateTable = () => {
        window.location.reload();
    };

    return (
        <tr style={style} className="h-20 rounded-md shadow p-5 pl-5 text-left">
            <td className='pl-5'>
                <p className="font-medium text-[1.1rem]"> {horario}</p>
            </td>
            <td className="text-start pl-8">
                <p className="font-medium text-[1.1rem]">{vendedor}</p>
            </td>
            <td>
                <p className="font-medium text-[1.1rem]">{quantidadeItens}</p>
            </td>
            <td>
                <p className="font-medium text-[1.1rem]">{tipoVenda}</p>
            </td>
            <td className="text-start">
                <p className="font-medium text-[1.1rem]">{"R$ " + valor}</p>
            </td>
            <td>
                <div className="flex flex-row items-center gap-4 justify-center">
                    <Button cor={"#919191"}><p className="text-[1rem] p-1 px-5">CANCELAR</p></Button>
                    <Button funcao={handleFinalizarVenda}><p className="text-[1rem] p-1 px-5">FINALIZAR VENDA</p></Button>
                </div>
            </td>
        </tr>
    );
}

function Caixa() {
    const [dadosDoBancoVenda, setDadosDoBancoVenda] = useState([]);
    const idLoja = localStorage.getItem("loja_id");

    async function fetchData() {
        try {
            const response = await ApiRequest.vendaGetAllByLoja(idLoja);
            if (response.status === 200) {
                const dados = response.data;
                // Ordenar os dados por data e hora
                const dadosOrdenados = dados.sort((a, b) => {
                    const dateA = new Date(`${a.data}T${a.hora}`);
                    const dateB = new Date(`${b.data}T${b.hora}`);
                    return dateA - dateB;
                });
                console.log(dadosOrdenados)
                setDadosDoBancoVenda(dadosOrdenados);
            }
        } catch (error) {
            console.log("Erro ao buscar os dados", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <PageLayout>
            <Header telaAtual="Área de Venda - Caixa" tipo="caixa" />
            <div className="bg-[#fff] w-full h-[75vh] shadow-sm rounded-md px-12 py-5">
                <CaixaTexto titulo="PRÉ-VENDA" quantidadeItens={dadosDoBancoVenda.length} />
                <div className="bg-[#F5F3F4] w-full h-[90%] px-5 rounded-md overflow-auto">
                    <table className='w-full rounded-lg border-solid border-separate border-spacing-y-4'>
                        <thead>
                            <tr className="text-base text-left">
                                <th className='pl-5'>Horário</th>
                                <th className='pl-8'>Vendedor</th>
                                <th>Quant. Itens</th>
                                <th>Tp. de venda</th>
                                <th>Valor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosDoBancoVenda.map((venda, index) => (
                                <ItemCarrinho
                                    key={venda.id}
                                    id={venda.id}
                                    horario={`${venda.data} ${venda.hora}`}
                                    vendedor={`${venda.codigoVendedor} - ${venda.nomeVendedor}`}
                                    quantidadeItens={venda.qtdItens}
                                    tipoVenda={venda.tipoVenda.tipo}
                                    valor={venda.valor.toFixed(2)}
                                    par={index % 2 === 0}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PageLayout>
    );
}

export default Caixa;
