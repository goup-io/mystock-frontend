import CancelIcon from '../../assets/icons/cancelIcon.svg'

function ButtonCancel(props){

    var style = {
        width: props.width+"px",
    }

    return(
        <a onClick={cancela} class="cursor-pointer">
            <img style={props != undefined ? style : ""} src={CancelIcon}></img>
        </a>
    )
}

function cancela(){
    alert("cancelou")
}

export default ButtonCancel