import CancelIcon from '../../assets/icons/cancelIcon.svg'

function ButtonCancel(props){

    var style = {
        width: props.width+"px",
    }

    return(
        <a onClick={props.funcao} className="cursor-pointer">
            <img style={props != undefined ? style : ""} src={CancelIcon}></img>
        </a>
    )
}

function cancela(){
    alert("Removendo o item na posição")
}

export default ButtonCancel