import CancelIcon from '../../assets/icons/cancelIcon.svg'

function ButtonCancel(){
    return(
        <a onClick={cancela} class="cursor-pointer">
            <img src={CancelIcon}></img>
        </a>
    )
}

function cancela(){
    alert("cancelou")
}

export default ButtonCancel