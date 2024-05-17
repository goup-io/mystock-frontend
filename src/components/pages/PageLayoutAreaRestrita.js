//Componentes
import Menu from '../../components/menu/MenuLateral.js'
import Header from '../../components/header/HeaderAR.js'
import ButtonFaq from '../buttons/buttonFaq.js'

import { useState, useEffect } from 'react'


function PageLayoutAreaRestrita(props){

    return(
        <>
            <section className="flex h-[100vh] bg-[#355070] w-full overflow-hidden">
                <Menu></Menu>    

                <div className="flex flex-col w-full h-full">
                    <Header></Header>

                    <div id="mainDiv" className="w-full h-full bg-[#F5F3F4] p-5 px-8 pb-12 rounded-tl-3xl flex flex-col gap-4 justify-between">
                        <div className='w-full h-[85vh] mb-10 flex flex-col gap-3 overflow-y-auto overflow-x-auto'>
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