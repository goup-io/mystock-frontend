import EditIcon from '../../assets/icons/editIcon.svg'

function ButtonEdit(){
    return(
        <a onClick={edita} class="cursor-pointer">
            <img src={EditIcon}></img>
        </a>
    )
}

function edita(){
    alert("editou")
}

export default ButtonEdit;

