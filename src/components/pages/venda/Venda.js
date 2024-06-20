import Header from '../../header/Header.js'
import PageLayout from '../PageLayout.js'

//Inputs
// import Input from '../../inputs/inputAndLabelModal.js'
import Input from '../../inputs/InputsCadastre.js'
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada.js'
import ComboBoxFilter from '../../inputs/comboBoxFilter.js'

//Tabela
import Tabela from '../../tables/TableRoundedBorderSpacing.js'
import tabelaEstilos from '../../tables/TableRoundedBorderSpacing.module.css'

//Modais
import AbrirModalAddProdCart from "../../modals/modals-produto/modalAddProdCart.js"
import AbrirModalEditProd from "../../modals/modals-produto/modalEditProd.js"
import AbrirModalAddKitCart from '../../modals/modals-kit/modalAddKitCart.js'
import Alert from '../../alerts/Alert.js'
import AbrirModalAddDiscount from '../../modals/modalAddDiscount.js'

//Botões
import ButtonEdit from '../../buttons/buttonEdit.js'
import ButtonCancel from '../../buttons/buttonCancel.js'
import Button from '../../buttons/buttonsModal.js'

//Hooks
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ApiRequest } from '../../../connections/ApiRequest.js'
import AbrirModalCadastreProd from '../../modals/modals-produto/modalCadastreProd.js'

//Icons
import ErrorIcon from '../../../assets/icons/error.svg'
import SucessIcon from '../../../assets/icons/sucess.svg'

var divPai = {
    backgroundColor: "#F5F3F4",
    marginTop: "0.5rem",
    display: "grid",
    height: "89%",
    gap: "16px",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "repeat(9, 1fr)",
}

var divDadosBasicosVenda = {
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
    borderRadius: "6px",
    gridArea: "1 / 1 / 2 / 6",
};

var divCarrinho = {
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
    borderRadius: "6px",
    gridArea: "2 / 1 / 10 / 6",
};

var divResumoVenda = {
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
    borderRadius: "6px",
    gridArea: "1 / 6 / 10 / 8",
};

var contadorId = 0


function ResumoVenda(props) {

    return (
        <ul className="flex flex-col gap-2 px-4 py-6 text-[1.2rem] font-semibold">
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Código da Venda"}
                infoDireita={props.codigoVenda}
            />
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Total de Itens"}
                infoDireita={props.totalItens}
            />
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Subtotal 1"}
                infoDireita={"R$ " + props.subtotal1.toFixed(2)}
            />
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Desconto em Produtos"}
                infoDireita={"R$ " + props.descontoProdutos.toFixed(2)}
            />
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Subtotal 2"}
                infoDireita={"R$ " + props.subtotal2.toFixed(2)}
            />
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Desconto Venda"}
                infoDireita={"R$ " + props.descontoVenda.toFixed(2)}
            />
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Valor Total"}
                infoDireita={"R$ " + props.valorTotal}
            />
        </ul>
    )
}

function ItemCarrinho(props) {
    return (

        <tr className="bg-[#DEE2FF] h-16 rounded ">
            <td className={tabelaEstilos.tabelaLinhaRounded}>
                <p className="font-medium text-[1.4rem]">{props.codigoProduto}</p>
            </td>
            <td className={tabelaEstilos.tabelaLinhaRounded}>
                <p className="font-medium text-[1.4rem]">{props.descricaoProduto}</p>
            </td>
            <td className={tabelaEstilos.tabelaLinhaRounded}>
                <p className="font-medium text-[1.4rem]">{props.precoUnitario}</p>
            </td>
            <td className={tabelaEstilos.tabelaLinhaRounded}>
                <p className="font-medium text-[1.4rem]">{props.quantidade}</p>
            </td>
            <td className={tabelaEstilos.tabelaLinhaRounded}>
                <p className="font-medium text-[1.4rem]">{props.descontoUnitario}</p>
            </td>
            <td className={tabelaEstilos.tabelaLinhaRounded}>
                <p className="font-medium text-[1.4rem]">{props.precoLiquido}</p>
            </td>
            <td className={tabelaEstilos.tabelaLinhaRounded}>
                <div className="flex flex-row items-center gap-12 justify-center">
                    <ButtonEdit
                        width={40}
                    />
                    <ButtonCancel
                        width={30}
                    />
                </div>
            </td>
        </tr>
    )
}

