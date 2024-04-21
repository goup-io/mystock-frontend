import PageLayout from '../PageLayout.js'
import Header from '../../header/Header.js'

import Button from '../../buttons/buttonsModal.js'
import ItemSeparadoPorLinhaTracejada from '../../tables/ItemSeparadoPorLinhaTracejada.js'

var divPai = {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "repeat(9, 1fr)",
    gridColumnGap: "25px",
    gridRowGap: "25px",
    padding: "30px",
}

var div1 = {
    gridArea: "1 / 1 / 10 / 7",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
}

var div2 = {
    gridArea: "7 / 7 / 10 / 9", 
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
}

var div3 = {
    gridArea: "4 / 7 / 7 / 9",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
}

var div4 = {
    gridArea: "1 / 7 / 4 / 9",
    boxShadow: "rgba(0, 0, 0, 0.25) 1px 4px 4px 0px",
}

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

function Pagamento(){
    
    return(
        <PageLayout>
            <Header telaAtual="Área de Venda - Pagamento"/>
            <div class="bg-[#fff] w-full h-[75vh] shadow-sm rounded-[10px] px-12 py-6">
               <CaixaTexto titulo="PAGAR COM :">
                <div style={divPai} class="h-full ">
                    <div style={div1} class="bg-[#E7E7E7] rounded-[16px]">
                        <div class="flex flex-row justify-between p-8">
                            <p class="text-left font-semibold text-[1.3rem]">RESUMO DA VENDA</p>
                            <Button><p class="text-left font-semibold text-[1.3rem]">Editar Itens</p></Button>
                        </div>
                        <div class="p-8">
                            <ItemSeparadoPorLinhaTracejada
                                infoEsquerda={"Horario"}
                                infoDireita={"12:12:12"}
                            />
                            <ItemSeparadoPorLinhaTracejada
                                infoEsquerda={"Vendedor"}
                                infoDireita={"12:12:12"}
                            />
                            <ItemSeparadoPorLinhaTracejada
                                infoEsquerda={"Tp. de Venda"}
                                infoDireita={"12:12:12"}
                            />
                            <ItemSeparadoPorLinhaTracejada
                                infoEsquerda={"Quant. Itens"}
                                infoDireita={"Valor Total"}
                            />
                            <ItemSeparadoPorLinhaTracejada
                                infoEsquerda={"Valor Pago"}
                                infoDireita={"12:12:12"}
                            />
 
                        </div>
                        <div class="flex flex-row justify-between py-12 px-8">
                            <p class="text-left font-semibold text-[1.9rem]">Restante à Pagar: </p>
                            <p class="text-left font-semibold text-[1.8rem]">R$ --{}</p>   
                        </div>
                    </div>
                    <div style={div2} class="flex flex-col text-3xl justify-center font-semibold cursor-pointer bg-[#E7E7E7] rounded-[16px]">
                        <p>DINHEIRO</p>
                        <p>F1</p>
                    </div>
                    <div style={div3} class="flex flex-col text-3xl justify-center font-semibold cursor-pointer bg-[#E7E7E7] rounded-[16px]">
                        <p>CARTÃO</p>
                        <p>F2</p>
                    </div>
                    <div style={div4} class="flex flex-col text-3xl justify-center font-semibold cursor-pointer bg-[#E7E7E7] rounded-[16px]">
                        <p>PIX</p>
                        <p>F3</p>
                    </div>
                </div>
               </CaixaTexto>
            </div>
        </PageLayout>
    )
}

export default Pagamento