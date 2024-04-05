import menuIcon from '../../assets/icons/menuIcon.svg'
import menuIconCrossed from '../../assets/icons/menuIconCrossed.svg'


function buttonMenu(props){

    var icon = props.icon == "crossed" ? menuIconCrossed : menuIcon

    return(
        <a onClick={irParaMenu} class="cursor-pointer">
            <img src={icon}></img>
        </a>
    )
}

function irParaMenu(){
    alert("Ir para o menu")
}

export default buttonMenu;