import PageLayout from '../PageLayout.js'
import Header from '../../header/Header.js'

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



               </CaixaTexto>
            </div>
        </PageLayout>
    )
}

export default Pagamento