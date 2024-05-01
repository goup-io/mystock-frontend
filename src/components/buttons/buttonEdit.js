import EditIcon from '../../assets/icons/editIcon.svg'

function ButtonEdit(props){

    var style = {
        width: props.width+"px",
    }


    return(
        <a onClick={() => props.edit != undefined ? props.edit : alert("Botão funcionando")} class="cursor-pointer">
            <img style={props != undefined ? style : ""} src={EditIcon}></img>
        </a>
    )
}


export default ButtonEdit;

