//Componentes
import Header from '../header/Header.js'
import myStockLogo from '../../assets/icons/logoMyStock.svg'
import Notification from '../buttons/buttonNotification.js'
import Footer from '../footer/Footer.js'
import { useState, useEffect } from 'react'


function PageLayout(props){

    var corMenu = {
        backgroundColor : "#355070",
        boxShadow: "1px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    }

    var corBranco = {
        backgroundColor : "#fff",
    }

    var [corAtual, setCorAtual] = useState(corMenu)

    useEffect(() => {

        if(props.telaAtual == "menu"){
            setCorAtual(corMenu)
        
        }else{
            setCorAtual(corBranco)
        }
    }, [props.telaAtual])

    return(
        <section class="flex flex-col items-center h-[100vh] w-full justify-center">
            <div class="flex flex-row w-full justify-between px-8 pl-[5%]">
                <img src={myStockLogo}></img>
                <Notification></Notification>
            </div>

            <div id="mainDiv" class="w-[89%] h-4/5 overflow-auto rounded-[8px]" style={corAtual}>
                {props.children}
            </div>
            
            <Footer></Footer>
        </section>
    )
}

export default PageLayout