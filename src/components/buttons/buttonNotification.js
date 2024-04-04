import notificationIcon from '../../assets/icons/notificationIcon.png'

function buttonNotification(){
    return(
    <a onClick={ativarNotificacao}class="cursor-pointer">
        <img src={notificationIcon}></img>
    </a>)
}

function ativarNotificacao(){
    alert("Ativar notificações")
}

export default buttonNotification