import { borderRadius, height, margin } from '@mui/system';
import Header from '../../header/Header.js'
import PageLayout from '../PageLayout.js'
import Input from '../../inputs/inputAndLabelModal.js'
import Button from '../../buttons/buttonsModal.js'
import ButtonEdit from '../../buttons/buttonEdit.js'
import ButtonCancel from '../../buttons/buttonCancel.js'
import ModalCadastroProduto from '../../modals/modalCadastreProd.js'


    var divPai = {
        backgroundColor:"#F5F3F4",
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


function DivisorTracejado(){

    return <div class="border-[1px] border-dashed border-[#355070] rounded"></div>
}


function ResumoVenda(props){

    return(
        <ul class="flex flex-col gap-2 px-4 py-6 text-[1.2rem] font-semibold">
            <li class="flex flex-row justify-between">
                <p>Código da Venda</p>
                <p>{props.codigoVenda}</p>
            </li>
            <DivisorTracejado/>
            <li class="flex flex-row justify-between">
                <p>Total de Itens</p>
                <p>{props.totalItens}</p>
            </li>
            <DivisorTracejado/>
            <li class="flex flex-row justify-between">
                <p>Subtotal 1</p>
                <p>{props.subtotal1.toFixed(2)}</p>
            </li>
            <DivisorTracejado/>
            <li class="flex flex-row justify-between">
                <p>Desconto em Produtos</p>
                <p>{props.descontoProdutos.toFixed(2)}</p>
            </li>
            <DivisorTracejado/>
            <li class="flex flex-row justify-between">
                <p>Subtotal 2</p>
                <p>{props.subtotal2.toFixed(2)}</p>
            </li>
            <DivisorTracejado/>
            <li class="flex flex-row justify-between">
                <p>Desconto Venda</p>
                <p>{props.descontoVenda}</p>
            </li>
            <DivisorTracejado/>
            <li class="flex flex-row justify-between font-black">
                <p>Valor Total</p>
                <p>R${props.valorTotal.toFixed(2)}</p>
            </li>
        </ul>
    );
}

function ItemCarrinho(props){
    return(
        <tr class="bg-red-700 flex flex-row justify-between gap-16 pl-12">
            <td>
                <p class="font-normal text-[1.1rem]">{props.codigoProduto}</p>
            </td>
            <td>
                <p class="font-normal text-[1.1rem]">{props.descricaoProduto}</p>
            </td>
            <td>
                <p class="font-normal text-[1.1rem]">{props.precoUnitario}</p>
            </td>
            <td>
                <p class="font-normal text-[1.1rem]">{props.quantidade}</p>
            </td>
            <td>
                <p class="font-normal text-[1.1rem]">{props.descontoUnitario}</p>
            </td>
            <td>
                <p class="font-normal text-[1.1rem]">{props.precoLiquido}</p>
            </td>
            <td>
                {<ButtonEdit/>}
                {<ButtonCancel/>}
            </td>
        </tr>
    )
}

function cadastrarProduto(){
    return(
        <ModalCadastroProduto/>
    )
}

function Venda() {
    return(
        <>
            <PageLayout>
                <Header telaAtual="Área de Pré-venda"></Header>
                <div style={divPai}>
                    <div style={div1} class="shadow flex flex-col items-start py-4 px-8">
                        <div class="flex justify-between w-full text-2xl">
                            <p class="font-semibold text-2xl">CARRINHO</p>
                            <div class="flex flex-row-reverse w-2/3 gap-4 items-center">
                                <Button funcao={cadastrarProduto}><p class="flex justify-between w-full text-2xl">Adicionar Produto</p></Button>
                                <Button><p class="flex justify-between w-full text-2xl">Adicionar Kit</p></Button>
                            </div>
                        </div>

                        <div class="bg-[#F5F3F4] w-full h-full rounded-[5px] my-2 overflow-y-scroll">
                            <table class="w-full mt-3" id='tabelaCarrinho'>
                                <thead>
                                    <tr class="flex flex-row gap-16 pl-6">
                                        <th>
                                            <p class="font-medium text-[1.1rem]">Código Prod.</p>
                                        </th>
                                        <th>
                                            <p class="font-medium text-[1.1rem]">Descrição Prod.</p>
                                        </th>
                                        <th>
                                            <p class="font-medium text-[1.1rem]">Preço Un.</p>
                                        </th>
                                        <th>
                                            <p class="font-medium text-[1.1rem]">Quanti.</p>
                                        </th>
                                        <th>
                                            <p class="font-medium text-[1.1rem]">Desconto Un.</p>
                                        </th>
                                        <th>
                                            <p class="font-medium text-[1.1rem]">Preço Líquido</p>
                                        </th>
                                        <th>sim</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <ItemCarrinho
                                        codigoProduto={2}
                                        descricaoProduto={"Produto"}
                                        precoUnitario={12}
                                        quantidade={2}
                                        descontoUnitario={30}
                                        precoLiquido={11}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={div2} class="shadow flex flex-col items-start px-8 justify-evenly">
                        <p class="font-semibold text-2xl">DADOS BÁSICOS DA VENDA:</p>
                        <div class="flex flex-row items-center align-middle gap-6">
                            <div class="flex flex-row items-center text-[1.45rem] gap-3">
                                <p>Cód. vendedor:</p>
                                <Input/>
                            </div>
                            <div class="flex flex-row items-center text-[1.45rem] gap-3">
                                <p>Tipo Venda:</p>
                                <Input/>
                            </div>
                        </div>
                    </div>
                    <div style={div3} class="shadow flex flex-col items-center">
                        <p class="font-semibold text-2xl mt-4">RESUMO DA VENDA</p>
                        <div class="bg-[#F5F3F4] w-11/12 h-full rounded-[8px] my-4 mb-3">
                            <ResumoVenda
                                codigoVenda={1}
                                totalItens={12}
                                subtotal1={14}
                                descontoProdutos={14}
                                subtotal2={9}
                                descontoVenda={8}
                                valorTotal={49}
                            />
                        </div>
                        <div class="flex flex-col w-full gap-2 my-2 px-5">
                            <Button>
                                <p class="text-[1.1rem] p-2">ADICIONAR DESCONTO À VENDA</p>
                            </Button>
                            <Button>
                                <p class="text-2xl p-2">FINALIZAR PRÉ-VENDA</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}


export default Venda