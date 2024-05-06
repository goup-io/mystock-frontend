//Componentes
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
        backgroundColor : "#F5F3F4",
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
        <section class="flex flex-col items-center h-[100vh] bg-[#F5F3F4] w-full justify-between ">
            <div class="flex flex-row w-full justify-between px-4 pl-[5%] h-[3.2rem] ">
                <img className='w-[8rem]' src={myStockLogo}></img>
                <Notification></Notification>
            </div>

            <div id="mainDiv" class="w-[89%] h-[88%] overflow-hidden rounded-[8px]" style={corAtual}>
                {props.children}
            </div>
            
            <Footer></Footer>
        </section>
    )
}

export default PageLayout