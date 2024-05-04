import PageLayout from '../PageLayout.js'
import Header from '../../header/Header.js'
import Tabela from '../../tables/TableRoundedBorderSpacing.js'
import Button from '../../buttons/buttonsModal.js'

function CaixaTexto(props){
    return(
        <>
            <p class="text-left font-semibold text-2xl">{props.titulo != undefined ? props.titulo : "SEM TITULO"}</p>
            <div class="bg-[#F5F3F4] w-full h-[65vh] rounded">
                {props.children}
            </div>
        </>
    )
}

function ItemCarrinho(props) {
    return (

        <tr class="bg-[#E7E7E7] h-24 rounded">
            <td>
                <p class="font-medium text-[1.4rem]">{props.horario}</p>
            </td>
            <td class="text-start pl-8">
                <p class="font-medium text-[1.4rem]">{props.vendedor}</p>
            </td>
            <td>
                <p class="font-medium text-[1.4rem]">{props.quantidadeItens}</p>
            </td>
            <td>
                <p class="font-medium text-[1.4rem]">{props.tipoVenda}</p>
            </td>
            <td class="text-start">
                <p class="font-medium text-[1.4rem]">{"R$ "+props.valor}</p>
            </td>
            <td>
                <div class="flex flex-row items-center gap-4 justify-center">
                    <Button><p class="text-[1.3rem] p-1 px-5">CANCELAR</p></Button>                  
                    <Button><p class="text-[1.3rem] p-1 px-5">FINALIZAR VENDA</p></Button>                  
                </div>
            </td>
        </tr>
    ) 
}

function Caixa(){

    return(
        <PageLayout>
            <Header telaAtual="Área de Venda - Caixa" tipo="caixa"/>
            <div class="bg-[#fff] w-full h-[75vh] shadow-sm rounded-[10px] px-12 py-6">
                <CaixaTexto titulo="PRÉ-VENDA">
                    <div class="px-12">
                        <Tabela
                            layout={"auto"}
                        >
                            <thead>
                                <tr class="text-2xl">
                                    <th>Horário</th>
                                    <th >Vendedor</th>
                                    <th>Quant. Itens</th>
                                    <th>Tp. de venda</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ItemCarrinho
                                    horario={"12:12:12"}
                                    vendedor={"0221 - Jhonson"}
                                    quantidadeItens={32}
                                    tipoVenda={"Varejo"}
                                    valor={1223.32}
                                />
                                <ItemCarrinho
                                    horario={"12:12:12"}
                                    vendedor={"0221 - Alexandre, o ok"}
                                    quantidadeItens={32}
                                    tipoVenda={"Varejo"}
                                    valor={13.32}
                                />
                                <ItemCarrinho
                                    horario={"12:12:12"}
                                    vendedor={"0221 - Cleyton"}
                                    quantidadeItens={32}
                                    tipoVenda={"Varejo"}
                                    valor={1223.32}
                                />
                            </tbody>
                        </Tabela>
                    </div>
                </CaixaTexto>   
            </div>
        </PageLayout>
    )
}

export default Caixa;