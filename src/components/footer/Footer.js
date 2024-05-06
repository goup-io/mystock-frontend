import ButtonFaq from '../buttons/buttonFaq.js'
import ButtonSwitchUser from '../buttons/buttonSwitchUser.js'

function Footer(){
    return(
        <footer class="flex flex-row justify-between w-full  px-4 ">
            <ButtonFaq></ButtonFaq>
            <ButtonSwitchUser></ButtonSwitchUser>
        </footer>
    )
}

export default Footer