export const SelectedItemsContext = React.createContext([[], () => {}]);

function Venda() {

    const [subTotal1, setSubTotal1] = useState(0.00);
    const [subTotal2, setSubTotal2] = useState(0.00);
    const [itemsCarrinho, setItemsCarrinho] = useState([]);

    const [itemsCarrinhoContext, setItemsCarrinhoContext] = useState([]);

    const [descontoVenda, setDescontoVenda] = useState(0.00);
    const [descontoProdutos, setDescontoProdutos] = useState(0.00);
    const [valorTotal, setValorTotal] = useState(0.00);

    const [codigoVendedor, setCodigoVendedor] = useState("")
    const [tipoVenda, setTipoVenda] = useState("");
    const [tipoVendaSelecionado, setTipoVendaSelecionado] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {    
        console.log(itemsCarrinhoContext);  
    }, [itemsCarrinhoContext]);

    useEffect(() => {
        fetchData();
        recuperarTipoVenda();

        let subTotal1 = 0;
        let subTotal2 = 0;
        let descontoProdutos = 0;
        let valorTotal = 0;

        itemsCarrinho.forEach(element => {
            subTotal1 += element.props.precoUnitario * element.props.quantidade;
            subTotal2 += (element.props.precoUnitario - element.props.descontoUnitario) * element.props.quantidade;
            descontoProdutos += element.props.descontoUnitario * element.props.quantidade;
            valorTotal += (element.props.precoUnitario - element.props.descontoUnitario) * element.props.quantidade;
        });

        setSubTotal1(subTotal1);
        setSubTotal2(subTotal2);
        setDescontoProdutos(descontoProdutos);
        setValorTotal(valorTotal);

    }, [itemsCarrinho]);

    function adicionarDescontoVenda(qtdDescontoVenda) {
        setDescontoVenda(qtdDescontoVenda)
    }

    function adicionarItemCarrinho(item) {
        console.log("olha o item", item)

        // setItemsCarrinho(prevItemsCarrinho => {

            var ItemsCarrinhoAux = []
            itemsCarrinho.forEach(produto => {
                console.log(produto)
                if(item.codigoProduto === produto.props.codigoProduto){
                    produto.props.quantidade++;
                     
                }else{
                    ItemsCarrinhoAux.push(produto)                    
                }

            })
            var encontrouRepetido = false;

        //     prevItemsCarrinho.forEach(element => {
        //         console.log("acara do elemento", element)

                if (item.codigoProduto === item.codigoProduto) {

                    var quantidade = item.quantidade + 1

                    ItemsCarrinhoAux.push(
                        <ItemCarrinho
                            id={contadorId}
                            key={contadorId}
                            codigoProduto={item.codigoProduto}
                            descricaoProduto={item.descricaoProduto}
                            precoUnitario={item.precoUnitario}
                            quantidade={item.quantidade}
                            descontoUnitario={0}
                            precoLiquido={item.precoUnitario * item.quantidade}
                        />)
                    encontrouRepetido = true;

                } else {
                    ItemsCarrinhoAux.push(item)
                }
            // });

            if (!encontrouRepetido) {
                ItemsCarrinhoAux.push(
                    // <ItemCarrinho
                    //     id={contadorId}
                    //     key={contadorId}
                    //     codigoProduto={item.codigoProduto ? item.codigoProduto : 0}
                    //     descricaoProduto={item.descricaoProduto}
                    //     precoUnitario={item.precoUnitario}
                    //     quantidade={item.quantidade}
                    //     descontoUnitario={item.descontoUnitario}
                    //     precoLiquido={item.precoUnitario - item.descontoUnitario}
                    // />
                )
            }
            setItemsCarrinho(ItemsCarrinhoAux);
        // });

        contadorId++;
    }

    async function recuperarTipoVenda(){
        const response = await ApiRequest.tipoVendaGetAll()

        try {
            if (response.status === 200){
                const dados = response.data.map(item => ({
                    id: item.id,
                    nome: item.tipo
                }));
                setTipoVenda(dados)
            }
        } catch (error) {
            console.log("Erro ao buscar os tipos venda", error);
        }
    }

    function removerItemCarrinho(id) {

        setItemsCarrinho(prevItemsCarrinho => {

            var ItemsCarrinhoAux = []
            var item = null

            prevItemsCarrinho.forEach(element => {
                if (element.props.id !== id) {
                    ItemsCarrinhoAux.push(element)

                } else {
                    if (element.props.quantidade > 1) {

                        var quantidade = element.props.quantidade - 1;

                        ItemsCarrinhoAux.push(<ItemCarrinho
                            id={element.props.contadorId}
                            key={element.props.contadorId}
                            codigoProduto={element.props.codigoProduto}
                            descricaoProduto={element.props.descricaoProduto}
                            precoUnitario={element.props.precoUnitario}
                            quantidade={quantidade}
                            descontoUnitario={element.props.descontoUnitario}
                            precoLiquido={element.props.precoUnitario - element.props.descontoUnitario}
                        />)
                    }
                }
            });

            return ItemsCarrinhoAux;
        });

    }

    function ItemCarrinho(props) {
        return (
            <tr className="bg-[#DEE2FF] h-24 rounded text-[1.2rem]" >
                <td>
                    <p className="font-medium">{props.codigoProduto}</p>
                </td>
                <td>
                    <p className="font-medium">{props.descricaoProduto}</p>
                </td>
                <td>
                    <p className="font-medium">R$ {props.precoUnitario}</p>
                </td>
                <td>
                    <p className="font-medium">{props.quantidade}</p>
                </td>
                <td>
                    <p className="font-medium">R$ {props.precoLiquido}</p>
                </td>
                <td>
                    <div className="flex flex-row items-center gap-12 justify-center">
                        <ButtonEdit
                            width={40}
                            funcao={() => AbrirModalEditProd()}
                        />
                        <ButtonCancel
                            posicao={props.id}
                            funcao={() => removerItemCarrinho(props.id)}
                            width={17}
                        />
                    </div>
                </td>
            </tr>

        )
    }

    function finalizarVenda() {

        if (codigoVendedor === "" || codigoVendedor === null) {
            Alert.alert(ErrorIcon, "Favor informar o código do vendedor")
            return;
        }

        if (tipoVenda === "" || tipoVenda === null) {
            Alert.alert(ErrorIcon, "Favor informar o tipo da venda")
            return;
        }

        ApiRequest.vendaCreate(
            descontoVenda,
            tipoVenda,
            codigoVendedor,
            itemsCarrinho
        )
    }

    function handleInput(evento, stateFunction) {

        stateFunction(evento.target.value);
    }


    const [idEtps, setIdEtps] = useState([]);

    async function fetchData() {

        {
            itemsCarrinhoContext.map((item, index) => (
                <ItemCarrinho
                    key={index} // Use um identificador único para a chave, como o índice neste caso
                    codigoProduto={item.codigoProduto}
                    descricaoProduto={item.descricaoProduto}
                    precoUnitario={item.precoUnitario}
                    quantidade={item.quantidade}
                    precoLiquido={item.precoUnitario * item.quantidade}
                    id={index} // Também use o índice como identificador único, se aplicável
                    removerItemCarrinho={() => removerItemCarrinho(index)} // Se precisar de uma função de remoção
                />
            ))
        }

    }

    useEffect(() => {

        console.log(" ITENS DO CARALEO",itemsCarrinhoContext)
        //adicionarItemCarrinho(...itemsCarrinhoContext)
    }, [itemsCarrinhoContext])


    return (
        <SelectedItemsContext.Provider value={[itemsCarrinhoContext, setItemsCarrinhoContext]}>
            <PageLayout>
                <Header telaAtual="Área de Venda" />
                <div style={divPai}>
                    <div style={divCarrinho} class="shadow flex flex-col items-start py-4 px-8">
                        <div class="flex justify-between w-full text-2xl">
                            <p class="font-semibold text-2xl">CARRINHO</p>
                            <div class="flex flex-row-reverse w-2/3 gap-4 items-center">
                                <Button funcao={() => AbrirModalAddProdCart(adicionarItemCarrinho)}>
                                    <p class="flex justify-between w-full text-2xl">Adicionar Produto</p>
                                </Button>
                                {/* <Button funcao={() => AbrirModalAddKitCart()}>
                                    <p className="flex justify-between w-full text-xl">Adicionar Kit</p>
                                </Button> */}
                            </div>
                        </div>

                        <div class="bg-[#F5F3F4] w-full h-full rounded-[5px] my-2 overflow-y-scroll px-4">
                            <Tabela>
                                <thead>
                                    <tr class="flex-row gap-16 pl-6 table-row text-[1.2rem]">
                                        <th>
                                            <p class="font-medium ">Código Prod.</p>
                                        </th>
                                        <th>
                                            <p class="font-medium">Descrição Prod.</p>
                                        </th>
                                        <th>
                                            <p class="font-medium">Preço Un.</p>
                                        </th>
                                        <th>
                                            <p class="font-medium">Quanti.</p>
                                        </th>

                                        <th>
                                            <p class="font-medium">Preço Líquido</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemsCarrinho.length == 0 ? null : itemsCarrinho}
                                </tbody>

                            </Tabela>
                            {itemsCarrinho.length == 0 ? null :
                                <div className="bg-[#DEE2FF] flex flex-row mt-[-24px] w-full h-9 rounded-b-md">
                                    <div className="bg-[#354f7014] flex flex-row w-full h-9 rounded-b-lg items-center justify-end">
                                        <p className="text-right pr-12 text-[1rem] font-bold text-black">Subtotal: R$ {subTotal2.toFixed(2)}</p>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    <div style={divDadosBasicosVenda} class="shadow flex flex-col items-start px-8 justify-evenly">
                        <div class="flex flex-wrap flex-row items-center align-middle gap-6 p-2">
                            <p class="font-semibold text-2xl">DADOS BÁSICOS DA VENDA:</p>
                            <div class="flex flex-row items-center text-[1.45rem] gap-3">
                                <p>Cód. vendedor:</p>
                                <Input
                                    handleInput={handleInput}
                                    handlerAtributeChanger={setCodigoVendedor}
                                    width="7rem"
                                />
                            </div>
                            <div class="flex flex-row items-center text-[1.45rem] gap-3 text-nowrap">
                                <p>Tipo Venda:</p>
                                <ComboBoxFilter
                                    width="8rem"
                                    height="2rem"
                                    bold="500"
                                    dadosBanco={tipoVendaListaNomes}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={divResumoVenda} class="shadow flex flex-col items-center">
                        <p class="font-semibold text-2xl mt-4">RESUMO DA VENDA</p>
                        <div class="bg-[#F5F3F4] w-11/12 h-full rounded-[8px] my-4 mb-3">
                            <ResumoVenda
                                codigoVenda={1}
                                totalItens={itemsCarrinho.length}
                                subtotal1={subTotal1}
                                descontoProdutos={descontoProdutos}
                                subtotal2={subTotal2}
                                descontoVenda={descontoVenda}
                                valorTotal={valorTotal.toFixed(2)}
                            />
                        </div>
                        <div class="flex flex-col w-full gap-2 my-2 px-5 flex-wrap text-[1.1rem] font-semibold">
                            <Button cor={"#DEE2FF"} funcao={() => AbrirModalAddDiscount(adicionarDescontoVenda)}>
                                <p class="p-2 text-black">ADICIONAR DESCONTO À VENDA</p>
                            </Button>
                            <Button funcao={finalizarVenda}>
                                <p class="p-2">FINALIZAR PRÉ-VENDA</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </PageLayout>
        </SelectedItemsContext.Provider>
    )
}


export default Venda    