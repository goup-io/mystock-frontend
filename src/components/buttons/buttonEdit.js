import EditIcon from '../../assets/icons/editIcon.svg'

function ButtonEdit(props){
    return(
        <a onClick={props.funcao} class="cursor-pointer">
            <img src={EditIcon}></img>
        </a>
    )
}


export default ButtonEdit;

