//Componentes
import Menu from '../../components/menu/MenuLateral.js'
import Header from '../../components/header/HeaderAR.js'
import ButtonFaq from '../buttons/buttonFaq.js'

import { useState, useEffect } from 'react'


function PageLayoutAreaRestrita(props){

    return(
        <>
            <section class="flex h-[100vh] bg-[#355070] w-full overflow-hidden">
                <Menu></Menu>    

                <div class="flex flex-col w-full h-full">
                    <Header></Header>

                    <div id="mainDiv" class="w-full h-full bg-[#F5F3F4] p-5 px-8 pb-12 rounded-tl-3xl flex flex-col gap-4 justify-between">
                        <div className='w-full h-[85vh] mb-10 flex flex-col gap-3 overflow-hidden'>
                            {props.children}
                        </div>
                    </div>

                    <div className='absolute bottom-3 right-3'>
                        <ButtonFaq position="right"></ButtonFaq>
                    </div>
                </div>
            </section>
        </>   
    )
}

export default PageLayoutAreaRestrita