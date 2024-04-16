import switchUserIcon from '../../assets/icons/switchUserIcon.svg'

function buttonSwitchUser(){
    return(
        <a onClick={trocarUsuario} class="cursor-pointer">
            <img className='w-[3rem]' src={switchUserIcon}></img>
        </a>
    )
}

function trocarUsuario(){
    alert("TrocarUsuario")
}

export default buttonSwitchUser