import EditIcon from '../../assets/icons/editIcon.svg'

function ButtonEdit(props){

    var style = {
        width: props.width+"px",
    }

    function edita(){
        alert("aaaaaaaaaa");
    }

    return(
        <a onClick={edita} class="cursor-pointer">
            <img style={props != undefined ? style : ""} src={EditIcon}></img>
        </a>
    )
}


export default ButtonEdit;

