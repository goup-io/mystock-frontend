function ButtonModal(props){

    var style = {
        backgroundColor: props.cor === undefined ? "#355070" : props.cor,
    }
    return(
         <button style={style} onClick={props.funcao} className="px-4 font-medium rounded text-white ">
             <span className="text-white text-base">{props.children}</span>
         </button>
    )
}

export default ButtonModal;
