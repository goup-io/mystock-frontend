import EditIcon from '../../assets/icons/editIcon.svg'

function ButtonEdit(props){

    var style = {
        width: props.width+"px",
    }

    function edita(){
    }

    return(
        <a onClick={props.funcao == undefined ? alert("passar função no botão") : props.funcao} class="cursor-pointer">
            <img style={props != undefined ? style : ""} src={EditIcon}></img>
        </a>
    )
}


export default ButtonEdit;

