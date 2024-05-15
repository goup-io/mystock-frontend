function ButtonModalFull(props){

    var style = {
        backgroundColor: props.cor === undefined ? "#355070" : props.cor,
    }
    return(
         <button style={style} onClick={props.funcao} className="px-4 font-medium rounded text-white w-full">
             <span className="text-white text-base">{props.children}</span>
         </button>
    )
}

export default ButtonModalFull;