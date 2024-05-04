import PageLayout from '../PageLayout.js'
import Header from '../../header/Header.js'
import Tabela from '../../tables/TableRoundedBorderSpacing.js'
import Button from '../../buttons/buttonsModal.js'

function CaixaTexto(props){
    return(
        <>
            <p className="text-left font-semibold text-2xl">{props.titulo != undefined ? props.titulo : "SEM TITULO"}</p>
            <div className="bg-[#F5F3F4] w-full h-[65vh] rounded">
                {props.children}
            </div>
        </>
    )
}

function ItemCarrinho(props) {

    var style = {
        backgroundColor: props.par === undefined ? "#E7E7E7" : "#D0D4F0",
    }
    
    return (

        <tr style={style} className="h-24 rounded">
            <td>
                <p className="font-medium text-[1.4rem]">{props.horario}</p>
            </td>
            <td className="text-start pl-8">
                <p className="font-medium text-[1.4rem]">{props.vendedor}</p>
            </td>
            <td>
                <p className="font-medium text-[1.4rem]">{props.quantidadeItens}</p>
            </td>
            <td>
                <p className="font-medium text-[1.4rem]">{props.tipoVenda}</p>
            </td>
            <td className="text-start">
                <p className="font-medium text-[1.4rem]">{"R$ "+props.valor}</p>
            </td>
            <td>
                <div className="flex flex-row items-center gap-4 justify-center">
                    <Button cor={"#919191"}>
                        <p className="text-[1.3rem] p-1 px-5">CANCELAR</p>
                    </Button>                  
                    <Button>
                        <p className="text-[1.3rem] p-1 px-5">FINALIZAR VENDA</p>
                    </Button>                  
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
                    <div className="px-12">
                        <Tabela
                            layout={"auto"}
                        >
                            <thead>
                                <tr className="text-2xl">
                                    <th>Horário</th>
                                    <th>Vendedor</th>
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
                                    par={true}
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