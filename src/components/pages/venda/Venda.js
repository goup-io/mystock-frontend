import Header from '../../header/Header.js'
import PageLayout from '../PageLayout.js'
import Input from '../../inputs/inputAndLabelModal.js'
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada.js'
import Tabela from '../../tables/TableRoundedBorderSpacing.js'

//Modais
import AbrirModalAddProdCart from "../../modals/modals-produto/modalAddProdCart.js"
import AbrirModalEditProd from "../../modals/modals-produto/modalEditProd.js"
import AbrirModalAddKitCart from '../../modals/modals-kit/modalAddKitCart.js'

//Botões
import ButtonEdit from '../../buttons/buttonEdit.js'
import ButtonCancel from '../../buttons/buttonCancel.js'
import Button from '../../buttons/buttonsModal.js'

//Hooks
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AbrirModalCadastreProd from '../../modals/modals-produto/modalCadastreProd.js'

var divPai = {
    backgroundColor: "#F5F3F4",
    marginTop: "0.5rem",
    display: "grid",
    height: "72vh",
    gap: "16px",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "repeat(9, 1fr)",
}

var div2 = {
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
    borderRadius: "16px",
    gridArea: "1 / 1 / 3 / 6",
};

var div1 = {
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
    borderRadius: "16px",
    gridArea: "3 / 1 / 10 / 6",
};

var div3 = {
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
    borderRadius: "16px",
    gridArea: "1 / 6 / 10 / 8",
};

var contadorId = 0

function ResumoVenda(props) {

    return (
        <ul class="flex flex-col gap-2 px-4 py-6 text-[1.2rem] font-semibold">
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
                infoDireita={"R$ "+props.subtotal1.toFixed(2)}
            />
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Desconto em Produtos"}
                infoDireita={"R$ "+props.descontoProdutos.toFixed(2)}
            />
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Subtotal 2"}
                infoDireita={"R$ "+props.subtotal2.toFixed(2)}
            />
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Desconto Venda"}
                infoDireita={"R$ "+props.descontoVenda.toFixed(2)}
            />
            <ItemSeparadoPorLinhaTracejada
                infoEsquerda={"Valor Total"}
                infoDireita={"R$ "+props.valorTotal}
            />
        </ul>
    );
}

