import { borderRadius, height, margin } from '@mui/system';
import Header from '../../header/Header.js'
import PageLayout from '../PageLayout.js'
import Input from '../../inputs/inputAndLabelModal.js'
import Button from '../../buttons/buttonsModal.js'

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
                                <Button><p class="flex justify-between w-full text-2xl">Adicionar Produto</p></Button>
                                <Button><p class="flex justify-between w-full text-2xl">Adicionar Kit</p></Button>
                            </div>
                        </div>

                        <div class="bg-[#F5F3F4] w-full h-full rounded-[5px] my-2 overflow-y-scroll">

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