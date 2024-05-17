//Componentes
import Header from '../header/Header.js'
import PageLayout from './PageLayout.js'

//Paginas
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../../connections/ApiRequest.js';

function Menu() {

    const navigate = useNavigate();

    async function handleOnClick(path) {
        if (path === "sair") {
            const respostaHTTP = await ApiRequest.userLogout();
            console.log(respostaHTTP)
            if (respostaHTTP.status === 200) {
                localStorage.clear();
                navigate("/")
            }

        } else {
            navigate(path)
        }
    }

    function MenuItems() {
        return (
            <>
                <Header telaAtual="Menu" icon="crossed"></Header>
                <ul className="flex flex-col items-center gap-7 mt-20 px-12">
                    <ItemLista handleClick={() => handleOnClick("/venda")}>ÁREA DE VENDA</ItemLista>
                    <ItemLista handleClick={() => handleOnClick("/estoque")}>ESTOQUE</ItemLista>
                    <ItemLista handleClick={() => handleOnClick("/historico")}>HISTÓRICO DE VENDAS</ItemLista>
                    <ItemLista handleClick={() => handleOnClick("/transacao")}>ÁREA DE TRANSFERÊNCIAS</ItemLista>
                    <ItemLista handleClick={() => handleOnClick("sair")}>SAIR</ItemLista>
                </ul>
            </>
        )
    }

    function ItemLista(props) {
        return (
            <li onClick={props.handleClick} className="bg-[#D0D4F0] cursor-pointer w-full h-[3.5rem] text-[1.5rem] items-center flex align-center justify-center font-[500] rounded-[0.3125rem] shadow-lg duration-150 ease-in-out hover:scale-[1.01] hover:bg-[#C5CAF2]">
                {props.children}
            </li>
        )
    }

    return (
        <>
            <PageLayout telaAtual="menu">
                <MenuItems />
            </PageLayout>
        </>
    )
}

export default Menu;