function ItemCarrinho(props) {
    return (

        <tr class="bg-[#DEE2FF] h-16 rounded ">
            <td class="">
                <p class="font-medium text-[1.4rem]">{props.codigoProduto}</p>
            </td>
            <td>
                <p class="font-medium text-[1.4rem]">{props.descricaoProduto}</p>
            </td>
            <td>
                <p class="font-medium text-[1.4rem]">{props.precoUnitario}</p>
            </td>
            <td>
                <p class="font-medium text-[1.4rem]">{props.quantidade}</p>
            </td>
            <td>
                <p class="font-medium text-[1.4rem]">{props.descontoUnitario}</p>
            </td>
            <td>
                <p class="font-medium text-[1.4rem]">{props.precoLiquido}</p>
            </td>
            <td>
                <div class="flex flex-row items-center gap-12 justify-center">
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

function cadastrarProduto() {
    return (
        <AbrirModalCadastreProd />
    )
}

function Venda() {

    const [subTotal1, setSubTotal1] = useState(0.00);
    const [subTotal2, setSubTotal2] = useState(0.00);
    const [itemsCarrinho, setItemsCarrinho] = useState([]);
    const [descontoVenda, setDescontoVenda] = useState(0.00);
    const [descontoProdutos, setDescontoProdutos] = useState(0.00);
    const [valorTotal, setValorTotal] = useState(0.00);

    const [codigoVendedor, setCodigoVendedor] = useState("")
    const [tipoVenda, setTipoVenda] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        console.log(itemsCarrinho)

        let subTotal1 = 0;
        let subTotal2 = 0;
        let descontoProdutos = 0;
        let valorTotal = 0;

        itemsCarrinho.forEach(element => {
            subTotal1 += element.props.precoUnitario;
            subTotal2 += element.props.precoUnitario - element.props.descontoUnitario;
            descontoProdutos += element.props.descontoUnitario;
            valorTotal += (element.props.precoUnitario - element.props.descontoUnitario) * element.props.quantidade;
        });

        setSubTotal1(subTotal1);
        setSubTotal2(subTotal2);
        setDescontoProdutos(descontoProdutos);
        setValorTotal(valorTotal);

    }, [itemsCarrinho]);

    function adicionarItemCarrinho(item) {

        setItemsCarrinho(prevItemsCarrinho => {

            var ItemsCarrinhoAux = []

            prevItemsCarrinho.forEach(element => {
                ItemsCarrinhoAux.push(element)
            });

            ItemsCarrinhoAux.push(            
                    <ItemCarrinho
                    id={contadorId}
                    key={contadorId}
                    codigoProduto={item.codigoProduto}
                    descricaoProduto={item.descricaoProduto}
                    precoUnitario={item.precoUnitario}
                    quantidade={item.quantidade}
                    descontoUnitario={item.descontoUnitario}
                    precoLiquido={(item.precoUnitario - item.descontoUnitario) * item.quantidade}
                    />
                )

            return ItemsCarrinhoAux;
        });

        contadorId++;
    }

    function removerItemCarrinho(id){
        
        setItemsCarrinho(prevItemsCarrinho => {
            
            var ItemsCarrinhoAux = []
            var item = null

            prevItemsCarrinho.forEach(element => {
                if(element.props.id !== id){
                    ItemsCarrinhoAux.push(element)

                }else{
                    item = element.props
                    console.log(element.props)
                }
            });

            return ItemsCarrinhoAux;
        });

    }
    
    function ItemCarrinho(props) {
        return (
    
            <tr class="bg-[#DEE2FF] h-16 rounded" >
                <td class="">
                    <p class="font-medium text-[1.4rem]">{props.codigoProduto}</p>
                </td>
                <td>
                    <p class="font-medium text-[1.4rem]">{props.descricaoProduto}</p>
                </td>
                <td>
                    <p class="font-medium text-[1.4rem]">R$ {props.precoUnitario}</p>
                </td>
                <td>
                    <p class="font-medium text-[1.4rem]">{props.quantidade}</p>
                </td>
                <td>
                    <p class="font-medium text-[1.4rem]">R$ {props.descontoUnitario}</p>
                </td>
                <td>
                    <p class="font-medium text-[1.4rem]">R$ {props.precoLiquido}</p>
                </td>
                <td>
                    <div class="flex flex-row items-center gap-12 justify-center">
                        <ButtonEdit
                            width={40}
                            funcao={() => AbrirModalEditProd()}
                        />
                        <ButtonCancel
                            posicao={props.id}
                            funcao={() => removerItemCarrinho(props.id)} 
                            width={30}
                        />                    
                    </div>
                </td>
            </tr>
        )
    }

    function finalizarVenda(){
        if(codigoVendedor === "" && codigoVendedor === null){
            
        }

        if(tipoVenda === "" && tipoVenda === null){

        }
    }

    function handleInput(evento, stateFunction){
        
        stateFunction(evento.target.value);
    }

    return (
        <PageLayout>
            <Header telaAtual="Área de Venda"/>
            <div style={divPai}>
                <div style={div1} class="shadow flex flex-col items-start py-4 px-8">
                    <div class="flex justify-between w-full text-2xl">
                        <p class="font-semibold text-2xl">CARRINHO</p>
                        <div class="flex flex-row-reverse w-2/3 gap-4 items-center">
                            <Button funcao={() => AbrirModalAddProdCart(adicionarItemCarrinho)}><p class="flex justify-between w-full text-2xl">Adicionar Produto</p></Button>
                            <Button funcao={() => AbrirModalAddKitCart()}>
                                <p class="flex justify-between w-full text-2xl">Adicionar Kit</p>
                            </Button>
                        </div>
                    </div>

                    <div class="bg-[#F5F3F4] w-full h-full rounded-[5px] my-2 overflow-y-scroll p-4">
                        <Tabela>
                            <thead>
                                <tr class="flex-row gap-16 pl-6 table-row">
                                    <th>
                                        <p class="font-medium text-[1.2rem]">Código Prod.</p>
                                    </th>
                                    <th>
                                        <p class="font-medium text-[1.2rem]">Descrição Prod.</p>
                                    </th>
                                    <th>
                                        <p class="font-medium text-[1.2rem]">Preço Un.</p>
                                    </th>
                                    <th>
                                        <p class="font-medium text-[1.2rem]">Quanti.</p>
                                    </th>
                                    <th>
                                        <p class="font-medium text-[1.2rem]">Desconto Un.</p>
                                    </th>
                                    <th>
                                        <p class="font-medium text-[1.2rem]">Preço Líquido</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsCarrinho.length == 0 ? null : itemsCarrinho}
                            </tbody>
                        </Tabela>
                        {itemsCarrinho.length == 0 ? null : 
                            <div class="bg-[#355070] flex flex-row mt-[-24px] w-full h-14 rounded-b-lg font-bold items-center justify-end">
                                <p class="text-right pr-12 text-2xl text-white">Subtotal: R$ {subTotal2.toFixed(2)}</p>
                            </div>
                        }  
                        
                    </div>
                </div>
                <div style={div2} class="shadow flex flex-col items-start px-8 justify-evenly">
                    <p class="font-semibold text-2xl">DADOS BÁSICOS DA VENDA:</p>
                    <div class="flex flex-row items-center align-middle gap-6">
                        <div class="flex flex-row items-center text-[1.45rem] gap-3">
                            <p>Cód. vendedor:</p>
                            <Input
                                handleInput={handleInput}
                                handlerAtributeChanger={setCodigoVendedor}
                            />
                        </div>
                        <div class="flex flex-row items-center text-[1.45rem] gap-3">
                            <p>Tipo Venda:</p>
                            <Input 
                                handleInput={handleInput}
                                handlerAtributeChanger={setTipoVenda}
                            />
                        </div>
                    </div>
                </div>
                <div style={div3} class="shadow flex flex-col items-center">
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
                    <div class="flex flex-col w-full gap-2 my-2 px-5">
                        <Button>
                            <p class="text-[1.1rem] p-2">ADICIONAR DESCONTO À VENDA</p>
                        </Button>
                        <Button
                            funcao={() => navigate("/venda/caixa")}
                        >
                            <p class="text-2xl p-2">FINALIZAR PRÉ-VENDA</p>
                        </Button>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}


export default Venda    