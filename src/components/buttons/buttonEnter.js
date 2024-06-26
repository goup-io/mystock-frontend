
function ButtonEnter(props){
    return(
        <button onClick={props.funcao} type="submit" className="bg-[#355070] rounded-[3.125rem] w-[29vw] h-[2.5rem] flex flex-col items-center justify-center">
            <span className="text-white text-[1.5rem]">{props.children}</span>
        </button>
    )
}

export default ButtonEnter;