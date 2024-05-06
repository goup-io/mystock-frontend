import EditIcon from '../../assets/icons/editIcon.svg'

function ButtonEdit(props) {

    var style = {
        width: props.width + "px",
    }

    return (

        <button onClick={props.funcao} className='w-5 h-5'>
            <img style={props != undefined ? style : ""} src={EditIcon}></img>
        </button>

    )
}


export default ButtonEdit;

