function ButtonModal(props){

    var style = {
        backgroundColor: props.cor === undefined ? "#355070" : props.cor,
    }
    return(
         <button style={style} onClick={props.funcao} className="px-4 font-medium rounded text-white duration-50 ease-in-out hover:scale-[1.04]">
             <span className="text-white text-base">{props.children}</span>
         </button>
    )
}

export default ButtonModal;
