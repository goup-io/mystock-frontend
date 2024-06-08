import notificationIcon from '../../assets/icons/notificationIcon.svg'
import AbrirModalNotification from '../modals/modalNotification'

function buttonNotification(){
    return(

    <a onClick={ativarNotificacao}className="cursor-pointer">
        <img className='w-[2.5rem]' src={notificationIcon}></img>
    </a>)

}

function ativarNotificacao(){
    AbrirModalNotification()
}

export default buttonNotification