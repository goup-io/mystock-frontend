import PageLayout from '../PageLayout.js'
import Header from '../../header/Header.js'
import Tabela from '../../tables/TableRoundedBorderSpacing.js'
import Button from '../../buttons/buttonsModal.js'

const styleTitulo = {
    display: 'flex',
    justifyContent: 'space-between'
}

function CaixaTexto(props) {
    return (
        <div style={styleTitulo}>
            <p className="text-left font-semibold text-xl mb-2">{props.titulo != undefined ? props.titulo : "SEM TITULO"}</p>
            <span>Quantidade:  {props.quantidadeItens}</span>
        </div>
    )
}

function ItemCarrinho(props) {

    var style = {
        backgroundColor: props.par === undefined ? "#E7E7E7" : "#D0D4F0",
    }
    
    return (
        <tr className="bg-[#E7E7E7] h-20 rounded-md shadow p-5 pl-5 text-left">
            <td className='pl-5'>
                <p className="font-medium text-[1.1rem]"> {props.horario}</p>
            </td>
            <td className="text-start pl-8">
                <p className="font-medium text-[1.1rem]">{props.vendedor}</p>
            </td>
            <td>
                <p className="font-medium text-[1.1rem]">{props.quantidadeItens}</p>
            </td>
            <td>
                <p className="font-medium text-[1.1rem]">{props.tipoVenda}</p>
            </td>
            <td className="text-start">
                <p className="font-medium text-[1.1rem]">{"R$ " + props.valor}</p>
            </td>
            <td>
                <div className="flex flex-row items-center gap-4 justify-center">
                    <Button cor="bg-[#919191]"><p className="text-[1rem] p-1 px-5">CANCELAR</p></Button>
                    <Button><p className="text-[1rem] p-1 px-5">FINALIZAR VENDA</p></Button>
                </div>
            </td>
        </tr>
    )
}

function Caixa() {

    return (
        <PageLayout>
            <Header telaAtual="Área de Venda - Caixa" />
            <div className="bg-[#fff] w-full h-[75vh] shadow-sm rounded-md px-12 py-5">
                <CaixaTexto titulo="PRÉ-VENDA" quantidadeItens="3" />
                <div className="bg-[#F5F3F4] w-full h-[90%] px-5 rounded-md overflow-auto">
                    <table className='w-full rounded-lg border-solid border-separate border-spacing-y-4' >
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
                            <ItemCarrinho
                                horario={"12:12:12"}
                                vendedor={"0221 - Jhonson"}
                                quantidadeItens={32}
                                tipoVenda={"Varejo"}
                                valor={1223.32}
                            />
                            <ItemCarrinho
                                horario={"12:12:12"}
                                vendedor={"0221 - Alexandre"}
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
                    </table>
                </div>
            </div>
        </PageLayout>
    )
}

export default Caixa;