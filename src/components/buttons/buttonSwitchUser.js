import switchUserIcon from '../../assets/icons/switchUserIcon.svg'

function buttonSwitchUser(){
    return(
        <a onClick={trocarUsuario} class="cursor-pointer">
            <img src={switchUserIcon}></img>
        </a>
    )
}

function trocarUsuario(){
    alert("TrocarUsuario")
}

export default buttonSwitchUser