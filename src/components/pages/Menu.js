import Header from '../header/Header.js'
import myStockLogo from '../../assets/icons/logoMyStock.png'
import Notification from '../buttons/buttonNotification.js'
import Footer from '../footer/Footer.js'

function Menu(){
    return(
        <section class="flex flex-col items-center h-[100vh] w-full justify-center">
            <img src={myStockLogo}></img>
            <div class="absolute right-4 top-4">
                <Notification></Notification>
            </div>

            <div class="w-10/12 h-4/5 bg-[#355070] shadow px-12 pt-2">
                <Header telaAtual="Menu"></Header>
                <ul class="flex flex-col items-center gap-7 mt-20 overflow-auto">
                    <ItemLista>ÁREA DE PRÉ-VENDA</ItemLista>
                    <ItemLista>ESTOQUE</ItemLista>
                    <ItemLista>HISTÓRICO DE VENDAS</ItemLista>
                    <ItemLista>ÁREA DE TRANSAÇÕES</ItemLista>
                </ul>
            </div>
            <Footer></Footer>
        </section>
    )
}

function carregarProximaPagina(proximaPagina){
    alert("Ir para próxima página")
}

function ItemLista(props){
    return(
        <li onClick={carregarProximaPagina} class="bg-[#D0D4F0] cursor-pointer w-full h-[5rem] text-[1.5rem] items-center flex align-center justify-center font-[500] rounded-[0.3125rem] shadow-lg">
            {props.children}
        </li>
    )
}

export default Menu;