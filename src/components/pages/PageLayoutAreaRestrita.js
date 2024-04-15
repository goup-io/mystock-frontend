import iconFaq from '../../assets/icons/faqIcon.svg'

//Componentes
import Menu from '../../components/menu/MenuLateral.js'
import Header from '../../components/header/HeaderAR.js'


import { useState, useEffect } from 'react'


function PageLayoutAreaRestrita(props){

    return(
        <>
            <section class="flex h-[100vh] bg-[#355070] w-full overflow-hidden">
                <Menu></Menu>    

                <div class="flex flex-col w-full h-full">
                    <Header></Header>

                    <div id="mainDiv" class="w-full h-full bg-[#F5F3F4] p-5 px-8 pb-12 rounded-tl-3xl flex flex-col gap-4  justify-between">
                        {props.children}
                    </div>

                    <img src={iconFaq} class="absolute bottom-3 right-3 w-8 cursor-pointer"/>
                </div>
            </section>
        </>   
    )
}

export default PageLayoutAreaRestrita