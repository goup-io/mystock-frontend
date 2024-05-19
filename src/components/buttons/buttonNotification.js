import notificationIcon from '../../assets/icons/notificationIcon.svg'

function buttonNotification(){
    return(

    <a onClick={ativarNotificacao}className="cursor-pointer">
        <img className='w-[2.5rem]' src={notificationIcon}></img>
    </a>)

}

function ativarNotificacao(){
    alert("Ativar notificações")
}

export default buttonNotification