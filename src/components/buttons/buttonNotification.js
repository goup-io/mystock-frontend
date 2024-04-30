import notificationIcon from '../../assets/icons/notificationIcon.svg'

function buttonNotification(){
    return(

    <a onClick={ativarNotificacao}class="cursor-pointer">
        <img className='w-[3rem]' src={notificationIcon}></img>
    </a>)

}

function ativarNotificacao(){
    alert("Ativar notificações")
}

export default buttonNotification